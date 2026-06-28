/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Award, Keyboard, Sparkles, TrendingUp, BookOpen, 
  Clock, Zap, CheckCircle2, ChevronRight, FileText 
} from 'lucide-react';
import { AppView } from '../types';
import { stenoConfig } from '../config/stenoConfig';
import NoticeBox from '../components/NoticeBox';

interface HomeProps {
  setCurrentView: (view: AppView) => void;
}

export default function Home({ setCurrentView }: HomeProps) {
  const features = [
    {
      icon: Award,
      title: 'SSC Pattern Evaluation',
      description: 'Engineered with official SSC Grade C & D mistake calculation guidelines for exact evaluation scores.',
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
    },
    {
      icon: Keyboard,
      title: 'Typing Practice Area',
      description: 'A distraction-free transcription typing environment with optimized spacing, reducing eye strain.',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      icon: Clock,
      title: 'Grade C Practice',
      description: 'Transcriptions calibrated for 100 WPM dictations, matching official national skill tests.',
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
    },
    {
      icon: TrendingUp,
      title: 'Grade D Practice',
      description: 'Dedicated sets for 80 WPM dictations with customizable transcribing allowed timers.',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    },
    {
      icon: Zap,
      title: 'Progress Tracking',
      description: 'Complete architecture designed to save historical transcription accuracy results on client local state.',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
    },
    {
      icon: Sparkles,
      title: 'Future Unseen Dictations',
      description: 'Fully planned support for fresh dictations accompanied by high fidelity studio recorded audios.',
      color: 'text-pink-400 bg-pink-500/10 border-pink-500/20'
    },
    {
      icon: CheckCircle2,
      title: 'Professional Results',
      description: 'Detailed breakdowns distinguishing between full mistakes, half mistakes, and spelling errors.',
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
    },
    {
      icon: BookOpen,
      title: 'Fast Performance',
      description: 'Super lightweight client-side structure designed for instant loading even on 3G networks.',
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
    }
  ];

  return (
    <div className="space-y-12 py-6" id="home-view">
      {/* Hero Section */}
      <section className="text-center space-y-4 max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
          <Sparkles className="h-4 w-4" />
          <span>Made for SSC Stenographer Aspirants</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Master Your Stenography Transcription Practice
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto font-sans">
          {stenoConfig.websiteSubtitle} Practice volume-wise Kailash Chandra and month-wise Progressive Magazine to guarantee your qualification.
        </p>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setCurrentView('kailash-chandra')}
            className="inline-flex items-center justify-center space-x-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 hover:bg-emerald-500 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <FileText className="h-5 w-5" />
            <span>Practice Kailash Chandra</span>
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => setCurrentView('progressive-magazine')}
            className="inline-flex items-center justify-center space-x-2 rounded-xl bg-slate-800 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <BookOpen className="h-5 w-5" />
            <span>Practice Progressive Magazine</span>
          </button>
        </div>
      </section>

      {/* Notice Box Container */}
      <section className="max-w-4xl mx-auto px-4">
        <NoticeBox />
      </section>

      {/* Feature Cards Grid */}
      <section className="space-y-6 max-w-6xl mx-auto px-4">
        <div className="text-center space-y-1">
          <h2 className="font-display text-2xl font-bold tracking-tight text-white">
            Designed for Peak Practice Efficiency
          </h2>
          <p className="text-sm text-slate-400">
            Engineered meticulously to meet the high demands of Grade C & D typing dictations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="group relative rounded-2xl border border-slate-800 bg-slate-900/30 p-6 hover:bg-slate-900/60 transition-all duration-200"
              >
                <div className={`inline-flex rounded-lg p-2.5 border ${feature.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-semibold text-slate-100 mt-4 tracking-tight group-hover:text-emerald-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
