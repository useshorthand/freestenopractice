/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function CopyrightNotice() {
  return (
    <div 
      className="mt-12 pt-6 border-t border-slate-900 text-[11px] leading-relaxed text-slate-500 space-y-3 max-w-4xl mx-auto" 
      id="steno-copyright-notice"
    >
      <div className="flex items-center space-x-2 text-slate-400 font-bold uppercase tracking-wider">
        <ShieldAlert className="h-4 w-4 text-emerald-500/80" />
        <span>Copyright Notice</span>
      </div>
      
      <p>
        References to Kailash Chandra and Progressive Magazine are provided solely for educational identification and stenography practice purposes.
      </p>
      
      <p>
        Free Steno Practice is an independent educational platform and does not claim ownership, copyright, publishing rights, trademark rights, or any other intellectual property rights in relation to Kailash Chandra publications or Progressive Magazine publications.
      </p>
      
      <p>
        The website does not reproduce, sell, license, or distribute these publications as its own work. Any references to such publications are made exclusively to help users organize and evaluate their own shorthand practice.
      </p>
      
      <p>
        All original content created specifically for the Unseen Dictation section, including original audio recordings, transcripts, exercises, and other original learning materials, is the intellectual property of Free Steno Practice unless otherwise stated.
      </p>
      
      <p>
        If you are the copyright owner or an authorized representative of any material referenced on this website and believe that any content infringes your rights, you may contact us with sufficient details. Verified requests will be reviewed promptly and appropriate action will be taken where necessary.
      </p>
    </div>
  );
}
