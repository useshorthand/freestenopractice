/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { kcVolumesList, kcTranscriptionsCount } from '../config/stenoConfig';
import { GradeType, DictationId } from '../types';
import { BookOpen, Award, CheckCircle, ChevronRight, Play } from 'lucide-react';
import CopyrightNotice from '../components/CopyrightNotice';

interface KailashChandraProps {
  onSelectDictation: (dictation: DictationId) => void;
  searchFilter?: string;
}

export default function KailashChandra({ onSelectDictation, searchFilter = '' }: KailashChandraProps) {
  const [selectedVolume, setSelectedVolume] = useState<string>('Volume 1');
  const [selectedGrade, setSelectedGrade] = useState<GradeType>('D');

  // Filtered transcriptions based on global search
  const isSearching = searchFilter.trim().length > 0;
  
  // All transcriptions generated dynamically
  const allTranscriptions: { volume: string; grade: GradeType; number: number }[] = [];
  kcVolumesList.forEach((vol) => {
    (['C', 'D'] as GradeType[]).forEach((grd) => {
      for (let num = 1; num <= kcTranscriptionsCount; num++) {
        allTranscriptions.push({ volume: vol, grade: grd, number: num });
      }
    });
  });

  const matchingTranscriptions = allTranscriptions.filter((item) => {
    if (!isSearching) return false;
    const searchLower = searchFilter.toLowerCase();
    const matchesVol = item.volume.toLowerCase().includes(searchLower);
    const matchesNum = `transcription ${item.number}`.includes(searchLower) || `#${item.number}`.includes(searchLower);
    const matchesGrade = `grade ${item.grade.toLowerCase()}`.includes(searchLower);
    return matchesVol || matchesNum || matchesGrade;
  });

  return (
    <div className="space-y-8 py-6" id="kailash-chandra-view">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-emerald-400">
          <BookOpen className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-wider">Classic Series</span>
        </div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Kailash Chandra Practice Library
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Access Volume 1 to 24 transcriptions. Select a volume, set your target grade, and begin transcribing your notes with instant error analysis.
        </p>
      </div>

      {isSearching ? (
        /* Search Results Panel */
        <div className="space-y-4">
          <h2 className="font-display text-lg font-semibold text-slate-200">
            Search Results for &ldquo;{searchFilter}&rdquo;
          </h2>
          {matchingTranscriptions.length === 0 ? (
            <div className="rounded-xl border border-slate-800 bg-slate-900/20 p-8 text-center text-slate-500 text-sm">
              No matching Kailash Chandra transcriptions found. Try searching for &quot;Volume 3&quot; or &quot;Transcription 12&quot;.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchingTranscriptions.slice(0, 30).map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectDictation({
                    book: 'kailash-chandra',
                    volumeOrMonth: item.volume,
                    grade: item.grade,
                    dictationNumber: item.number
                  })}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/40 p-4 hover:bg-slate-900/80 hover:border-emerald-500/30 transition-all text-left group"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-slate-500">{item.volume}</span>
                    <h4 className="text-sm font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">
                      Transcription {item.number}
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
              {matchingTranscriptions.length > 30 && (
                <div className="col-span-full text-center text-xs text-slate-500">
                  Showing top 30 search matches. Refine your search query for precise results.
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Standard Navigation Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Volume Selection list */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-500 px-2">
              Select Volume (1 to 24)
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-1 gap-2 max-h-[460px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800">
              {kcVolumesList.map((vol) => (
                <button
                  key={vol}
                  onClick={() => setSelectedVolume(vol)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold tracking-tight transition-all text-left ${
                    selectedVolume === vol
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-md'
                      : 'bg-slate-900/40 text-slate-400 hover:bg-slate-900/80 border border-slate-800/60'
                  }`}
                >
                  <span>{vol}</span>
                  <ChevronRight className={`h-3 w-3 ${selectedVolume === vol ? 'text-emerald-400' : 'text-slate-600'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Grade and Transcriptions View */}
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

            {/* Transcriptions Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-500">
                  Available Transcriptions (1 to {kcTranscriptionsCount})
                </h3>
                <span className="text-xs font-medium text-slate-400">
                  {selectedVolume} &bull; Grade {selectedGrade}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {Array.from({ length: kcTranscriptionsCount }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => onSelectDictation({
                      book: 'kailash-chandra',
                      volumeOrMonth: selectedVolume,
                      grade: selectedGrade,
                      dictationNumber: num
                    })}
                    className="group flex flex-col justify-between p-3.5 rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-900/60 hover:border-emerald-500/20 hover:shadow-lg transition-all text-left"
                  >
                    <span className="text-[10px] font-mono text-slate-500">T-{num}</span>
                    <h4 className="text-xs font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors mt-1.5">
                      Transcription {num}
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
