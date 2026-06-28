/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppView =
  | 'home'
  | 'kailash-chandra'
  | 'progressive-magazine'
  | 'unseen-dictation'
  | 'about'
  | 'contact'
  | 'dictation'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'disclaimer'
  | 'cookie-policy';

export type GradeType = 'C' | 'D';

export interface DictationId {
  book: 'kailash-chandra' | 'progressive-magazine';
  volumeOrMonth: string; // "Volume 1", "September 2025", etc.
  grade: GradeType;
  dictationNumber: number; // 1 to 22, 1 to 26, etc.
}

export interface WebsiteConfig {
  websiteName: string;
  websiteSubtitle: string;
  passingPercentage: {
    gradeC: number; // e.g. 95 (meaning max 5% errors)
    gradeD: number; // e.g. 93 (meaning max 7% errors)
  };
  targetWpm: {
    gradeC: number; // 100
    gradeD: number; // 80
  };
  allowedTimeMinutes: {
    gradeC: number; // e.g. 40 minutes for transcript evaluation
    gradeD: number; // e.g. 50 minutes
  };
  featureToggles: {
    enableAudio: boolean; // currently unavailable, only for future unseen dictation
    enableSearch: boolean;
    enableAds: boolean;
    enableProgressTracking: boolean;
  };
  adsSettings: {
    topBannerSlotId: string;
    sidebarSlotId: string;
    footerSlotId: string;
    resultBottomSlotId: string;
  };
  apiUrls: {
    googleAppsScriptUrl: string;
    googleSheetsUrl: string;
  };
}
