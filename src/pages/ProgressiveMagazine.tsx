/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { pmMonthsList, pmDictationsCount } from '../config/stenoConfig';
import { GradeType, DictationId } from '../types';
import { BookOpen, Calendar, ChevronRight, Play } from 'lucide-react';
import CopyrightNotice from '../components/CopyrightNotice';

interface ProgressiveMagazineProps {
  onSelectDictation: (dictation: DictationId) => void;
  searchFilter?: string;
}

export default function ProgressiveMagazine({ onSelectDictation, searchFilter = '' }: ProgressiveMagazineProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>(pmMonthsList[0]);
  const [selectedGrade, setSelectedGrade] = useState<GradeType>('D');

  const isSearching = searchFilter.trim().length > 0;

  // Flattened structure for search matching
  const allDictations: { month: string; grade: GradeType; number: number }[] = [];
  pmMonthsList.forEach((mon) => {
    (['C', 'D'] as GradeType[]).forEach((grd) => {
      for (let num = 1; num <= pmDictationsCount; num++) {
        allDictations.push({ month: mon, grade: grd, number: num });
      }
    });
  });

  const matchingDictations = allDictations.filter((item) => {
    if (!isSearching) return false;
    const searchLower = searchFilter.toLowerCase();
    const matchesMonth = item.month.toLowerCase().includes(searchLower);
    const matchesNum = `dictation ${item.number}`.includes(searchLower) || `#${item.number}`.includes(searchLower);
    const matchesGrade = `grade ${item.grade.toLowerCase()}`.includes(searchLower);
    return matchesMonth || matchesNum || matchesGrade;
  });

  return (
    <div className="space-y-8 py-6" id="progressive-magazine-view">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-emerald-400">
          <Calendar className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-wider">Contemporary Series</span>
        </div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Progressive Magazine Library
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Access month-wise Progressive Magazine dictation materials starting from September 2025. Test dynamic editorial matter mapped strictly to the target tempos of SSC Grade C and Grade D.
        </p>
      </div>

      {isSearching ? (
        /* Search Results Panel */
        <div className="space-y-4">
          <h2 className="font-display text-lg font-semibold text-slate-200">
            Search Results for &ldquo;{searchFilter}&rdquo;
          </h2>
          {matchingDictations.length === 0 ? (
            <div className="rounded-xl border border-slate-800 bg-slate-900/20 p-8 text-center text-slate-500 text-sm">
              No matching Progressive Magazine dictations found. Try searching for &quot;September 2025&quot; or &quot;Dictation 4&quot;.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchingDictations.slice(0, 30).map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectDictation({
                    book: 'progressive-magazine',
                    volumeOrMonth: item.month,
                    grade: item.grade,
                    dictationNumber: item.number
                  })}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/40 p-4 hover:bg-slate-900/80 hover:border-emerald-500/30 transition-all text-left group"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-slate-500">{item.month}</span>
                    <h4 className="text-sm font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">
                      Dictation {item.number}
                    </h4>
                    <span className={`inline-flex rounded px-1.5 py-0.5 text-[10px] font-semibold mt-1 ${
                      item.grade === 'C' ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'
                    }`}>
                      Grade {item.grade} ({item.grade === 'C' ? '100' : '80'} WPM)
                    </span>
                  </div>
                  <Play className="h-4 w-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
              {matchingDictations.length > 30 && (
                <div className="col-span-full text-center text-xs text-slate-500">
                  Showing top 30 search matches. Refine your search query for precise results.
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Standard Month Navigation Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Month Selection list */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-500 px-2">
              Select Practice Month
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 max-h-[460px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800">
              {pmMonthsList.map((month) => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-tight transition-all text-left ${
                    selectedMonth === month
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-md'
                      : 'bg-slate-900/40 text-slate-400 hover:bg-slate-900/80 border border-slate-800/60'
                  }`}
                >
                  <span>{month}</span>
                  <ChevronRight className={`h-3 w-3 ${selectedMonth === month ? 'text-emerald-400' : 'text-slate-600'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Grade and Dictations View */}
          <div className="lg:col-span-8 space-y-6">
            {/* Grade Selection buttons */}
            <div className="bg-slate-900/30 border border-slate-800 p-1.5 rounded-xl flex items-center space-x-2 max-w-sm">
              <button
                onClick={() => setSelectedGrade('D')}
                className={`flex-1 flex flex-col items-center py-2 px-3 rounded-lg text-center transition-all ${
                  selectedGrade === 'D'
                    ? 'bg-slate-800 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="text-xs font-bold">Grade D</span>
                <span className="text-[10px] text-slate-500">80 WPM Target</span>
              </button>
              <button
                onClick={() => setSelectedGrade('C')}
                className={`flex-1 flex flex-col items-center py-2 px-3 rounded-lg text-center transition-all ${
                  selectedGrade === 'C'
                    ? 'bg-slate-800 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="text-xs font-bold">Grade C</span>
                <span className="text-[10px] text-slate-500">100 WPM Target</span>
              </button>
            </div>

            {/* Dictations Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-500">
                  Available Dictations (1 to {pmDictationsCount})
                </h3>
                <span className="text-xs font-medium text-slate-400">
                  {selectedMonth} &bull; Grade {selectedGrade}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {Array.from({ length: pmDictationsCount }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => onSelectDictation({
                      book: 'progressive-magazine',
                      volumeOrMonth: selectedMonth,
                      grade: selectedGrade,
                      dictationNumber: num
                    })}
                    className="group flex flex-col justify-between p-3.5 rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-900/60 hover:border-emerald-500/20 hover:shadow-lg transition-all text-left"
                  >
                    <span className="text-[10px] font-mono text-slate-500">D-{num}</span>
                    <h4 className="text-xs font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors mt-1.5">
                      Dictation {num}
                    </h4>
                    <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500">
                      <span>{selectedGrade === 'C' ? '100 WPM' : '80 WPM'}</span>
                      <Play className="h-3 w-3 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <CopyrightNotice />
    </div>
  );
}
