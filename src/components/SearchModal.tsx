import React, { useState, useMemo } from 'react';
import { CATALOG_EDITIONS, STOCKIST_LOCATIONS } from '../data/editions';
import { ScreenId } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEdition: (id: string) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectEdition,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  const filteredEditions = useMemo(() => {
    if (!query.trim()) return CATALOG_EDITIONS.slice(0, 4);
    const q = query.toLowerCase();
    return CATALOG_EDITIONS.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.volTag.toLowerCase().includes(q) ||
        (e.format && e.format.toLowerCase().includes(q))
    );
  }, [query]);

  const filteredStockists = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return STOCKIST_LOCATIONS.filter(
      (s) =>
        s.city.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#1c1c1a]/70 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-[#fcf9f5] border-2 border-[#1c1c1a] shadow-[6px_6px_0px_0px_#1c1c1a] z-10 overflow-hidden">
        {/* Top search input */}
        <div className="p-4 bg-[#ebe8e4] border-b border-[#1c1c1a] flex items-center gap-3">
          <span className="material-symbols-outlined text-[#9e3d00] text-[24px]">search</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH CIPHERS, VOLUMES, PAPER STOCKS, OR STATIONS..."
            className="flex-1 bg-transparent font-label-mono-md text-sm text-[#1c1c1a] placeholder:text-[#574239]/60 focus:outline-none uppercase tracking-wider"
          />
          <button
            onClick={onClose}
            className="text-xs font-label-mono-sm uppercase text-[#574239] hover:text-[#1c1c1a] px-2 py-1 bg-[#f0edea]"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 flex flex-col gap-4">
          <div>
            <div className="font-label-mono-sm text-[11px] uppercase tracking-widest text-[#574239] font-bold mb-2">
              CATALOGUE VOLUMES & ZINES ({filteredEditions.length})
            </div>
            {filteredEditions.length === 0 ? (
              <p className="font-body-md text-sm text-[#574239] italic">No matching editions found.</p>
            ) : (
              <div className="divide-y divide-[#dec0b4]/40">
                {filteredEditions.map((edition) => (
                  <div
                    key={edition.id}
                    onClick={() => {
                      if (edition.id === 'or-01') {
                        onNavigate('featured-solve-caesar-cipher');
                      } else {
                        onNavigate('editions-and-archive');
                      }
                      onSelectEdition(edition.id);
                      onClose();
                    }}
                    className="py-2.5 px-2 flex items-center justify-between hover:bg-[#f0edea] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-label-mono-sm text-xs font-bold text-[#9e3d00] shrink-0">
                        {edition.volTag}
                      </span>
                      <div className="truncate">
                        <h4 className="font-headline-sm text-sm font-bold text-[#1c1c1a] truncate">
                          {edition.title}
                        </h4>
                        <p className="font-body-sm text-xs text-[#574239] truncate">
                          {edition.description}
                        </p>
                      </div>
                    </div>
                    <span className="font-label-mono-sm text-xs font-bold text-[#1c1c1a] shrink-0 ml-4">
                      ${edition.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {filteredStockists.length > 0 && (
            <div className="pt-2 border-t border-[#dec0b4]">
              <div className="font-label-mono-sm text-[11px] uppercase tracking-widest text-[#456553] font-bold mb-2">
                STATION STOCKISTS ({filteredStockists.length})
              </div>
              <div className="divide-y divide-[#dec0b4]/40">
                {filteredStockists.map((stockist, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      onNavigate('editions-and-archive');
                      onClose();
                    }}
                    className="py-2 px-2 flex items-center justify-between hover:bg-[#f0edea] cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="font-headline-sm text-sm font-bold text-[#1c1c1a]">
                        {stockist.city}: {stockist.name}
                      </div>
                      <div className="font-label-mono-sm text-xs text-[#574239]">
                        {stockist.address}
                      </div>
                    </div>
                    <span className="font-label-mono-sm text-[10px] px-1.5 py-0.5 bg-[#c7ebd4] text-[#002113] uppercase font-bold">
                      {stockist.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
