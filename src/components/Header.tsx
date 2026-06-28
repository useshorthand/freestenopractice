/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Search, BookOpen, AlertCircle, Calendar, Sparkles } from 'lucide-react';
import { AppView } from '../types';
import { stenoConfig } from '../config/stenoConfig';

interface HeaderProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  onSearch: (query: string) => void;
}

export default function Header({ currentView, setCurrentView, onSearch }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  interface NavItem {
    id: AppView;
    label: string;
    isBadge?: boolean;
    badgeText?: string;
  }

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'kailash-chandra', label: 'Kailash Chandra' },
    { id: 'progressive-magazine', label: 'Progressive Magazine' },
    { id: 'unseen-dictation', label: 'Unseen Dictation', isBadge: true, badgeText: 'Soon' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Title */}
        <div 
          onClick={() => setCurrentView('home')} 
          className="flex cursor-pointer items-center space-x-2 text-white"
          id="nav-logo"
        >
          <BookOpen className="h-6 w-6 text-emerald-500" />
          <span className="font-display text-xl font-bold tracking-tight">
            {stenoConfig.websiteName}
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:items-center lg:space-x-1" id="desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`relative flex items-center px-4 py-2 text-sm font-medium transition-colors duration-150 rounded-lg ${
                currentView === item.id
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
              id={`nav-item-${item.id}`}
            >
              <span>{item.label}</span>
              {item.isBadge && (
                <span className="ml-1.5 flex h-4 items-center rounded-full bg-emerald-500/10 px-1.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                  {item.badgeText}
                </span>
              )}
              {currentView === item.id && (
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-500 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Right Actions: Search Bar (UI only as per instructions) */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search transcriptions..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onSearch(e.target.value);
              }}
              className="w-60 rounded-lg border border-slate-800 bg-slate-900 py-1.5 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
            <Search className="absolute left-3 top-2 h-4 w-4 text-slate-500" />
          </form>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden z-50">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsMobileMenuOpen((prev) => !prev);
            }}
            className="inline-flex items-center justify-center rounded-md p-3 text-slate-400 hover:bg-slate-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            id="mobile-menu-toggle"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950 px-2 pt-2 pb-4 space-y-1" id="mobile-nav">
          {/* Mobile Search */}
          <div className="px-3 py-2">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search transcriptions..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  onSearch(e.target.value);
                }}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            </form>
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                currentView === item.id
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <span>{item.label}</span>
              {item.isBadge && (
                <span className="rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                  {item.badgeText}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
