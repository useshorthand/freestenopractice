/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { DictationId, GradeType } from '../types';
import { stenoConfig } from '../config/stenoConfig';
import { ApiClient, DynamicDictation } from '../services/apiClient';
import { evaluateTranscription, EvaluationResult, AlignedDiffItem } from '../utils/evaluationEngine';
import { 
  ArrowLeft, Clock, Award, FileText, CheckCircle, 
  RotateCcw, Play, CheckCircle2, AlertTriangle, HelpCircle, 
  LayoutGrid, Loader2, Sparkles, XCircle, Search, Filter 
} from 'lucide-react';
import AdPlaceholder from '../components/AdPlaceholder';
import CopyrightNotice from '../components/CopyrightNotice';

interface DictationPageProps {
  dictation: DictationId;
  onBack: () => void;
}

export default function DictationPage({ dictation, onBack }: DictationPageProps) {
  const [practiceActive, setPracticeActive] = useState(false);
  const [typingValue, setTypingValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [transcriptData, setTranscriptData] = useState<DynamicDictation | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Timer states
  const isGradeC = dictation.grade === 'C';
  const speedWpm = isGradeC ? stenoConfig.targetWpm.gradeC : stenoConfig.targetWpm.gradeD;
  const allowedMinutes = isGradeC ? stenoConfig.allowedTimeMinutes.gradeC : stenoConfig.allowedTimeMinutes.gradeD;
  const initialTimeSeconds = allowedMinutes * 60;
  
  const [timeLeft, setTimeLeft] = useState(initialTimeSeconds);
  const [timeSpent, setTimeSpent] = useState(0);

  // Evaluation states
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [mistakeFilter, setMistakeFilter] = useState<string>('all');

  // Refs for tracking timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const bookName = dictation.book === 'kailash-chandra' ? 'Kailash Chandra' : 'Progressive Magazine';
  const selectionLabel = dictation.book === 'kailash-chandra' ? 'Transcription' : 'Dictation';

  // Local storage keys for state persistence
  const draftKey = `steno-draft-${dictation.book}-${dictation.volumeOrMonth}-${dictation.grade}-${dictation.dictationNumber}`;

  // Fetch transcript on mount
  useEffect(() => {
    let active = true;
    async function loadTranscript() {
      setLoading(true);
      setApiError(null);
      try {
        const result = await ApiClient.fetchTranscript(dictation);
        if (active) {
          if (result) {
            setTranscriptData(result);
          } else {
            setApiError('Unable to load transcription text from database.');
          }
        }
      } catch (err) {
        if (active) {
          setApiError('A connection problem occurred. Loaded local steno placeholder instead.');
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadTranscript();

    // Check for draft autosave
    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft) {
      setTypingValue(savedDraft);
    } else {
      setTypingValue('');
    }

    return () => {
      active = false;
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [dictation, draftKey]);

  // Draft autosave effect
  useEffect(() => {
    if (typingValue.trim()) {
      localStorage.setItem(draftKey, typingValue);
    } else {
      localStorage.removeItem(draftKey);
    }
  }, [typingValue, draftKey]);

  // Handle unload warnings during practice
  useEffect(() => {
    if (practiceActive) {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = 'You have an active transcription session. If you leave, your typing progress will be lost.';
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [practiceActive]);

  // Timer Tick Engine
  useEffect(() => {
    if (practiceActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Auto submit on timeout
            clearInterval(timerRef.current!);
            handleAutoSubmit();
            return 0;
          }
          setTimeSpent((spent) => spent + 1);
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [practiceActive, timeLeft]);

  const handleStart = () => {
    if (!transcriptData) return;
    setPracticeActive(true);
    setSubmitted(false);
    setEvaluation(null);
    setTimeLeft(initialTimeSeconds);
    setTimeSpent(0);
  };

  const handleReset = () => {
    setShowResetModal(true);
  };

  const handleConfirmReset = () => {
    setShowResetModal(false);
    setPracticeActive(false);
    setTypingValue('');
    setSubmitted(false);
    setEvaluation(null);
    setTimeLeft(initialTimeSeconds);
    setTimeSpent(0);
    localStorage.removeItem(draftKey);
  };

  const handleAutoSubmit = () => {
    setPracticeActive(false);
    setSubmitted(true);
    triggerEvaluation();
  };

  const handleSubmit = () => {
    setShowSubmitModal(true);
  };

  const handleConfirmSubmit = () => {
    setShowSubmitModal(false);
    setPracticeActive(false);
    setSubmitted(true);
    triggerEvaluation();
  };

  const triggerEvaluation = () => {
    if (!transcriptData) return;
    const finalResult = evaluateTranscription(
      transcriptData.transcript,
      typingValue,
      dictation.book,
      dictation.volumeOrMonth,
      dictation.grade,
      dictation.dictationNumber,
      timeSpent > 0 ? timeSpent : 1
    );
    setEvaluation(finalResult);

    // Clear saved draft on successful evaluation
    localStorage.removeItem(draftKey);
  };

  // Format MM:SS for timer
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Filter aligned mistakes list
  const filteredMistakes = evaluation
    ? evaluation.alignedDiffs.filter((item) => {
        if (item.type === 'match') return false;
        if (mistakeFilter === 'all') return true;
        if (mistakeFilter === 'full' && item.isFullMistake) return true;
        if (mistakeFilter === 'half' && item.isHalfMistake) return true;
        return false;
      })
    : [];

  // Helper label mapping for mistakes
  const getMistakeLabel = (type?: string) => {
    switch (type) {
      case 'wrong-word': return 'Wrong Word';
      case 'missing-word': return 'Missing Word';
      case 'repeated-word': return 'Repeated Word';
      case 'number-error': return 'Number Error';
      case 'capital-error': return 'Capital Proper Noun';
      case 'sentence-start-error': return 'Sentence Start Casing';
      case 'singular-plural-error': return 'Singular/Plural Mismatch';
      case 'minor-spelling': return 'Minor Spelling';
      case 'question-mark-error': return 'Question Mark Mistake';
      case 'full-stop-error': return 'Full Stop Error';
      default: return 'Mismatch';
    }
  };

  return (
    <div className="space-y-6 py-6" id="dictation-practice-view">
      {/* Back button and title bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors max-w-max"
          id="btn-back-to-library"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Library</span>
        </button>

        <div className="text-xs text-slate-500">
          Book: <span className="text-slate-300 font-semibold">{bookName}</span> &bull; {dictation.volumeOrMonth}
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${
            isGradeC ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
          }`}>
            SSC Grade {dictation.grade} Practice
          </span>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white mt-1.5">
            {bookName} - {selectionLabel} #{dictation.dictationNumber}
          </h1>
          <p className="text-xs text-slate-400">
            Current tempo: {speedWpm} Words Per Minute (WPM)
          </p>
        </div>

        {/* Action Status Indicator / Live Countdown Timer */}
        <div className="flex items-center space-x-4">
          {practiceActive && (
            <div className="flex items-center space-x-2 rounded-xl bg-slate-900 px-3.5 py-1.5 border border-slate-800 font-mono text-sm font-semibold text-emerald-400">
              <Clock className="h-4 w-4 animate-pulse" />
              <span>Time Left: {formatTime(timeLeft)}</span>
            </div>
          )}
          <div className="flex items-center space-x-2 text-xs">
            <div className={`h-2.5 w-2.5 rounded-full ${
              submitted 
                ? 'bg-emerald-500' 
                : practiceActive 
                  ? 'bg-amber-500 animate-pulse' 
                  : 'bg-slate-700'
            }`} />
            <span className="font-semibold text-slate-300">
              {submitted ? 'Transcription Evaluated' : practiceActive ? 'Active Practice' : 'Ready to Start'}
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="h-10 w-10 text-emerald-500 animate-spin" />
          <p className="text-sm text-slate-400">Loading dictation parameters from Google Sheet CMS...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Area: Typing Editor and Controls */}
          <div className="lg:col-span-8 space-y-6">
            <AdPlaceholder type="top-banner" />

            {/* API Warning if any */}
            {apiError && (
              <div className="rounded-xl border border-amber-500/10 bg-amber-500/5 p-4 flex items-start space-x-3 text-xs text-amber-400">
                <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                <p>{apiError}</p>
              </div>
            )}

            {/* Practice Controls */}
            <div className="flex items-center justify-between bg-slate-900/30 border border-slate-800 p-4 rounded-xl">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleStart}
                  disabled={practiceActive || submitted}
                  className={`inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    practiceActive || submitted
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/20'
                  }`}
                  id="btn-start-practice"
                >
                  <Play className="h-4 w-4" />
                  <span>Start Practice</span>
                </button>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center space-x-1.5 px-3 py-2.5 rounded-lg text-xs font-semibold border border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-slate-300 transition-all"
                  id="btn-reset-practice"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset</span>
                </button>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!practiceActive || submitted}
                className={`inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  !practiceActive || submitted
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-950/20'
                }`}
                id="btn-submit-practice"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Submit Transcription</span>
              </button>
            </div>

            {/* Typing Editor */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label htmlFor="steno-transcription-editor" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Transcription Output Zone
                </label>
                <div className="flex items-center space-x-3 text-xs text-slate-400">
                  <span>Character Count: <strong className="text-slate-200">{typingValue.length}</strong></span>
                  <span>Word Count: <strong className="text-slate-200">{typingValue.trim() ? typingValue.trim().split(/\s+/).length : 0}</strong></span>
                </div>
              </div>

              <textarea
                id="steno-transcription-editor"
                value={typingValue}
                onChange={(e) => setTypingValue(e.target.value)}
                disabled={!practiceActive || submitted}
                placeholder={
                  practiceActive 
                    ? "Begin transcribing your shorthand outlines here. Focus on spelling accuracy. Commas and hyphens are ignored, but Full Stops and Question Marks count towards mistakes!" 
                    : submitted
                      ? "Transcription submitted. Review your evaluation stats below."
                      : "Click 'Start Practice' above to unlock the editor and initiate the exam timer."
                }
                className="typing-textarea w-full h-[360px] p-6 rounded-2xl border border-slate-800 bg-slate-900/20 text-slate-200 placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors resize-y leading-relaxed"
              />
            </div>

            {/* Evaluation Results Panels */}
            {submitted && evaluation && (
              <div className="space-y-6" id="practice-result-placeholder">
                {/* Result Hero Header */}
                <div className={`rounded-2xl border p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  evaluation.passFail === 'PASS' 
                    ? 'border-emerald-500/20 bg-emerald-500/5' 
                    : 'border-rose-500/20 bg-rose-500/5'
                }`}>
                  <div className="space-y-1">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      evaluation.passFail === 'PASS' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      SSC Evaluation Status
                    </span>
                    <h3 className="font-display text-2xl font-extrabold tracking-tight text-white mt-1">
                      Result: <span className={evaluation.passFail === 'PASS' ? 'text-emerald-400' : 'text-rose-400'}>{evaluation.passFail}</span>
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Your final error ratio is <strong className="text-slate-200">{evaluation.finalErrorPct}%</strong>.
                      For Grade {dictation.grade}, the maximum allowed error limit is <strong className="text-slate-200">{isGradeC ? '5%' : '7%'}</strong>.
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-slate-500 font-semibold uppercase">Final Error Value</div>
                    <div className="text-4xl font-black font-display text-white mt-0.5">
                      {evaluation.finalErrorPct}%
                    </div>
                  </div>
                </div>

                {/* Performance Stats Bento-Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl text-center space-y-1">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Total Dictated Words</span>
                    <div className="text-2xl font-bold text-white">{evaluation.totalWords}</div>
                  </div>
                  <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl text-center space-y-1">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Correct Aligned Words</span>
                    <div className="text-2xl font-bold text-emerald-400">{evaluation.correctWords}</div>
                  </div>
                  <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl text-center space-y-1">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Full Mistakes</span>
                    <div className="text-2xl font-bold text-rose-400">{evaluation.fullMistakes}</div>
                    <span className="text-[9px] text-slate-500">Weight: 1.0 each</span>
                  </div>
                  <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl text-center space-y-1">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Half Mistakes</span>
                    <div className="text-2xl font-bold text-amber-400">{evaluation.halfMistakes}</div>
                    <span className="text-[9px] text-slate-500">Weight: 0.5 each</span>
                  </div>
                </div>

                {/* Error Breakdown Category Accordion */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 space-y-4">
                  <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-3">
                    Detailed Mistake Classification
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-xs">
                    {/* Full Mistakes */}
                    <div className="space-y-2">
                      <div className="text-[10px] font-bold text-rose-400 uppercase tracking-widest pb-1 border-b border-rose-500/10">Full Mistakes (Weight 1.0)</div>
                      <div className="flex justify-between py-1 text-slate-300">
                        <span>Omissions (Missing Words):</span>
                        <strong className="text-white font-mono">{evaluation.missingWords}</strong>
                      </div>
                      <div className="flex justify-between py-1 text-slate-300">
                        <span>Substitutions (Wrong Words):</span>
                        <strong className="text-white font-mono">{evaluation.wrongWords}</strong>
                      </div>
                      <div className="flex justify-between py-1 text-slate-300">
                        <span>Additions (Repeated Words):</span>
                        <strong className="text-white font-mono">{evaluation.repeatedWords}</strong>
                      </div>
                      <div className="flex justify-between py-1 text-slate-300">
                        <span>Digit/Number Mis-writings:</span>
                        <strong className="text-white font-mono">{evaluation.numberErrors}</strong>
                      </div>
                      <div className="flex justify-between py-1 text-slate-300">
                        <span>Question Mark Mis-writings:</span>
                        <strong className="text-white font-mono">{evaluation.questionMarkErrors}</strong>
                      </div>
                    </div>

                    {/* Half Mistakes */}
                    <div className="space-y-2">
                      <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest pb-1 border-b border-amber-500/10">Half Mistakes (Weight 0.5)</div>
                      <div className="flex justify-between py-1 text-slate-300">
                        <span>Singular/Plural Differences:</span>
                        <strong className="text-white font-mono">{evaluation.singularPluralErrors}</strong>
                      </div>
                      <div className="flex justify-between py-1 text-slate-300">
                        <span>Proper Noun Capitalization:</span>
                        <strong className="text-white font-mono">{evaluation.capitalErrors}</strong>
                      </div>
                      <div className="flex justify-between py-1 text-slate-300">
                        <span>Sentence Start Casing:</span>
                        <strong className="text-white font-mono">{evaluation.sentenceStartErrors}</strong>
                      </div>
                      <div className="flex justify-between py-1 text-slate-300">
                        <span>Minor Spelling Typos:</span>
                        <strong className="text-white font-mono">{evaluation.minorSpellingErrors}</strong>
                      </div>
                      <div className="flex justify-between py-1 text-slate-300">
                        <span>Full Stop Misplacement:</span>
                        <strong className="text-white font-mono">{evaluation.fullStopErrors}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mistake Log (Protects draft from screen scrapes by never rendering the full transcript) */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div>
                      <h4 className="font-display text-sm font-bold text-slate-200">
                        Mistake Analysis Log
                      </h4>
                      <p className="text-[10px] text-slate-500 mt-1">
                        Review individual mistakes below. To protect official exam drafts, we do not print the original answer sheet in bulk.
                      </p>
                    </div>

                    {/* Filter controls */}
                    <div className="flex items-center space-x-2">
                      <Filter className="h-4 w-4 text-slate-500" />
                      <select
                        value={mistakeFilter}
                        onChange={(e) => setMistakeFilter(e.target.value)}
                        className="rounded-lg border border-slate-800 bg-slate-900 py-1 px-3 text-xs text-slate-300 focus:outline-none"
                      >
                        <option value="all">All Mistakes</option>
                        <option value="full">Full Mistakes Only</option>
                        <option value="half">Half Mistakes Only</option>
                      </select>
                    </div>
                  </div>

                  {filteredMistakes.length === 0 ? (
                    <div className="text-center py-6 text-slate-500 text-xs">
                      No matching mistakes found! Outstanding job!
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                      {filteredMistakes.map((item, index) => (
                        <div 
                          key={index} 
                          className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border text-xs gap-3 ${
                            item.isFullMistake 
                              ? 'border-rose-500/10 bg-rose-500/5' 
                              : 'border-amber-500/10 bg-amber-500/5'
                          }`}
                        >
                          <div className="space-y-1">
                            <span className={`inline-flex rounded px-1.5 py-0.5 text-[9px] font-mono uppercase ${
                              item.isFullMistake ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                            }`}>
                              {item.isFullMistake ? 'Full Mistake' : 'Half Mistake'} &bull; {getMistakeLabel(item.mistakeType)}
                            </span>
                            
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              {item.expected && (
                                <span className="text-slate-400">
                                  Expected: <strong className="text-slate-100 line-through bg-slate-800/60 px-1.5 py-0.5 rounded font-mono">{item.expected}</strong>
                                </span>
                              )}
                              {item.student && (
                                <span className="text-slate-400">
                                  Typed: <strong className="text-emerald-400 bg-slate-800/60 px-1.5 py-0.5 rounded font-mono">{item.student}</strong>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <AdPlaceholder type="result-bottom" />
              </div>
            )}
          </div>

          {/* Right Area: Parameters Summary & Sidebars */}
          <div className="lg:col-span-4 space-y-6">
            {/* Practice Parameters Cards */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 space-y-5">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-3">
                Practice Parameters
              </h3>

              <div className="space-y-4">
                {/* Allowed Time */}
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-emerald-500 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-tight">Allowed Transcription Time</h4>
                    <p className="text-lg font-bold text-white mt-0.5">{allowedMinutes} Minutes</p>
                    <p className="text-[10px] text-slate-500">Official duration limit for Grade {dictation.grade} transcript typing.</p>
                  </div>
                </div>

                {/* Passing Mistake Margin */}
                <div className="flex items-start space-x-3">
                  <Award className="h-5 w-5 text-purple-400 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-tight">Max Allowed Mistakes</h4>
                    <p className="text-lg font-bold text-white mt-0.5">{100 - (isGradeC ? stenoConfig.passingPercentage.gradeC : stenoConfig.passingPercentage.gradeD)}% Errors</p>
                    <p className="text-[10px] text-slate-500">Requires at least {isGradeC ? stenoConfig.passingPercentage.gradeC : stenoConfig.passingPercentage.gradeD}% transcribing word accuracy to qualify.</p>
                  </div>
                </div>

                {/* Target Speed */}
                <div className="flex items-start space-x-3">
                  <FileText className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-tight">Dictated Speed</h4>
                    <p className="text-lg font-bold text-white mt-0.5">{speedWpm} WPM</p>
                    <p className="text-[10px] text-slate-500">Total Approximate Word Count: <strong className="text-slate-300">{(transcriptData ? transcriptData.wordCount : (isGradeC ? 1000 : 800))} words</strong>.</p>
                  </div>
                </div>
              </div>
            </div>

            <AdPlaceholder type="sidebar" />
          </div>
        </div>
      )}
      <CopyrightNotice />

      {/* Custom Confirmation Modals */}
      {showResetModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-amber-500">
              <AlertTriangle className="h-6 w-6" />
              <h3 className="font-display text-lg font-bold text-white">Reset Transcription?</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Are you sure you want to clear your current progress and reset the transcription timer? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold border border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white transition-colors"
              >
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {showSubmitModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-emerald-500">
              <CheckCircle2 className="h-6 w-6" />
              <h3 className="font-display text-lg font-bold text-white">Submit for SSC Evaluation?</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Are you sure you want to submit your transcription for evaluation? You will not be able to edit your text further.
            </p>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold border border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
