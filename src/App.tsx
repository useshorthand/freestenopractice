/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppView, DictationId } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import KailashChandra from './pages/KailashChandra';
import ProgressiveMagazine from './pages/ProgressiveMagazine';
import DictationPage from './pages/DictationPage';
import UnseenDictation from './pages/UnseenDictation';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Disclaimer from './pages/Disclaimer';
import CookiePolicy from './pages/CookiePolicy';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [currentDictation, setCurrentDictation] = useState<DictationId | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // Handle clicking a dictation from a list
  const handleSelectDictation = (dictation: DictationId) => {
    setCurrentDictation(dictation);
    setCurrentView('dictation');
  };

  // Callback to return to correct book list
  const handleBackToLibrary = () => {
    if (currentDictation) {
      setCurrentView(currentDictation.book);
    } else {
      setCurrentView('home');
    }
  };

  // Handle search query updates from the header
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Automatically switch to library list if user starts typing a query
    if (query.trim()) {
      if (currentView !== 'kailash-chandra' && currentView !== 'progressive-magazine') {
        setCurrentView('kailash-chandra');
      }
    }
  };

  // Render the currently active page/view
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home setCurrentView={setCurrentView} />;
      case 'kailash-chandra':
        return (
          <KailashChandra 
            onSelectDictation={handleSelectDictation} 
            searchFilter={searchQuery}
          />
        );
      case 'progressive-magazine':
        return (
          <ProgressiveMagazine 
            onSelectDictation={handleSelectDictation} 
            searchFilter={searchQuery}
          />
        );
      case 'dictation':
        if (!currentDictation) {
          return <Home setCurrentView={setCurrentView} />;
        }
        return (
          <DictationPage 
            dictation={currentDictation} 
            onBack={handleBackToLibrary} 
          />
        );
      case 'unseen-dictation':
        return <UnseenDictation />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'privacy-policy':
        return <PrivacyPolicy />;
      case 'terms-of-service':
        return <TermsOfService />;
      case 'disclaimer':
        return <Disclaimer />;
      case 'cookie-policy':
        return <CookiePolicy />;
      default:
        return <Home setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 font-sans selection:bg-emerald-500/30 selection:text-white" id="app-root-container">
      {/* Dynamic Header */}
      <Header 
        currentView={currentView} 
        setCurrentView={(view) => {
          setCurrentView(view);
          // Clear query when switching pages
          setSearchQuery('');
        }} 
        onSearch={handleSearch}
      />

      {/* Main Content Body */}
      <main className="flex-grow mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12" id="app-main-content">
        {renderView()}
      </main>

      {/* Dynamic Footer */}
      <Footer setCurrentView={(view) => {
        setCurrentView(view);
        setSearchQuery('');
      }} />
    </div>
  );
}
