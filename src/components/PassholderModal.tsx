import React, { useState } from 'react';

interface PassholderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PassholderModal: React.FC<PassholderModalProps> = ({ isOpen, onClose }) => {
  const [stampActive, setStampActive] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1c1a]/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#fcf9f5] border-2 border-[#1c1c1a] shadow-[6px_6px_0px_0px_#1c1c1a] p-6 flex flex-col gap-4">
        {/* Top Ledger Strip */}
        <div className="flex items-center justify-between pb-2 border-b border-[#dec0b4]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#456553]"></span>
            <span className="font-label-mono-sm text-label-mono-sm uppercase text-[#1c1c1a] font-bold tracking-widest">
              OFFICIAL PASSHOLDER CARD
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#574239] hover:text-[#1c1c1a]"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Passholder Ticket Identity */}
        <div className="bg-[#f0edea] p-4 border border-[#dec0b4] flex flex-col gap-3 relative">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-label-mono-sm text-[10px] text-[#574239] uppercase tracking-widest">
                POSTAL ID: 2025-ORMA-PASS
              </span>
              <h3 className="font-headline-sm text-headline-sm text-[#1c1c1a] font-bold">
                M. De Sica (Verified Reader)
              </h3>
              <p className="font-body-sm text-body-sm text-[#574239]">
                Subscribed Route: Milano Centrale ⇄ Zürich HB
              </p>
            </div>
            {/* Rubber Stamp */}
            <div
              onClick={() => setStampActive(!stampActive)}
              className="w-16 h-16 rounded-full border-2 border-[#a83029] text-[#a83029] flex flex-col items-center justify-center text-center p-1 -rotate-6 cursor-pointer select-none hover:scale-105 transition-transform"
            >
              <span className="font-label-mono-sm text-[8px] font-bold leading-none">VERONA</span>
              <span className="font-label-mono-sm text-[10px] font-bold">SOLVED</span>
              <span className="font-label-mono-sm text-[7px] leading-none">1924 PRESS</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-label-mono-sm uppercase pt-2 border-t border-[#dec0b4]/60">
            <div>
              <span className="text-[#574239]">SOLITARY MILES:</span>
              <span className="font-bold text-[#1c1c1a] ml-1">1,420 KM</span>
            </div>
            <div>
              <span className="text-[#574239]">CIPHERS CRACKED:</span>
              <span className="font-bold text-[#9e3d00] ml-1">37 SOLVES</span>
            </div>
          </div>
        </div>

        <p className="font-body-sm text-body-sm text-[#574239]">
          Your pass guarantees priority reservation on newly inked limited editions and entry to secret salon cryptograms.
        </p>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="w-full bg-[#1c1c1a] hover:bg-[#9e3d00] text-white font-label-mono-sm text-label-mono-sm uppercase py-2 font-bold tracking-wider transition-colors shadow-sm cursor-pointer"
          >
            Close Passholder Card
          </button>
        </div>
      </div>
    </div>
  );
};
