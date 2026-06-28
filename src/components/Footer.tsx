/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppView } from '../types';
import { BookOpen } from 'lucide-react';
import { stenoConfig } from '../config/stenoConfig';

interface FooterProps {
  setCurrentView: (view: AppView) => void;
}

export default function Footer({ setCurrentView }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950/60 py-12" id="app-footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2 text-white">
              <BookOpen className="h-6 w-6 text-emerald-500" />
              <span className="font-display text-xl font-bold tracking-tight">
                {stenoConfig.websiteName}
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              A premium, offline-ready transcription and evaluation platform built specifically for SSC Stenographer Grade C and Grade D candidates to hone their skills.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-200">
              Practice Sections
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => setCurrentView('kailash-chandra')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Kailash Chandra Transcriptions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('progressive-magazine')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Progressive Magazine
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('unseen-dictation')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Unseen Dictations (Coming Soon)
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Pages & Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-200">
              Support & Legal
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => setCurrentView('about')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('contact')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('privacy-policy')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('terms-of-service')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('disclaimer')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('cookie-policy')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-slate-800" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} {stenoConfig.websiteName}. All rights reserved.</p>
          <p className="max-w-md text-center md:text-right leading-normal">
            Disclaimer: This is an independent preparation resource and is not affiliated with, endorsed by, or connected to the Staff Selection Commission (SSC) or any government agency.
          </p>
        </div>
      </div>
    </footer>
  );
}
