/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Radio, Award, Headphones, ArrowRight, ShieldCheck } from 'lucide-react';
import CopyrightNotice from '../components/CopyrightNotice';

export default function UnseenDictation() {
  const futureSpecs = [
    {
      icon: Headphones,
      title: 'Studio Recorded Dictation Audios',
      description: 'Crystal clear voice accents recorded at strict 80 WPM and 100 WPM speeds to match SSC exam room audio acoustic levels.'
    },
    {
      icon: Radio,
      title: 'Adaptive Audio Pitch & Speed Controls',
      description: 'Easily adjust the speed from 0.8x up to 1.2x to challenge your stenography listening skills gradually.'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Unseen Draft System',
      description: 'Transcripts and answer keys will be fully secured and validated on server endpoint to avoid client cheating.'
    }
  ];

  return (
    <div className="space-y-12 py-10 max-w-5xl mx-auto px-4" id="unseen-dictation-view">
      {/* Hero Badge and Heading */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
          <Radio className="h-4 w-4 animate-pulse" />
          <span>Future Ready Module</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Unseen Dictation Practice
        </h1>
        <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          The ultimate testing environment. Experience fresh, never-before-heard exam drafts with high-fidelity audios and instant grading.
        </p>
      </div>

      {/* Big Coming Soon Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/10 p-8 sm:p-12 text-center space-y-4">
        <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 h-40 w-40 bg-blue-500/5 rounded-full blur-3xl" />

        <span className="text-sm font-bold uppercase tracking-widest text-emerald-400">
          Coming Soon in Part 3
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Live Audio Transcription Testing
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          We are currently engineering the static server and client-side audio player controls. Content will be progressively imported during Part 2 and Part 3 of the release.
        </p>

        <div className="pt-4">
          <span className="inline-flex items-center justify-center space-x-2 rounded-xl bg-slate-800/80 px-6 py-3 text-xs font-semibold text-slate-300 border border-slate-700/60">
            <span>Progress: Integration Design Completed</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          </span>
        </div>
      </div>

      {/* Feature teasers */}
      <div className="space-y-6">
        <h3 className="font-display text-lg font-bold text-slate-200 text-center uppercase tracking-wider">
          What is included in the Unseen module?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {futureSpecs.map((spec, i) => {
            const Icon = spec.icon;
            return (
              <div
                key={i}
                className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 space-y-4 hover:bg-slate-900/50 transition-colors"
              >
                <div className="inline-flex rounded-lg p-2.5 bg-slate-800 text-emerald-400 border border-slate-700/50">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="font-display text-sm font-semibold text-slate-100">
                  {spec.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {spec.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <CopyrightNotice />
    </div>
  );
}
