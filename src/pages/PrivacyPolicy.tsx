/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Eye, Database, Lock } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-6" id="privacy-policy-page">
      <div className="space-y-3">
        <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-400">
          Last Updated: June 2026
        </p>
      </div>

      <div className="prose prose-invert prose-slate max-w-none text-slate-300 space-y-6 text-sm leading-relaxed">
        <p>
          At <strong>Free Steno Practice</strong>, accessible from our web platform, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Free Steno Practice and how we use it.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 not-prose">
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/10 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
              <Eye className="h-4 w-4" />
              <span>No Login Required</span>
            </div>
            <p className="text-xs text-slate-400">
              We do not require you to create an account or provide any personal identification information to access our core practice rooms.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/10 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
              <Database className="h-4 w-4" />
              <span>Local Storage Practice</span>
            </div>
            <p className="text-xs text-slate-400">
              Your shorthand typing drafts, transcription progress, and evaluation histories are stored locally in your browser cache and never sent to our servers.
            </p>
          </div>
        </div>

        <h2 className="text-lg font-bold text-slate-100 font-display pt-4 border-b border-slate-800 pb-2">
          1. Log Files
        </h2>
        <p>
          Free Steno Practice follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
        </p>

        <h2 className="text-lg font-bold text-slate-100 font-display pt-4 border-b border-slate-800 pb-2">
          2. Cookies and Web Beacons
        </h2>
        <p>
          Like any other website, Free Steno Practice uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
        </p>

        <h2 className="text-lg font-bold text-slate-100 font-display pt-4 border-b border-slate-800 pb-2">
          3. Google DoubleClick DART Cookie
        </h2>
        <p>
          Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">https://policies.google.com/technologies/ads</a>
        </p>

        <h2 className="text-lg font-bold text-slate-100 font-display pt-4 border-b border-slate-800 pb-2">
          4. Our Advertising Partners
        </h2>
        <p>
          Some of advertisers on our site may use cookies and web beacons. Our advertising partners include Google AdSense. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we link to their Privacy Policies.
        </p>

        <h2 className="text-lg font-bold text-slate-100 font-display pt-4 border-b border-slate-800 pb-2">
          5. Third Party Privacy Policies
        </h2>
        <p>
          Free Steno Practice's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
        </p>
        <p>
          You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
        </p>

        <h2 className="text-lg font-bold text-slate-100 font-display pt-4 border-b border-slate-800 pb-2">
          6. Children's Information
        </h2>
        <p>
          Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
        </p>
        <p>
          Free Steno Practice does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
        </p>

        <h2 className="text-lg font-bold text-slate-100 font-display pt-4 border-b border-slate-800 pb-2">
          7. Online Privacy Policy Only
        </h2>
        <p>
          This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Free Steno Practice. This policy is not applicable to any information collected offline or via channels other than this website.
        </p>

        <h2 className="text-lg font-bold text-slate-100 font-display pt-4 border-b border-slate-800 pb-2">
          8. Consent
        </h2>
        <p>
          By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
        </p>
      </div>
    </div>
  );
}
