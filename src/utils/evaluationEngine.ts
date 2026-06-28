/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GradeType } from '../types';

export interface EvaluationResult {
  book: 'kailash-chandra' | 'progressive-magazine';
  volumeOrMonth: string;
  grade: GradeType;
  dictationNumber: number;
  totalWords: number;
  correctWords: number;
  fullMistakes: number;
  halfMistakes: number;
  wrongWords: number;
  missingWords: number;
  repeatedWords: number;
  numberErrors: number;
  capitalErrors: number;
  sentenceStartErrors: number;
  singularPluralErrors: number;
  minorSpellingErrors: number;
  questionMarkErrors: number;
  fullStopErrors: number;
  finalErrorPct: number;
  passFail: 'PASS' | 'FAIL';
  completionTime: string; // e.g. "12:34"
  typingSpeed: number; // Words typed per minute
  alignedDiffs: AlignedDiffItem[];
}

export interface AlignedDiffItem {
  type: 'match' | 'substitution' | 'deletion' | 'insertion';
  expected: string;
  student: string;
  mistakeType?: 'none' | 'wrong-word' | 'missing-word' | 'repeated-word' | 'number-error' | 'capital-error' | 'sentence-start-error' | 'singular-plural-error' | 'minor-spelling' | 'question-mark-error' | 'full-stop-error';
  isFullMistake: boolean;
  isHalfMistake: boolean;
}

// Compute Levenshtein distance between two strings
export function getLevenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,    // deletion
          dp[i][j - 1] + 1,    // insertion
          dp[i - 1][j - 1] + 1 // substitution
        );
      }
    }
  }
  return dp[m][n];
}

