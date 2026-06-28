/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Eye, Shield, FileQuestion } from 'lucide-react';

export default function CookiePolicy() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-6" id="cookie-policy-page">
      <div className="space-y-3">
        <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Cookie Policy
        </h1>
        <p className="text-sm text-slate-400">
          Last Updated: June 2026
        </p>
      </div>

      <div className="prose prose-invert prose-slate max-w-none text-slate-300 space-y-6 text-sm leading-relaxed">
        <p>
          This is the Cookie Policy for <strong>Free Steno Practice</strong>, accessible from our main website.
        </p>

        <h2 className="text-lg font-bold text-slate-100 font-display pt-4 border-b border-slate-800 pb-2">
          1. What Are Cookies
        </h2>
        <p>
          As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it, and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites' functionality.
        </p>

        <h2 className="text-lg font-bold text-slate-100 font-display pt-4 border-b border-slate-800 pb-2">
          2. How We Use Cookies & Local Storage
        </h2>
        <p>
          We use cookies and browser <strong>local storage</strong> for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not, in case they are used to provide a service that you use.
        </p>

        <div className="border border-slate-800 rounded-2xl bg-slate-900/10 p-5 space-y-3 my-6 not-prose">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Primary Local Storage Actions</h4>
          <ul className="text-xs text-slate-400 space-y-2 leading-relaxed pl-4 list-disc">
            <li>
              <strong className="text-slate-200">Transcription Autosave (Draft Save):</strong> Whenever you type in the editor, your text is preserved locally so that if you accidentally close the tab, refresh the page, or lose connection, your practice is not lost.
            </li>
            <li>
              <strong className="text-slate-200">System Preferences:</strong> Remembers your active filter preferences and search terms across page switches.
            </li>
          </ul>
        </div>

        <h2 className="text-lg font-bold text-slate-100 font-display pt-4 border-b border-slate-800 pb-2">
          3. Third-Party Cookies
        </h2>
        <p>
          In some special cases, we also use cookies provided by trusted third parties. The following section details which third-party cookies you might encounter through this site.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            This site uses <strong>Google Analytics</strong> which is one of the most widespread and trusted analytics solutions on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.
          </li>
          <li>
            The <strong>Google AdSense</strong> service uses a DoubleClick cookie to serve more relevant ads across the web and limit the number of times that a given ad is shown to you.
          </li>
        </ul>

        <h2 className="text-lg font-bold text-slate-100 font-display pt-4 border-b border-slate-800 pb-2">
          4. Disabling Cookies
        </h2>
        <p>
          You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site. Therefore it is recommended that you do not disable cookies.
        </p>
      </div>
    </div>
  );
}
