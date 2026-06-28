/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, MessageSquare, Check, Send, AlertCircle } from 'lucide-react';
import { stenoConfig } from '../config/stenoConfig';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API action
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="space-y-12 py-10 max-w-5xl mx-auto px-4" id="contact-view">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-white">
          Contact Support
        </h1>
        <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Have feedback, queries, or spotted a spelling correction in our transcription books? Drop us a line and let us know!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Contact Form */}
        <div className="lg:col-span-7 rounded-3xl border border-slate-800 bg-slate-900/10 p-6 sm:p-8 space-y-6">
          <h2 className="font-display text-xl font-bold text-white tracking-tight flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-emerald-500" />
            <span>Send a Message</span>
          </h2>

          {success ? (
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center space-y-3">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-semibold text-white">Message Sent Successfully!</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Thank you for reaching out to Free Steno Practice. Our team will review your transcription corrections or inquiries and get back to you shortly.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="inline-flex rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Candidate Name"
                    className="w-full rounded-lg border border-slate-800 bg-slate-900/40 py-2.5 px-4 text-sm text-slate-200 placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="candidate@example.com"
                    className="w-full rounded-lg border border-slate-800 bg-slate-900/40 py-2.5 px-4 text-sm text-slate-200 placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Volume 3 Transcription Correction"
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/40 py-2.5 px-4 text-sm text-slate-200 placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Message Content
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your query or feedback in detail..."
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/40 py-2.5 px-4 text-sm text-slate-200 placeholder-slate-600 focus:border-emerald-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center space-x-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-950/20 disabled:bg-slate-800 disabled:text-slate-600"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Col: Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 sm:p-8 space-y-5">
            <h3 className="font-display text-lg font-bold text-white tracking-tight">
              Get in Touch Directly
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3.5">
                <div className="flex-shrink-0 p-2 rounded-lg bg-slate-800 text-emerald-400 border border-slate-700/50">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-tight">Email Support Channel</h4>
                  <p className="text-sm font-semibold text-white mt-0.5">useshorthand@gmail.com</p>
                  <p className="text-[10px] text-slate-500 leading-normal mt-1">We respond to support questions, feature requests, and spelling corrections within 24-48 working hours.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-500/15 bg-blue-500/5 p-5 flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>Spelling corrections notice:</strong> To flag a typo, please include the specific Book name (e.g. Kailash Chandra Volume 4), Grade (C or D), Transcription number, and the exact word or paragraph sequence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
