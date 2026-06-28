/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Gavel, AlertCircle, FileText } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-6" id="terms-of-service-page">
      <div className="space-y-3">
        <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-400">
          Last Updated: June 2026
        </p>
      </div>

      <div className="prose prose-invert prose-slate max-w-none text-slate-300 space-y-6 text-sm leading-relaxed">
        <p>
          Welcome to <strong>Free Steno Practice</strong>. These terms and conditions outline the rules and regulations for the use of Free Steno Practice's Website.
        </p>
        <p>
          By accessing this website we assume you accept these terms and conditions. Do not continue to use Free Steno Practice if you do not agree to take all of the terms and conditions stated on this page.
        </p>

        <h2 className="text-lg font-bold text-slate-100 font-display pt-4 border-b border-slate-800 pb-2">
          1. Terminology
        </h2>
        <p>
          The following terminology applies to these Terms of Service, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves.
        </p>

        <h2 className="text-lg font-bold text-slate-100 font-display pt-4 border-b border-slate-800 pb-2">
          2. Intellectual Property Rights
        </h2>
        <p>
          Unless otherwise stated, Free Steno Practice and/or its licensors own the intellectual property rights for all material on Free Steno Practice. All intellectual property rights are reserved. You may access this from Free Steno Practice for your own personal use subjected to restrictions set in these terms and conditions.
        </p>
        <p>
          You must not:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Republish material from Free Steno Practice</li>
          <li>Sell, rent or sub-license material from Free Steno Practice</li>
          <li>Reproduce, duplicate or copy material from Free Steno Practice</li>
          <li>Redistribute content from Free Steno Practice</li>
        </ul>

        <h2 className="text-lg font-bold text-slate-100 font-display pt-4 border-b border-slate-800 pb-2">
          3. Shorthand Practice Materials
        </h2>
        <p>
          The transcription passages provided (including Kailash Chandra volumes and Progressive Magazine passages) are purely for stenography practice, shorthand dictation speed-building, and typing analysis. This site is an educational, self-guided tool and makes no claim to official ownership of specific copyrighted publications.
        </p>

        <h2 className="text-lg font-bold text-slate-100 font-display pt-4 border-b border-slate-800 pb-2">
          4. Hyperlinking to our Content
        </h2>
        <p>
          The following organizations may link to our Website without prior written approval:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Government agencies;</li>
          <li>Search engines;</li>
          <li>News organizations;</li>
          <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses.</li>
        </ul>

        <h2 className="text-lg font-bold text-slate-100 font-display pt-4 border-b border-slate-800 pb-2">
          5. Content Liability
        </h2>
        <p>
          We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
        </p>

        <h2 className="text-lg font-bold text-slate-100 font-display pt-4 border-b border-slate-800 pb-2">
          6. Reservation of Rights
        </h2>
        <p>
          We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
        </p>

        <h2 className="text-lg font-bold text-slate-100 font-display pt-4 border-b border-slate-800 pb-2">
          7. Disclaimer of Liability
        </h2>
        <p>
          To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>limit or exclude our or your liability for death or personal injury;</li>
          <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
          <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
          <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
        </ul>
        <p>
          The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.
        </p>
        <p>
          As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
        </p>
      </div>
    </div>
  );
}
