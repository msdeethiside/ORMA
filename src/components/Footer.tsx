import React, { useState } from 'react';
import { ScreenId } from '../types';
import { EditableText } from './admin/EditableText';
import { useAdmin } from '../context/AdminContext';

interface FooterProps {
  onNavigate: (screen: ScreenId) => void;
  onScrollToMakersNote?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { openAuthModal, isAdmin } = useAdmin();
  const [email, setEmail] = useState('');
  const [enrolled, setEnrolled] = useState(false);

  const handleEnrol = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setEnrolled(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="w-full bg-[#f6f3ef] shadow-[0_-1px_6px_rgba(0,0,0,0.03)] mt-16 sm:mt-24 border-t border-[#dec0b4]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 pr-0 lg:pr-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-headline-sm text-headline-sm uppercase tracking-tight text-[#1c1c1a] font-bold">
                ORMA
              </span>
              <span className="font-label-mono-sm text-label-mono-sm uppercase text-[#574239] bg-[#f0edea] px-2 py-0.5 border border-[#dec0b4]/50">
                EST. 2024
              </span>
            </div>
            <EditableText
              id="footer_editorial_quote"
              as="p"
              defaultText="Born in the stillness of long train journeys. Physical puzzle compendiums and printed zines made for transit, cafés, and unhurried hours."
              className="font-body-lg text-body-lg text-[#574239] max-w-md mb-4 italic leading-relaxed block"
            />
            <div className="font-label-mono-sm text-label-mono-sm uppercase tracking-wider text-[#574239] flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#456553]">verified</span>
              <span>AUTHENTIC LETTERPRESS • VERONA PRESSWORK</span>
            </div>
          </div>


          {/* Compendiums */}
          <div>
            <h4 className="font-label-mono-md text-label-mono-md uppercase tracking-wider text-[#1c1c1a] font-bold mb-4">
              Compendiums
            </h4>
            <ul className="space-y-2 font-body-sm text-body-sm text-[#574239]">
              <li>
                <button
                  onClick={() => onNavigate('featured-solve-caesar-cipher')}
                  className="hover:text-[#9e3d00] transition-colors text-left"
                >
                  Caesar Ciphers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('editions-and-archive')}
                  className="hover:text-[#9e3d00] transition-colors text-left"
                >
                  Railway Word Searches
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('editions-and-archive')}
                  className="hover:text-[#9e3d00] transition-colors text-left"
                >
                  Crosswords & Enigmas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('editions-and-archive')}
                  className="hover:text-[#9e3d00] transition-colors text-left"
                >
                  Zine Series (Vol. I–XIV)
                </button>
              </li>
            </ul>
          </div>

          {/* Studio & Stockists */}
          <div>
            <h4 className="font-label-mono-md text-label-mono-md uppercase tracking-wider text-[#1c1c1a] font-bold mb-4">
              Studio & Stockists
            </h4>
            <ul className="space-y-2 font-body-sm text-body-sm text-[#574239]">
              <li>
                <button
                  onClick={() => onNavigate('makers-note')}
                  className="hover:text-[#9e3d00] transition-colors text-left font-medium"
                >
                  Maker’s Note & Ethos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('editions-and-archive')}
                  className="hover:text-[#9e3d00] transition-colors text-left"
                >
                  Station Bookstalls
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('editions-and-archive')}
                  className="hover:text-[#9e3d00] transition-colors text-left"
                >
                  Indie Kiosks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dispatch-and-submissions')}
                  className="hover:text-[#9e3d00] transition-colors text-left"
                >
                  Retail Inquiries
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dispatch-and-submissions')}
                  className="hover:text-[#9e3d00] transition-colors text-left"
                >
                  Printing Heritage
                </button>
              </li>
            </ul>
          </div>

          {/* Dispatch Newsletter Subscription */}
          <div className="bg-[#f0edea] p-4 shadow-sm border border-[#dec0b4]/50">
            <h4 className="font-label-mono-md text-label-mono-md uppercase tracking-wider text-[#1c1c1a] font-bold mb-1">
              Dispatch Dispatch
            </h4>
            <p className="font-body-sm text-body-sm text-[#574239] mb-3">
              Postal telegraph slip • Monthly dispatch drop alerts.
            </p>
            {enrolled ? (
              <div className="bg-[#c7ebd4] text-[#002113] p-2 text-center font-label-mono-sm text-label-mono-sm uppercase font-bold tracking-wider animate-fadeIn">
                ✓ Stamped & Subscribed
              </div>
            ) : (
              <form onSubmit={handleEnrol} className="flex flex-col gap-1.5">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#fcf9f5] px-3 py-1.5 text-[#1c1c1a] font-label-mono-sm text-label-mono-sm placeholder:text-[#574239]/60 focus:outline-none border border-[#dec0b4]"
                  placeholder="TELEGRAPH RECIPIENT..."
                  type="email"
                  required
                />
                <button
                  className="w-full bg-[#9e3d00] hover:bg-[#c15316] text-[#ffffff] font-label-mono-sm text-label-mono-sm uppercase py-1.5 px-3 transition-colors tracking-wider font-bold cursor-pointer"
                  type="submit"
                >
                  Enrol Dispatch
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Ledger Colophon */}
        <div className="pt-6 border-t border-[#dec0b4]/40 flex flex-col md:flex-row items-center justify-between gap-2 text-[#574239] font-label-mono-sm text-label-mono-sm uppercase tracking-wider text-center md:text-left">
          <EditableText
            id="footer_colophon"
            defaultText="ORMA EDITIONS © 2025 • EDITED BY MS. DEE • OFFLINE BY INTENTION"
          />
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span>VERONA • ZÜRICH • KYOTO</span>
            <span>PRINTED IN RAW COTTON-RAG</span>
            <button
              type="button"
              onClick={openAuthModal}
              className={`inline-flex items-center gap-1 px-2 py-0.5 border text-[10px] font-mono tracking-wider transition-all cursor-pointer ${
                isAdmin
                  ? 'bg-sky-100 text-sky-800 border-sky-400 font-bold'
                  : 'bg-[#ebe8e4] text-[#574239] hover:text-[#9e3d00] border-[#dec0b4]'
              }`}
              title="Visual Admin & Inline Edit Mode (Route: /admin-1994, PIN: 1994)"
            >
              <span className="material-symbols-outlined text-[12px]">
                {isAdmin ? 'lock_open' : 'lock'}
              </span>
              <span>{isAdmin ? 'Admin: Active' : 'Admin: 1994'}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
