/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WebsiteConfig } from '../types';

export const stenoConfig: WebsiteConfig = {
  websiteName: 'Free Steno Practice',
  websiteSubtitle: 'Free professional online English stenography practice platform for SSC Stenographer Grade C & D candidates.',
  passingPercentage: {
    gradeC: 95, // max 5% mistakes allowed (i.e. 95% accuracy required)
    gradeD: 93, // max 7% mistakes allowed (i.e. 93% accuracy required)
  },
  targetWpm: {
    gradeC: 100,
    gradeD: 80,
  },
  allowedTimeMinutes: {
    gradeC: 40, // 40 minutes default allowed transcription typing time
    gradeD: 50, // 50 minutes default allowed transcription typing time
  },
  featureToggles: {
    enableAudio: false, // Notice states: Audio only for future Unseen Dictations
    enableSearch: true,
    enableAds: true,
    enableProgressTracking: true,
  },
  adsSettings: {
    topBannerSlotId: 'ca-pub-1234567890123456/top_banner',
    sidebarSlotId: 'ca-pub-1234567890123456/sidebar',
    footerSlotId: 'ca-pub-1234567890123456/footer',
    resultBottomSlotId: 'ca-pub-1234567890123456/result_bottom',
  },
  apiUrls: {
    googleAppsScriptUrl: 'https://script.google.com/macros/s/AKfycbyYlAx_C7qI-YTdfajoBmQDOHDz-qIxr5NNf-UjjwRfuhQ_xu9qr-9nHXaQxeCZ4Ajh/exec',
    googleSheetsUrl: 'https://docs.google.com/spreadsheets/d/placeholder-id/edit',
  },
};

// Kailash Chandra Volumes definitions: 1 to 24
export const kcVolumesList = Array.from({ length: 24 }, (_, i) => `Volume ${i + 1}`);
export const kcTranscriptionsCount = 22; // 22 transcriptions per grade

// Progressive Magazine Months helper starting September 2025.
// Let's generate a dynamic list of months up to the current year/month.
export function getProgressiveMagazineMonths(limit: number = 16): string[] {
  const startYear = 2025;
  const startMonthIndex = 8; // September is 8 (0-indexed)
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const list: string[] = [];
  let currentYear = startYear;
  let currentMonthIndex = startMonthIndex;

  for (let i = 0; i < limit; i++) {
    list.push(`${months[currentMonthIndex]} ${currentYear}`);
    currentMonthIndex++;
    if (currentMonthIndex > 11) {
      currentMonthIndex = 0;
      currentYear++;
    }
  }

  return list;
}

export const pmDictationsCount = 26; // 26 dictations per grade
export const pmMonthsList = getProgressiveMagazineMonths(16); // Predefined first 16 months starting Sept 2025