// Clean word of ignore punctuations
export function cleanPunctuation(word: string): string {
  // Strip commas, colons, semicolons, hyphens, quotation marks, brackets
  return word.replace(/[,\:;\-\"\'\(\)\[\]\{\}\‘\’\“\”\']/g, '').trim();
}

// Helper to check singular plural differences
function isSingularPluralMismatch(w1: string, w2: string): boolean {
  const s1 = w1.toLowerCase();
  const s2 = w2.toLowerCase();
  if (s1 === s2) return false;

  const stripPlural = (w: string) => {
    if (w.endsWith('ies')) return w.slice(0, -3) + 'y';
    if (w.endsWith('es')) {
      if (w.endsWith('shes') || w.endsWith('ches') || w.endsWith('xes') || w.endsWith('ses')) {
        return w.slice(0, -2);
      }
      return w.slice(0, -1); // try single 's' first
    }
    if (w.endsWith('s')) return w.slice(0, -1);
    return w;
  };

  return stripPlural(s1) === stripPlural(s2) || stripPlural(s1) === s2 || s1 === stripPlural(s2);
}

// Main alignment and scoring engine using Word-level Minimum Edit Distance Backtrace
export function evaluateTranscription(
  originalTranscript: string,
  studentTyped: string,
  book: 'kailash-chandra' | 'progressive-magazine',
  volumeOrMonth: string,
  grade: GradeType,
  dictationNumber: number,
  timeSpentSeconds: number
): EvaluationResult {
  // Split transcripts into words
  const expectedRaw = originalTranscript.trim().split(/\s+/).filter(Boolean);
  const studentRaw = studentTyped.trim().split(/\s+/).filter(Boolean);

  const M = expectedRaw.length;
  const N = studentRaw.length;

  // Align words using dynamic programming
  // dp[i][j] = maximum alignment score
  // We want to reward identical matches, tolerate minor differences, and penalize large edits.
  const dp = Array.from({ length: M + 1 }, () => new Array(N + 1).fill(0));
  const path = Array.from({ length: M + 1 }, () => new Array(N + 1).fill(''));

  // Initialization
  for (let i = 1; i <= M; i++) {
    dp[i][0] = i * -2; // gap penalty
    path[i][0] = 'D';  // deletion
  }
  for (let j = 1; j <= N; j++) {
    dp[0][j] = j * -2; // gap penalty
    path[0][j] = 'I';  // insertion
  }

  // DP computation
  for (let i = 1; i <= M; i++) {
    const wE = cleanPunctuation(expectedRaw[i - 1]).toLowerCase();
    for (let j = 1; j <= N; j++) {
      const wS = cleanPunctuation(studentRaw[j - 1]).toLowerCase();

      let matchScore = -2; // Default penalty for substitution
      if (wE === wS) {
        matchScore = 4; // high reward for matching word
      } else if (getLevenshteinDistance(wE, wS) <= 1 || isSingularPluralMismatch(wE, wS)) {
        matchScore = 2; // minor typo / plural mismatch is still aligned
      }

      const scoreDiag = dp[i - 1][j - 1] + matchScore;
      const scoreDel = dp[i - 1][j] - 2; // skip expected word (deletion)
      const scoreIns = dp[i][j - 1] - 2; // skip student word (insertion)

      const maxScore = Math.max(scoreDiag, scoreDel, scoreIns);
      dp[i][j] = maxScore;

      if (maxScore === scoreDiag) {
        path[i][j] = 'M'; // Match or Substitution
      } else if (maxScore === scoreDel) {
        path[i][j] = 'D'; // Deletion
      } else {
        path[i][j] = 'I'; // Insertion
      }
    }
  }

  // Backtrace to construct the alignment path
  const alignedItems: AlignedDiffItem[] = [];
  let i = M;
  let j = N;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && path[i][j] === 'M') {
      const expWord = expectedRaw[i - 1];
      const stuWord = studentRaw[j - 1];
      const expClean = cleanPunctuation(expWord);
      const stuClean = cleanPunctuation(stuWord);

      if (expClean === stuClean) {
        // Perfect Match
        alignedItems.push({
          type: 'match',
          expected: expWord,
          student: stuWord,
          mistakeType: 'none',
          isFullMistake: false,
          isHalfMistake: false
        });
      } else {
        // Substitution: Evaluate precise mistake rules
        const expCleanLower = expClean.toLowerCase();
        const stuCleanLower = stuClean.toLowerCase();

        // 1. Number Error
        const hasDigitsExp = /\d/.test(expClean);
        const hasDigitsStu = /\d/.test(stuClean);
        const isNumberMismatch = (hasDigitsExp || hasDigitsStu) && (expCleanLower !== stuCleanLower);

        if (isNumberMismatch) {
          alignedItems.push({
            type: 'substitution',
            expected: expWord,
            student: stuWord,
            mistakeType: 'number-error',
            isFullMistake: true,
            isHalfMistake: false
          });
        }
        // 2. Singular/Plural Mismatch
        else if (isSingularPluralMismatch(expClean, stuClean)) {
          alignedItems.push({
            type: 'substitution',
            expected: expWord,
            student: stuWord,
            mistakeType: 'singular-plural-error',
            isFullMistake: false,
            isHalfMistake: true
          });
        }
        // 3. Question Mark Error
        else if ((expWord.endsWith('?') && !stuWord.endsWith('?')) || (!expWord.endsWith('?') && stuWord.endsWith('?'))) {
          alignedItems.push({
            type: 'substitution',
            expected: expWord,
            student: stuWord,
            mistakeType: 'question-mark-error',
            isFullMistake: true,
            isHalfMistake: false
          });
        }
        // 4. Full Stop Error
        else if ((expWord.endsWith('.') && !stuWord.endsWith('.')) || (!expWord.endsWith('.') && stuWord.endsWith('.'))) {
          alignedItems.push({
            type: 'substitution',
            expected: expWord,
            student: stuWord,
            mistakeType: 'full-stop-error',
            isFullMistake: false,
            isHalfMistake: true
          });
        }
        // 5. Capitalization errors
        else if (expCleanLower === stuCleanLower) {
          // Capital proper noun (starts with capital in expected, lowercase in student)
          const isProperNoun = /^[A-Z]/.test(expClean);
          const isSentenceStart = i === 1 || expectedRaw[i - 2].endsWith('.') || expectedRaw[i - 2].endsWith('?');

          if (isSentenceStart && /^[a-z]/.test(stuClean)) {
            alignedItems.push({
              type: 'substitution',
              expected: expWord,
              student: stuWord,
              mistakeType: 'sentence-start-error',
              isFullMistake: false,
              isHalfMistake: true
            });
          } else if (isProperNoun && /^[a-z]/.test(stuClean)) {
            alignedItems.push({
              type: 'substitution',
              expected: expWord,
              student: stuWord,
              mistakeType: 'capital-error',
              isFullMistake: false,
              isHalfMistake: true
            });
          } else {
            // normal spelling/capital difference, treat as Match if clean letters match
            alignedItems.push({
              type: 'match',
              expected: expWord,
              student: stuWord,
              mistakeType: 'none',
              isFullMistake: false,
              isHalfMistake: false
            });
          }
        }
        // 6. Minor Spelling Error (Levenshtein distance = 1)
        else if (getLevenshteinDistance(expCleanLower, stuCleanLower) === 1) {
          alignedItems.push({
            type: 'substitution',
            expected: expWord,
            student: stuWord,
            mistakeType: 'minor-spelling',
            isFullMistake: false,
            isHalfMistake: true
          });
        }
        // 7. General Wrong Word
        else {
          alignedItems.push({
            type: 'substitution',
            expected: expWord,
            student: stuWord,
            mistakeType: 'wrong-word',
            isFullMistake: true,
            isHalfMistake: false
          });
        }
      }
      i--;
      j--;
    } else if (i > 0 && (j === 0 || path[i][j] === 'D')) {
      // Deletion = Expected word omitted (Missing Word)
      const expWord = expectedRaw[i - 1];
      alignedItems.push({
        type: 'deletion',
        expected: expWord,
        student: '',
        mistakeType: 'missing-word',
        isFullMistake: true,
        isHalfMistake: false
      });
      i--;
    } else {
      // Insertion = Student typed extra word (Repeated / Extra word)
      const stuWord = studentRaw[j - 1];
      alignedItems.push({
        type: 'insertion',
        expected: '',
        student: stuWord,
        mistakeType: 'repeated-word',
        isFullMistake: true,
        isHalfMistake: false
      });
      j--;
    }
  }

  // Since we backtraced from the end, reverse alignedItems to match forward sequence
  alignedItems.reverse();

  // Aggregate errors
  let correctWords = 0;
  let fullMistakes = 0;
  let halfMistakes = 0;
  let wrongWords = 0;
  let missingWords = 0;
  let repeatedWords = 0;
  let numberErrors = 0;
  let capitalErrors = 0;
  let sentenceStartErrors = 0;
  let singularPluralErrors = 0;
  let minorSpellingErrors = 0;
  let questionMarkErrors = 0;
  let fullStopErrors = 0;

  alignedItems.forEach((item) => {
    if (item.type === 'match') {
      correctWords++;
    } else {
      if (item.isFullMistake) fullMistakes++;
      if (item.isHalfMistake) halfMistakes++;

      switch (item.mistakeType) {
        case 'wrong-word':
          wrongWords++;
          break;
        case 'missing-word':
          missingWords++;
          break;
        case 'repeated-word':
          repeatedWords++;
          break;
        case 'number-error':
          numberErrors++;
          break;
        case 'capital-error':
          capitalErrors++;
          break;
        case 'sentence-start-error':
          sentenceStartErrors++;
          break;
        case 'singular-plural-error':
          singularPluralErrors++;
          break;
        case 'minor-spelling':
          minorSpellingErrors++;
          break;
        case 'question-mark-error':
          questionMarkErrors++;
          break;
        case 'full-stop-error':
          fullStopErrors++;
          break;
      }
    }
  });

  // Calculate final mistake percentage using official SSC formula:
  // Error % = ((Full Mistakes + (Half Mistakes * 0.5)) * 100) / Total Expected Words
  const totalErrorValue = fullMistakes + (halfMistakes * 0.5);
  const finalErrorPct = M > 0 ? (totalErrorValue * 100) / M : 0;

  // Validate qualification based on grade percentage constraints
  const allowedErrorLimit = grade === 'C' ? 5 : 7; // max 5% for Grade C, max 7% for Grade D
  const passFail = finalErrorPct <= allowedErrorLimit ? 'PASS' : 'FAIL';

  // Format elapsed time string
  const pad = (num: number) => String(num).padStart(2, '0');
  const elapsedMinutes = Math.floor(timeSpentSeconds / 60);
  const elapsedSeconds = timeSpentSeconds % 60;
  const completionTime = `${pad(elapsedMinutes)}:${pad(elapsedSeconds)}`;

  // Typing speed calculation (Words Per Minute based on student output)
  const totalTypedWords = studentRaw.length;
  const elapsedMinutesFloat = timeSpentSeconds / 60;
  const typingSpeed = elapsedMinutesFloat > 0 ? Math.round(totalTypedWords / elapsedMinutesFloat) : 0;

  return {
    book,
    volumeOrMonth,
    grade,
    dictationNumber,
    totalWords: M,
    correctWords,
    fullMistakes,
    halfMistakes,
    wrongWords,
    missingWords,
    repeatedWords,
    numberErrors,
    capitalErrors,
    sentenceStartErrors,
    singularPluralErrors,
    minorSpellingErrors,
    questionMarkErrors,
    fullStopErrors,
    finalErrorPct: parseFloat(finalErrorPct.toFixed(2)),
    passFail,
    completionTime,
    typingSpeed,
    alignedDiffs: alignedItems
  };
}
