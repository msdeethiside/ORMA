import React, { useState } from 'react';
import { ScreenId } from '../types';
import { EditableText } from './admin/EditableText';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  cartCount: number;
  onOpenBag: () => void;
  onOpenSearch: () => void;
  onOpenPassholder: () => void;
  onScrollToMakersNote: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  cartCount,
  onOpenBag,
  onOpenSearch,
  onOpenPassholder,
  onScrollToMakersNote,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fcf9f5]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Top Ledger Strip */}
      <div className="w-full bg-[#ebe8e4] px-4 sm:px-6 py-1">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[#574239] font-label-mono-sm text-[10px] sm:text-xs">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="inline-block w-2 h-2 rounded-full bg-[#9e3d00] animate-pulse shrink-0"></span>
            <span className="uppercase tracking-wider truncate">
              <EditableText
                id="header_top_ticker"
                defaultText="PLATFORM 04  • “OBJECTS FOR THE QUIET IN-BETWEEN” • EDITIONS PRINTED ON FSC RECYCLED NEWSPRINT"
              />
            </span>
          </div>
          <div
            onClick={onOpenPassholder}
            className="hidden sm:flex items-center gap-1.5 uppercase tracking-wider text-[#1c1c1a] hover:text-[#9e3d00] transition-colors cursor-pointer shrink-0 ml-4 font-bold"
          >
            <span className="material-symbols-outlined text-[14px]">public</span>
            <span>SHIPS TO: INT’L / TRACKED</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <img
            alt="ORMA Editions Studio Logo"
            className="h-8 w-auto object-contain cursor-pointer"
            onClick={() => onNavigate('station-kiosk')}
            src="https://lh3.googleusercontent.com/aida/AEtjO1X2yy6m7bRvao8vif3xf3qPkLt1328MX2evb2WiiN4p7cWwHVeRHIp6QP32MY9UFnQy4nvGhSnoX78wap6Xxpbqa4dlDCK0PDIoCIpAZGyrmmBWKO1y-t2BpOrvvAxKjyKljI4DLDVNCwfnCETcRI-lbRucI7jNynOGrCrlBz7y5ZnorXI9ii_ABp2scUKOLI4BeJVqNnTpPgnyvt3FTwnE_KHUp5diICbG9Z02fm-1GAvYQZ3715LY8-JC"
          />
          <button
            onClick={() => onNavigate('station-kiosk')}
            className="flex flex-col text-left focus:outline-none"
          >
            <EditableText
              id="header_brand_name"
              defaultText="ORMA"
              className="font-headline-sm text-headline-sm uppercase tracking-tight text-[#1c1c1a] font-bold leading-none"
            />
            <EditableText
              id="header_brand_sub"
              defaultText="EDITIONS • MILANO"
              className="font-label-mono-sm text-label-mono-sm uppercase tracking-widest text-[#574239]"
            />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => onNavigate('station-kiosk')}
            className={`font-label-mono-md text-label-mono-md uppercase tracking-wider px-3 py-1.5 transition-colors cursor-pointer ${
              currentScreen === 'station-kiosk'
                ? 'bg-[#c15316] text-[#fffbff] font-bold shadow-sm'
                : 'text-[#574239] hover:text-[#1c1c1a]'
            }`}
          >
            Station Kiosk
          </button>

          <button
            onClick={() => onNavigate('editions-and-archive')}
            className={`font-label-mono-md text-label-mono-md uppercase tracking-wider px-3 py-1.5 transition-colors cursor-pointer ${
              currentScreen === 'editions-and-archive'
                ? 'bg-[#c15316] text-[#fffbff] font-bold shadow-sm'
                : 'text-[#574239] hover:text-[#1c1c1a]'
            }`}
          >
            Editions & Archive
          </button>

          <button
            onClick={() => onNavigate('featured-solve-caesar-cipher')}
            className={`font-label-mono-md text-label-mono-md uppercase tracking-wider px-3 py-1.5 transition-colors cursor-pointer ${
              currentScreen === 'featured-solve-caesar-cipher'
                ? 'bg-[#c15316] text-[#fffbff] font-bold shadow-sm'
                : 'text-[#574239] hover:text-[#1c1c1a]'
            }`}
          >
            Featured Solve: Caesar Cipher
          </button>

          <button
            onClick={() => onNavigate('dispatch-and-submissions')}
            className={`font-label-mono-md text-label-mono-md uppercase tracking-wider px-3 py-1.5 transition-colors cursor-pointer ${
              currentScreen === 'dispatch-and-submissions'
                ? 'bg-[#c15316] text-[#fffbff] font-bold shadow-sm'
                : 'text-[#574239] hover:text-[#1c1c1a]'
            }`}
          >
            Dispatch & Submissions
          </button>

          <button
            onClick={() => onNavigate('makers-note')}
            className={`font-label-mono-md text-label-mono-md uppercase tracking-wider px-3 py-1.5 transition-colors cursor-pointer ${
              currentScreen === 'makers-note'
                ? 'bg-[#c15316] text-[#fffbff] font-bold shadow-sm'
                : 'text-[#574239] hover:text-[#1c1c1a]'
            }`}
          >
            Maker’s Note
          </button>
        </nav>


        {/* Right Action Icons & Carriage Bag */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            aria-label="Search Archive"
            onClick={onOpenSearch}
            className="w-9 h-9 flex items-center justify-center text-[#574239] hover:text-[#1c1c1a] hover:bg-[#f0edea] transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          {/* Carriage Bag Trigger */}
          <button
            onClick={onOpenBag}
            className="flex items-center gap-2 bg-[#f0edea] px-3 py-2 text-[#1c1c1a] hover:bg-[#ebe8e4] transition-colors cursor-pointer shadow-sm hover:shadow"
            type="button"
          >
            <span className="font-label-mono-md text-label-mono-md uppercase font-bold tracking-wider hidden sm:inline">
              Carriage Bag
            </span>
            <span className="font-label-mono-md text-label-mono-md uppercase font-bold tracking-wider sm:hidden">
              Bag
            </span>
            <span className="bg-[#9e3d00] text-[#ffffff] font-label-mono-sm text-label-mono-sm px-1.5 py-0.5 rounded-full min-w-[20px] text-center font-bold">
              {cartCount}
            </span>
          </button>

          {/* User Account / Station Pass */}
          <button
            onClick={onOpenPassholder}
            aria-label="Postal Station Pass"
            className="w-8 h-8 rounded-full bg-[#9e3d00] flex items-center justify-center shrink-0 text-white hover:bg-[#7c2e00] transition-colors cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center text-[#1c1c1a] hover:bg-[#f0edea] cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fcf9f5] border-t border-[#dec0b4] px-4 py-4 space-y-2 shadow-xl animate-fadeIn">
          <button
            onClick={() => {
              onNavigate('station-kiosk');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left font-label-mono-md text-label-mono-md uppercase tracking-wider px-3 py-2.5 ${
              currentScreen === 'station-kiosk'
                ? 'bg-[#c15316] text-[#fffbff] font-bold'
                : 'text-[#574239] hover:bg-[#f0edea]'
            }`}
          >
            Station Kiosk
          </button>

          <button
            onClick={() => {
              onNavigate('editions-and-archive');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left font-label-mono-md text-label-mono-md uppercase tracking-wider px-3 py-2.5 ${
              currentScreen === 'editions-and-archive'
                ? 'bg-[#c15316] text-[#fffbff] font-bold'
                : 'text-[#574239] hover:bg-[#f0edea]'
            }`}
          >
            Editions & Archive
          </button>

          <button
            onClick={() => {
              onNavigate('featured-solve-caesar-cipher');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left font-label-mono-md text-label-mono-md uppercase tracking-wider px-3 py-2.5 ${
              currentScreen === 'featured-solve-caesar-cipher'
                ? 'bg-[#c15316] text-[#fffbff] font-bold'
                : 'text-[#574239] hover:bg-[#f0edea]'
            }`}
          >
            Featured Solve: Caesar Cipher
          </button>

          <button
            onClick={() => {
              onNavigate('dispatch-and-submissions');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left font-label-mono-md text-label-mono-md uppercase tracking-wider px-3 py-2.5 ${
              currentScreen === 'dispatch-and-submissions'
                ? 'bg-[#c15316] text-[#fffbff] font-bold'
                : 'text-[#574239] hover:bg-[#f0edea]'
            }`}
          >
            Dispatch & Submissions
          </button>

          <button
            onClick={() => {
              onNavigate('makers-note');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left font-label-mono-md text-label-mono-md uppercase tracking-wider px-3 py-2.5 ${
              currentScreen === 'makers-note'
                ? 'bg-[#c15316] text-[#fffbff] font-bold'
                : 'text-[#574239] hover:bg-[#f0edea]'
            }`}
          >
            Maker’s Note
          </button>
        </div>
      )}
    </header>

  );
};
