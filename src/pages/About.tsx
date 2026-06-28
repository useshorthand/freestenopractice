/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Target, CheckCircle2, Award, Heart } from 'lucide-react';
import { stenoConfig } from '../config/stenoConfig';

export default function About() {
  return (
    <div className="space-y-12 py-10 max-w-4xl mx-auto px-4" id="about-view">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-white">
          About {stenoConfig.websiteName}
        </h1>
        <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Empowering English shorthand stenography aspirants with professional, rigorous, and accessible mock test simulators.
        </p>
      </div>

      {/* Narrative Section */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/10 p-8 space-y-6">
        <h2 className="font-display text-2xl font-bold text-white tracking-tight">
          Our Purpose and Mission
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          The national Staff Selection Commission (SSC) Stenographer skill tests demand absolute precision and endurance. Typing out hundreds of lines of shorthand transcripts under strict timers is a hurdle that requires daily dedicated practice.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          <strong>Free Steno Practice</strong> was designed to remove the friction from this process. We provide high-quality structural practice environments modeled directly on classical dictation resources like the <em>Kailash Chandra</em> volumes and <em>Progressive Magazine</em> editions.
        </p>
        <p className="text-sm text-slate-400 leading-relaxed">
          By utilizing our practice sheets, students can type their dictated matters under authentic conditions and get instant visualization of their transcribed outputs. This helps candidates optimize their muscle memory, catch repetitive spelling faults, and secure full marks in the actual skill test.
        </p>
      </div>

      {/* Core Values / Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 space-y-3">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
            <Target className="h-4 w-4" />
          </div>
          <h3 className="font-display text-sm font-semibold text-slate-100">Absolute Accessibility</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            All practice materials are open to everyone, ensuring high-quality exam preparations are democratized for all students.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 space-y-3">
          <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
            <Award className="h-4 w-4" />
          </div>
          <h3 className="font-display text-sm font-semibold text-slate-100">SSC Exam Standard</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Features standard allowed times and mistake margins modeled exactly on official department rules.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 space-y-3">
          <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
            <Heart className="h-4 w-4" />
          </div>
          <h3 className="font-display text-sm font-semibold text-slate-100">Eye-Friendly Interface</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Styled with muted slate-dark colors to let stenographers focus and type comfortably for hours without physical fatigue.
          </p>
        </div>
      </div>
    </div>
  );
}
