import React, { useState } from 'react';
import { CatalogEdition } from '../types';

interface SpecimenModalProps {
  isOpen: boolean;
  onClose: () => void;
  edition: CatalogEdition | null;
  onSelectEdition: (edition: CatalogEdition) => void;
}

export const SpecimenModal: React.FC<SpecimenModalProps> = ({
  isOpen,
  onClose,
  edition,
  onSelectEdition,
}) => {
  const [shift, setShift] = useState(4);
  const [showSolution, setShowSolution] = useState(false);

  if (!isOpen) return null;

  const originalCipher =
    'WLSMR IR XLI HIGOMRK EX QMHRMKLX • XLI XVEMR QEZIVMGO LEW FEVVIH XLI HSSV';
  const decodedExcerpt =
    'SHIPS AT THE DOCKING AT MIDNIGHT • THE TRAIN MAVERICK HAS BARRED THE DOOR';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1c1a]/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#ffffff] w-full max-w-lg shadow-[6px_6px_0px_0px_#1c1c1a] border-2 border-[#1c1c1a] p-6 flex flex-col gap-4 transform transition-transform">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#dec0b4]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#9e3d00] text-[20px]">draft</span>
            <span className="font-label-mono-sm text-label-mono-sm uppercase text-[#9e3d00] font-bold tracking-widest">
              SPECIMEN PREVIEW
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Preview"
            className="text-[#574239] hover:text-[#1c1c1a] p-1"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <div>
          <h3 className="font-headline-md text-headline-md text-[#1c1c1a] font-bold">
            {edition ? edition.title : 'Volume Specimen'}
          </h3>
          <p className="font-label-mono-sm text-label-mono-sm text-[#574239] uppercase mt-1">
            VERONA PRESS • ARCHIVAL PRINT PROOF
          </p>
        </div>

        {/* Preview Puzzle Snippet */}
        <div className="bg-[#f6f3ef] p-4 font-label-mono-sm text-label-mono-sm text-[#1c1c1a] flex flex-col gap-3 border border-[#dec0b4]">
          <div className="flex justify-between text-[#574239] text-[11px] pb-1 border-b border-[#dec0b4]/60">
            <span>EXCERPT: PUZZLE #14</span>
            <span className="font-bold text-[#9e3d00]">KEY ROTATION: [K = +{shift}]</span>
          </div>

          <div className="p-3 bg-white text-center tracking-widest font-mono text-[#9e3d00] font-bold text-[14px] leading-relaxed border border-[#dec0b4]">
            {showSolution ? decodedExcerpt : originalCipher}
          </div>

          <p className="font-body-sm text-body-sm text-[#574239] italic text-center">
            {showSolution
              ? '✓ Deciphered using Key Rotation +4.'
              : 'Decipher the passenger telegraph wire before arrival at the border switch.'}
          </p>

          <div className="flex justify-center gap-2 pt-1">
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="text-[11px] font-label-mono-sm uppercase text-[#456553] hover:underline font-bold"
            >
              {showSolution ? 'Show Original Encrypted Wire' : 'Test Decipher Alignment [Key +4]'}
            </button>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#f0edea] text-[#1c1c1a] font-label-mono-sm text-label-mono-sm uppercase hover:bg-[#ebe8e4] transition-colors border border-[#dec0b4] cursor-pointer"
          >
            Return to Shelf
          </button>
          <button
            onClick={() => {
              if (edition) onSelectEdition(edition);
              onClose();
            }}
            className="px-4 py-2 bg-[#9e3d00] text-white font-label-mono-sm text-label-mono-sm uppercase font-bold tracking-wider hover:bg-[#c15316] transition-colors shadow-sm cursor-pointer"
          >
            Pack Edition Copy
          </button>
        </div>
      </div>
    </div>
  );
};
