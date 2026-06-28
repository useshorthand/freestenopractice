/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles } from 'lucide-react';
import { stenoConfig } from '../config/stenoConfig';

interface AdPlaceholderProps {
  type: 'top-banner' | 'footer' | 'sidebar' | 'result-bottom';
}

export default function AdPlaceholder({ type }: AdPlaceholderProps) {
  if (!stenoConfig.featureToggles.enableAds) {
    return null;
  }

  const dimensions = {
    'top-banner': 'h-24 w-full max-w-4xl mx-auto',
    'footer': 'h-28 w-full max-w-4xl mx-auto',
    'sidebar': 'h-96 w-full max-w-[280px]',
    'result-bottom': 'h-32 w-full max-w-3xl mx-auto',
  };

  const label = {
    'top-banner': 'Advertisement - Top Banner (728x90 / 970x90)',
    'footer': 'Advertisement - Footer Banner (728x90)',
    'sidebar': 'Advertisement - Sidebar (300x600)',
    'result-bottom': 'Advertisement - Result Page Bottom (336x280 / 728x90)',
  };

  const slotId = {
    'top-banner': stenoConfig.adsSettings.topBannerSlotId,
    'footer': stenoConfig.adsSettings.footerSlotId,
    'sidebar': stenoConfig.adsSettings.sidebarSlotId,
    'result-bottom': stenoConfig.adsSettings.resultBottomSlotId,
  };

  return (
    <div
      className={`relative my-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-900/40 px-4 text-center ${dimensions[type]}`}
      id={`ad-slot-${type}`}
      aria-label="Advertisement Sponsor Slot"
    >
      <div className="absolute top-2 right-3 flex items-center space-x-1">
        <Sparkles className="h-3 w-3 text-emerald-500" />
        <span className="text-[9px] uppercase font-semibold text-emerald-400 tracking-wider">
          Sponsor
        </span>
      </div>

      <p className="font-mono text-[10px] text-slate-500 select-none">
        {label[type]}
      </p>
      <p className="font-mono text-[9px] text-slate-600 mt-1 select-none">
        Slot ID: {slotId[type]}
      </p>
    </div>
  );
}
