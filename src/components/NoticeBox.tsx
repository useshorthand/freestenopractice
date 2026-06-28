/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { AlertCircle, Info, Loader2 } from 'lucide-react';
import { ApiClient, DynamicNotice } from '../services/apiClient';

export default function NoticeBox() {
  const [notice, setNotice] = useState<DynamicNotice | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    async function getNotice() {
      setLoading(true);
      try {
        const data = await ApiClient.fetchNotice();
        if (active && data) {
          setNotice(data);
        }
      } catch (err) {
        console.warn('Failed to load live notice from CMS:', err);
      } finally {
        if (active) setLoading(false);
      }
    }
    getNotice();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-6 flex justify-center items-center text-xs text-slate-500 space-x-2">
        <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />
        <span>Syncing dynamic notices from CMS...</span>
      </div>
    );
  }

  const title = notice?.title || "Important Notice";
  const content = notice?.content || "You can practice Kailash Chandra and Progressive Magazine transcriptions by typing your own dictated matter.";
  const subContent = notice?.subContent || "Audio files are NOT provided for these sections. Audio will only be available in the future Unseen Dictation section.";

  return (
    <div 
      className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-slate-300 md:p-8"
      id="notice-box"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <AlertCircle className="h-6 w-6 text-amber-500" />
        </div>
        <div className="space-y-2">
          <h3 className="font-display text-lg font-semibold tracking-tight text-amber-400">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-slate-300">
            {content}
          </p>
          <p className="text-sm leading-relaxed text-slate-400">
            {subContent}
          </p>
          <div className="pt-2 flex items-center space-x-2 text-xs text-slate-500">
            <Info className="h-4 w-4 text-slate-400" />
            <span>Updates are synced dynamically from Google Sheets CMS. If a section is locked, it will activate automatically on publish.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
