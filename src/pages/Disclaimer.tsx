/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AlertOctagon, HelpCircle, CheckSquare } from 'lucide-react';

export default function Disclaimer() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-6" id="disclaimer-page">
      <div className="space-y-3">
        <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Disclaimer
        </h1>
        <p className="text-sm text-slate-400">
          Last Updated: June 2026
        </p>
      </div>

      <div className="prose prose-invert prose-slate max-w-none text-slate-300 space-y-6 text-sm leading-relaxed">
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 flex items-start space-x-4 not-prose">
          <AlertOctagon className="h-6 w-6 text-rose-500 flex-shrink-0 mt-1" />
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-rose-400">
              Not Government Affiliated
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Free Steno Practice</strong> is an independent, community-driven online learning portal. This website is not affiliated with, authorized, maintained, sponsored, endorsed, or in any way officially connected with the <strong>Staff Selection Commission (SSC)</strong>, the Government of India, or any of their regional offices or departments.
            </p>
          </div>
        </div>

        <h2 className="text-lg font-bold text-slate-100 font-display pt-4 border-b border-slate-800 pb-2">
          1. Information Accuracy
        </h2>
        <p>
          The materials on Free Steno Practice's website are provided on an 'as is' basis. Free Steno Practice makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>
        <p>
          Further, Free Steno Practice does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
        </p>

        <h2 className="text-lg font-bold text-slate-100 font-display pt-4 border-b border-slate-800 pb-2">
          2. Transcription and Evaluation Algorithms
        </h2>
        <p>
          Our evaluation engine utilizes a minimum edit-distance alignment algorithm designed to mimic the official SSC Grade C & D transcription checking guidelines. While we strive to match the criteria for "Full Mistakes" and "Half Mistakes" as closely as possible to the official rules published by the Commission, please note that our evaluation results are for practice reference purposes only.
        </p>
        <p>
          Actual SSC exam evaluations are carried out under official, internal parameters. Achieving a qualifying score (e.g., &lt;5% or &lt;7% error rates) on this platform does not guarantee qualification in any actual examination.
        </p>

        <h2 className="text-lg font-bold text-slate-100 font-display pt-4 border-b border-slate-800 pb-2">
          3. Limitations of Liability
        </h2>
        <p>
          In no event shall Free Steno Practice or its contributors be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Free Steno Practice's website, even if Free Steno Practice or an authorized representative has been notified orally or in writing of the possibility of such damage.
        </p>

        <h2 className="text-lg font-bold text-slate-100 font-display pt-4 border-b border-slate-800 pb-2">
          4. Revisions and Errata
        </h2>
        <p>
          The materials appearing on Free Steno Practice's website could include technical, typographical, or photographic errors. Free Steno Practice does not warrant that any of the materials on its website are accurate, complete, or current. We may make changes to the materials contained on its website at any time without notice. However, we do not make any commitment to update the materials.
        </p>

        <h2 className="text-lg font-bold text-slate-100 font-display pt-4 border-b border-slate-800 pb-2">
          5. External Links
        </h2>
        <p>
          Free Steno Practice has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Free Steno Practice of the site. Use of any such linked website is at the user's own risk.
        </p>
      </div>
    </div>
  );
}
