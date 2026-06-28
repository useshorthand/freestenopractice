/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DictationId, WebsiteConfig, GradeType } from '../types';
import { stenoConfig } from '../config/stenoConfig';

export interface DynamicNotice {
  title: string;
  content: string;
  subContent?: string;
}

export interface DynamicDictation {
  book: 'kailash-chandra' | 'progressive-magazine';
  volumeOrMonth: string;
  grade: GradeType;
  dictationNumber: number;
  wordCount: number;
  transcript: string;
  status: string;
  notes?: string;
}

// In-memory cache for API responses
const apiCache: Record<string, any> = {};

export class ApiClient {
  private static isPlaceholderUrl(): boolean {
    const url = stenoConfig.apiUrls.googleAppsScriptUrl;
    return !url || url.includes('placeholder-id') || url === 'MY_APP_URL';
  }

  // Fetch central dynamic website settings from Apps Script Web App
  public static async fetchSettings(): Promise<Partial<WebsiteConfig>> {
    if (this.isPlaceholderUrl()) {
      return {};
    }

    const cacheKey = 'site-settings';
    if (apiCache[cacheKey]) {
      return apiCache[cacheKey];
    }

    try {
      const response = await fetch(`${stenoConfig.apiUrls.googleAppsScriptUrl}?action=getSettings`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });

      if (!response.ok) throw new Error('Network response not ok');
      const data = await response.json();
      
      if (data && data.success) {
        apiCache[cacheKey] = data.settings;
        return data.settings;
      }
      return {};
    } catch (err) {
      console.warn('API Client fetchSettings failed, using config fallbacks:', err);
      return {};
    }
  }

  // Fetch dynamic notices
  public static async fetchNotice(): Promise<DynamicNotice | null> {
    if (this.isPlaceholderUrl()) {
      return null;
    }

    const cacheKey = 'site-notice';
    if (apiCache[cacheKey]) {
      return apiCache[cacheKey];
    }

    try {
      const response = await fetch(`${stenoConfig.apiUrls.googleAppsScriptUrl}?action=getNotice`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });

      if (!response.ok) throw new Error('Notice fetch failed');
      const data = await response.json();
      
      if (data && data.success) {
        apiCache[cacheKey] = data.notice;
        return data.notice;
      }
      return null;
    } catch (err) {
      console.warn('Notice API failed, using static default:', err);
      return null;
    }
  }

  // Fetch specific transcription script text dynamically
  public static async fetchTranscript(dictation: DictationId): Promise<DynamicDictation | null> {
    if (this.isPlaceholderUrl()) {
      return null;
    }

    const cacheKey = `transcript-${dictation.book}-${dictation.volumeOrMonth}-${dictation.grade}-${dictation.dictationNumber}`;
    if (apiCache[cacheKey]) {
      return apiCache[cacheKey];
    }

    try {
      const queryParams = new URLSearchParams({
        action: 'getTranscript',
        book: dictation.book,
        volumeOrMonth: dictation.volumeOrMonth,
        grade: dictation.grade,
        dictationNumber: String(dictation.dictationNumber),
      });

      const response = await fetch(`${stenoConfig.apiUrls.googleAppsScriptUrl}?${queryParams.toString()}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });

      if (!response.ok) throw new Error('Transcript fetch failure');
      const data = await response.json();

      if (data && data.success && data.dictation) {
        if (data.dictation.transcript && data.dictation.transcript.trim()) {
          apiCache[cacheKey] = data.dictation;
          return data.dictation;
        }
      }
      return null;
    } catch (err) {
      console.warn('Transcript API failed, returning null:', err);
      return null;
    }
  }
}
