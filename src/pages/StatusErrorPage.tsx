/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  WifiOff, AlertTriangle, Hammer, ShieldAlert, 
  HelpCircle, RefreshCw, Home, ArrowLeft 
} from 'lucide-react';
import { AppView } from '../types';

export type ErrorType = '404' | 'offline' | 'api-unavailable' | 'no-content' | 'maintenance';

interface StatusErrorPageProps {
  type: ErrorType;
  customMessage?: string;
  onResolve?: () => void;
  onGoHome?: () => void;
}

export default function StatusErrorPage({ 
  type, 
  customMessage, 
  onResolve, 
  onGoHome 
}: StatusErrorPageProps) {
  
  const getErrorMeta = () => {
    switch (type) {
      case 'offline':
        return {
          icon: <WifiOff className="h-16 w-16 text-amber-500 animate-pulse" />,
          title: "Connection Lost",
          subtitle: "You are currently offline.",
          description: "Our steno platform is designed to be offline-first! You can continue typing and transcribing saved dictations. However, loading new transcriptions from the Google Sheet CMS requires an active internet connection.",
          solution: "Check your wi-fi/ethernet connection and try refreshing."
        };
      case 'api-unavailable':
        return {
          icon: <ShieldAlert className="h-16 w-16 text-rose-500" />,
          title: "CMS Connection Error",
          subtitle: "Unable to sync with Google Sheet.",
          description: "The application failed to fetch parameters or passages from the configured Google Apps Script API. This usually happens if the Apps Script Web App URL in 'stenoConfig.ts' is missing, set to a placeholder, or if the Apps Script deployment permissions are not set to 'Anyone'.",
          solution: "Review setup steps in SETUP_INSTRUCTIONS.md or verify Apps Script deployment is active."
        };
      case 'maintenance':
        return {
          icon: <Hammer className="h-16 w-16 text-purple-400" />,
          title: "Scheduled Maintenance",
          subtitle: "We will be back shortly!",
          description: "An administrator has flagged the platform as undergoing active maintenance. During this period, settings, announcements, and transcription parameters are being updated in the central Google Sheet.",
          solution: "Please check back in a few minutes. Shorthand requires continuous practice!"
        };
      case 'no-content':
        return {
          icon: <AlertTriangle className="h-16 w-16 text-slate-400" />,
          title: "No Content Published",
          subtitle: "Selected parameters contain zero rows.",
          description: "The sheet synced successfully, but there are currently no active passages matching this category. Make sure you have added rows to the appropriate sheet tab (KailashChandra or ProgressiveMagazine) and their status columns are set to 'Active'.",
          solution: "Verify rows exist in your spreadsheet and re-publish."
        };
      case '404':
      default:
        return {
          icon: <HelpCircle className="h-16 w-16 text-emerald-500" />,
          title: "View Not Found",
          subtitle: "This page does not exist.",
          description: "The requested practice view, legal section, or custom index cannot be resolved on our client router. Your progress and drafts remain completely safe.",
          solution: "Return to the practice library or refresh your session."
        };
    }
  };

  const meta = getErrorMeta();

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] text-center max-w-2xl mx-auto py-12 px-6 space-y-6" id={`status-error-${type}`}>
      {/* Icon Area */}
      <div className="p-4 rounded-full bg-slate-900/40 border border-slate-800/80">
        {meta.icon}
      </div>

      {/* Title Text */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
          System Diagnostics
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-black text-white">
          {meta.title}
        </h2>
        <p className="text-sm text-emerald-400 font-semibold">
          {meta.subtitle}
        </p>
      </div>

      {/* Description Box */}
      <div className="bg-slate-900/10 border border-slate-900 p-5 rounded-2xl text-xs text-slate-400 leading-relaxed space-y-3">
        <p>{customMessage || meta.description}</p>
        <div className="border-t border-slate-900 pt-3 flex items-center justify-center space-x-2 text-[11px] font-semibold text-slate-300">
          <span className="text-slate-500 uppercase tracking-wider">Troubleshooting:</span>
          <span>{meta.solution}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        {onResolve && (
          <button
            onClick={onResolve}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/20 transition-all cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
        )}

        {onGoHome && (
          <button
            onClick={onGoHome}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-semibold border border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-slate-300 transition-all cursor-pointer"
          >
            <Home className="h-4 w-4" />
            <span>Return to Dashboard</span>
          </button>
        )}
      </div>
    </div>
  );
}
