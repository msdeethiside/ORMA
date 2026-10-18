import React, { useState, useMemo } from 'react';
import { CATALOG_EDITIONS, STOCKIST_LOCATIONS } from '../data/editions';
import { CatalogEdition, CartItem, StockistLocation } from '../types';
import { EditableText } from '../components/admin/EditableText';


interface EditionsArchiveScreenProps {
  onOpenPreview: (edition: CatalogEdition) => void;
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
  onOpenBag: () => void;
}

type CategoryFilter = 'all' | 'ciphers' | 'word-search' | 'zines' | 'stationery';
type PaperFilter = 'all' | 'Pocket A6' | 'Full Lay-Flat A5' | 'Hand-Folded Broadside';
type SortSequence = 'journey' | 'volume' | 'recent';

export const EditionsArchiveScreen: React.FC<EditionsArchiveScreenProps> = ({
  onOpenPreview,
  onAddToCart,
  onOpenBag,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [selectedPaper, setSelectedPaper] = useState<PaperFilter>('all');
  const [sortSequence, setSortSequence] = useState<SortSequence>('journey');
  const [selectedCityIndex, setSelectedCityIndex] = useState<number>(0);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const [orderSheetDownloaded, setOrderSheetDownloaded] = useState(false);

  const activeStockist: StockistLocation = STOCKIST_LOCATIONS[selectedCityIndex];

  const filteredEditions = useMemo(() => {
    let list = [...CATALOG_EDITIONS];

    if (selectedCategory !== 'all') {
      list = list.filter((e) => e.category === selectedCategory);
    }

    if (selectedPaper !== 'all') {
      list = list.filter((e) => e.paperDimension === selectedPaper);
    }

    if (sortSequence === 'journey') {
      list.sort((a, b) => a.journeyDurationMinutes - b.journeyDurationMinutes);
    } else if (sortSequence === 'volume') {
      list.sort((a, b) => a.volTag.localeCompare(b.volTag));
    } else if (sortSequence === 'recent') {
      list.sort((a, b) => b.remainingCopies - a.remainingCopies);
    }

    return list;
  }, [selectedCategory, selectedPaper, sortSequence]);

  const handleAdd = (edition: CatalogEdition) => {
    onAddToCart({
      id: edition.id,
      title: edition.title,
      price: edition.price,
      image: edition.image,
      tag: edition.volTag,
      binding: edition.paperDimension,
    });
    setAddedItemIds((prev) => ({ ...prev, [edition.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [edition.id]: false }));
    }, 1600);
  };

  const handleDownloadOrderSheet = () => {
    const textContent = `ORMA EDITIONS • VERONA PRINT ORDER SHEET
=============================================
DATE: ${new Date().toLocaleDateString()}
DISPATCH NO: ORMA-ORDER-2025

CURRENT PRINT RUN BATCH #04:
[01] The Trans-Continental Caesar Cipher ($24.00)
[02] Railway Terminus & Station Hall Word Searches ($22.00)
[03] Conversations Overheard in Dining Cars ($12.00)
[04] The Sleeper Train to Trieste ($14.00)
[05] The Cryptographer's Pocketbook ($28.00)
[06] ORMA Solid Brass Transit Pencil & Linen Slipcase ($18.00)

VERIFIED STATION BOOKSTALLS:
- London: St. Pancras International News & Daunt Books Marylebone
- Paris: Gare de Lyon Kiosque 12 & Librairie Delamain
- Tokyo: Tokyo Station Gransta & Tsutaya Books Daikanyama
- Berlin: Hauptbahnhof Lower Level & Do You Read Me?!
- Kyoto: Keihan Sanjo Station & Keibunsha Ichijoji

Printed on FSC Recycled Newsprint • Offline By Intention
Verona Studio Desk, Italy.
`;
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ORMA-Editions-Print-Order-Sheet.txt';
    link.click();
    URL.revokeObjectURL(url);
    setOrderSheetDownloaded(true);
    setTimeout(() => setOrderSheetDownloaded(false), 3000);
  };

  return (
    <div className="flex flex-col w-full">
      {/* ARCHIVAL HERO HEADER & LEDGER TICKER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-8 pb-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pb-4">
          <div className="flex flex-col max-w-3xl">
            <div className="flex items-center gap-2 mb-2 text-[#574239] font-label-mono-sm text-label-mono-sm uppercase tracking-wider">
              <span className="px-2 py-0.5 bg-[#ebe8e4] text-[#1c1c1a] font-bold border border-[#dec0b4]">
                ARCHIVE INDEX 2025
              </span>
              <span>•</span>
              <span>VERONA IMPRINT NO. 884-C</span>
            </div>
            <EditableText
              id="archive_title"
              as="h1"
              defaultText="The Complete Catalogue & Print Archive"
              className="font-headline-lg text-[#1c1c1a] font-semibold tracking-tight leading-none mb-2 block"
            />
            <EditableText
              id="archive_subtitle"
              as="p"
              defaultText="EDITIONS VOL. 01 TO 06 • PERSONAL ZINE COLLECTION • RISOGRAPH IMPRINTS"
              className="font-label-mono-md text-label-mono-md uppercase tracking-widest text-[#574239] block"
            />
          </div>

          <div className="flex items-center gap-2 bg-[#f6f3ef] px-4 py-2 border border-[#dec0b4] shadow-sm self-stretch md:self-auto">
            <div className="w-2.5 h-2.5 rounded-full bg-[#456553] shrink-0 animate-pulse"></div>
            <div className="flex flex-col">
              <span className="font-label-mono-sm text-label-mono-sm text-[#1c1c1a] uppercase font-bold tracking-wider">
                LIVE STOCK STATUS
              </span>
              <EditableText
                id="archive_stock_status"
                defaultText="BATCH #04 • 92 / 300 SLOTS REMAINING"
                className="font-label-mono-sm text-label-mono-sm text-[#574239]"
              />
            </div>
          </div>
        </div>

        {/* TACTILE RUN NOTICE BANNER */}
        <div className="bg-[#ebe8e4] p-3 shadow-sm border border-[#dec0b4] flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="material-symbols-outlined text-[#9e3d00] text-[18px]">verified</span>
            <EditableText
              id="archive_banner_notice"
              defaultText="Current Print Run Batch #04 • Hand-numbered editions packaged in glassine envelopes with station luggage tags."
              className="font-label-mono-sm text-label-mono-sm text-[#1c1c1a] uppercase tracking-wider truncate"
            />
          </div>
          <a
            className="font-label-mono-sm text-label-mono-sm uppercase font-bold text-[#9e3d00] hover:text-[#c15316] shrink-0 flex items-center gap-1 transition-colors cursor-pointer"
            href="#stockists-section"
          >
            <span>Find Local Bookstall</span>
            <span className="material-symbols-outlined text-[14px]">south</span>
          </a>
        </div>
      </section>

      {/* DEPARTURE BOARD FILTER & NAVIGATION RIBBON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 w-full pb-8">
        <div className="bg-[#31302e] text-[#f3f0ed] p-4 shadow-md flex flex-col gap-4 border border-[#1c1c1a]">
          {/* Upper Board: Ledger Status & Category Switches */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffdbcc] text-[20px]">train</span>
              <span className="font-label-mono-md text-label-mono-md uppercase tracking-widest text-[#ffdbcc] font-bold">
                TIMETABLE & CLASSIFICATION
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 font-label-mono-sm text-label-mono-sm uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[#9e3d00] text-[#ffffff] font-bold'
                    : 'bg-[#e5e2de]/20 hover:bg-[#e5e2de]/40 text-[#f3f0ed]'
                }`}
                type="button"
              >
                All Items ({CATALOG_EDITIONS.length})
              </button>

              <button
                onClick={() => setSelectedCategory('ciphers')}
                className={`px-3 py-1 font-label-mono-sm text-label-mono-sm uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === 'ciphers'
                    ? 'bg-[#9e3d00] text-[#ffffff] font-bold'
                    : 'bg-[#e5e2de]/20 hover:bg-[#e5e2de]/40 text-[#f3f0ed]'
                }`}
                type="button"
              >
                Cipher Compendiums (2)
              </button>

              <button
                onClick={() => setSelectedCategory('word-search')}
                className={`px-3 py-1 font-label-mono-sm text-label-mono-sm uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === 'word-search'
                    ? 'bg-[#9e3d00] text-[#ffffff] font-bold'
                    : 'bg-[#e5e2de]/20 hover:bg-[#e5e2de]/40 text-[#f3f0ed]'
                }`}
                type="button"
              >
                Word Search Editions (1)
              </button>

              <button
                onClick={() => setSelectedCategory('zines')}
                className={`px-3 py-1 font-label-mono-sm text-label-mono-sm uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === 'zines'
                    ? 'bg-[#9e3d00] text-[#ffffff] font-bold'
                    : 'bg-[#e5e2de]/20 hover:bg-[#e5e2de]/40 text-[#f3f0ed]'
                }`}
                type="button"
              >
                Personal Travel Zines (2)
              </button>

              <button
                onClick={() => setSelectedCategory('stationery')}
                className={`px-3 py-1 font-label-mono-sm text-label-mono-sm uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === 'stationery'
                    ? 'bg-[#9e3d00] text-[#ffffff] font-bold'
                    : 'bg-[#e5e2de]/20 hover:bg-[#e5e2de]/40 text-[#f3f0ed]'
                }`}
                type="button"
              >
                Stationery & Companion Sleeves (1)
              </button>
            </div>
          </div>

          {/* Lower Board: Split Flap Format & Time Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#31302e]/70 pt-2 border-t border-[#f3f0ed]/20">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-label-mono-sm text-label-mono-sm uppercase text-[#f3f0ed]/60">
                Paper Dimensions:
              </span>
              {(['all', 'Pocket A6', 'Full Lay-Flat A5', 'Hand-Folded Broadside'] as PaperFilter[]).map(
                (p) => (
                  <button
                    key={p}
                    onClick={() => setSelectedPaper(p)}
                    className={`px-2 py-0.5 text-xs font-label-mono-sm uppercase cursor-pointer transition-all ${
                      selectedPaper === p
                        ? 'bg-[#ffdbcc] text-[#351000] font-bold'
                        : 'bg-[#e5e2de]/15 text-[#f3f0ed] hover:bg-[#e5e2de]/30'
                    }`}
                  >
                    {p === 'all' ? 'All Sizes' : p}
                  </button>
                )
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="font-label-mono-sm text-label-mono-sm uppercase text-[#f3f0ed]/60">
                Sequence:
              </span>
              <select
                aria-label="Sort catalog items"
                value={sortSequence}
                onChange={(e) => setSortSequence(e.target.value as SortSequence)}
                className="bg-[#e5e2de]/20 text-[#f3f0ed] font-label-mono-sm text-label-mono-sm uppercase px-3 py-1 border border-[#dec0b4]/40 focus:outline-none cursor-pointer"
              >
                <option value="journey" className="bg-[#31302e] text-[#f3f0ed]">
                  By Journey Time (Short to Overnight)
                </option>
                <option value="volume" className="bg-[#31302e] text-[#f3f0ed]">
                  By Volume Order
                </option>
                <option value="recent" className="bg-[#31302e] text-[#f3f0ed]">
                  Recently Inked
                </option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHIVAL CATALOG GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 w-full pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEditions.map((edition) => (
            <article
              key={edition.id}
              className="bg-[#ffffff] border-2 border-[#1c1c1a] shadow-[4px_4px_0px_0px_#1c1c1a] hover:shadow-[6px_6px_0px_0px_#1c1c1a] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Visual & Photographic Area */}
                <div className="relative w-full h-64 overflow-hidden bg-[#f0edea] border-b border-[#dec0b4]">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={edition.title}
                    src={edition.image}
                  />
                  {edition.bannerBadge && (
                    <div
                      className={`absolute top-3 left-3 font-label-mono-sm text-label-mono-sm uppercase px-2 py-0.5 shadow-sm font-bold border border-[#1c1c1a] ${
                        edition.badgeType === 'primary'
                          ? 'bg-[#9e3d00] text-white'
                          : edition.badgeType === 'secondary'
                          ? 'bg-[#456553] text-white'
                          : edition.badgeType === 'tertiary'
                          ? 'bg-[#a83029] text-white'
                          : edition.badgeType === 'inverse'
                          ? 'bg-[#1c1c1a] text-white'
                          : 'bg-[#e5e2de] text-[#1c1c1a]'
                      }`}
                    >
                      {edition.bannerBadge}
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur text-[#1c1c1a] font-label-mono-sm text-label-mono-sm uppercase px-2 py-0.5 shadow-sm font-bold border border-[#dec0b4]">
                    {edition.volTag}
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[#574239] font-label-mono-sm text-label-mono-sm uppercase">
                    <span>{edition.dispatchNo}</span>
                    <span>{edition.extent}</span>
                  </div>

                  <h2 className="font-headline-sm text-headline-sm text-[#1c1c1a] font-semibold group-hover:text-[#9e3d00] transition-colors leading-tight">
                    {edition.title}
                  </h2>

                  <p className="font-body-md text-body-md text-[#574239] line-clamp-2">
                    {edition.description}
                  </p>

                  <div className="bg-[#f6f3ef] p-3 border border-[#dec0b4] flex flex-col gap-1 text-[#574239] font-label-mono-sm text-label-mono-sm mt-2">
                    {edition.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex justify-between">
                        <span>{spec.label}</span>
                        <span className="text-[#1c1c1a] font-bold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Price and Actions */}
              <div className="px-4 pb-4 pt-1 flex items-center justify-between gap-2 border-t border-[#dec0b4]/60">
                <div className="flex flex-col">
                  <span className="font-label-mono-sm text-label-mono-sm text-[#574239] uppercase">
                    EDITION PRICE
                  </span>
                  <span className="font-headline-sm text-headline-sm text-[#1c1c1a] font-bold">
                    ${edition.price.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenPreview(edition)}
                    className="px-3 py-2 bg-[#f0edea] text-[#1c1c1a] font-label-mono-sm text-label-mono-sm uppercase hover:bg-[#ebe8e4] transition-colors border border-[#dec0b4] cursor-pointer"
                    type="button"
                  >
                    Preview
                  </button>

                  <button
                    onClick={() => handleAdd(edition)}
                    className={`px-3 py-2 font-label-mono-sm text-label-mono-sm uppercase font-bold tracking-wider transition-colors shadow-sm flex items-center gap-1 cursor-pointer ${
                      addedItemIds[edition.id]
                        ? 'bg-[#456553] text-[#ffffff]'
                        : 'bg-[#9e3d00] hover:bg-[#c15316] text-[#ffffff]'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {addedItemIds[edition.id] ? 'done' : 'bookmark_add'}
                    </span>
                    <span>{addedItemIds[edition.id] ? 'Packed' : 'Add to Bag'}</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* INTERACTIVE STOCKIST FINDER & STATION BOOKSTALL LOCATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 w-full pb-16" id="stockists-section">
        <div className="bg-[#f6f3ef] p-6 md:p-8 border-2 border-[#1c1c1a] shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#dec0b4]">
            <div>
              <div className="flex items-center gap-1.5 text-[#456553] font-label-mono-sm text-label-mono-sm uppercase font-bold tracking-widest mb-1">
                <span className="material-symbols-outlined text-[18px]">location_on</span>
                <span>PHYSICAL IN-TRANSIT NETWORK</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-[#1c1c1a] font-semibold tracking-tight">
                Station Bookstalls & Indie Stockists
              </h2>
              <p className="font-body-lg text-body-lg text-[#574239] max-w-2xl mt-1">
                Pick up fresh press copies alongside morning espresso. Verified stockists carrying sealed risograph volumes and companion slips.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleDownloadOrderSheet}
                className="px-4 py-2.5 bg-[#e5e2de] text-[#1c1c1a] font-label-mono-sm text-label-mono-sm uppercase font-bold tracking-wider hover:bg-[#f0edea] hover:text-[#9e3d00] transition-all flex items-center gap-2 shadow-sm border border-[#dec0b4] cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
                <span>
                  {orderSheetDownloaded ? 'Order Sheet Saved ✓' : 'Download Print Order Sheet (TXT/PDF)'}
                </span>
              </button>
            </div>
          </div>

          {/* Interactive City Switcher & Geographic Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* City Selector Column */}
            <div className="lg:col-span-5 flex flex-col gap-2">
              {STOCKIST_LOCATIONS.map((loc, idx) => {
                const isActive = idx === selectedCityIndex;
                return (
                  <div
                    key={loc.city}
                    onClick={() => setSelectedCityIndex(idx)}
                    className={`cursor-pointer p-4 border transition-all ${
                      isActive
                        ? 'bg-[#ffffff] border-[#1c1c1a] shadow-[3px_3px_0px_0px_#1c1c1a] translate-x-1'
                        : 'bg-[#ebe8e4]/60 border-[#dec0b4] hover:bg-[#ffffff]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-headline-sm text-headline-sm text-[#1c1c1a] font-bold">
                        {loc.city}
                      </span>
                      <span
                        className={`font-label-mono-sm text-label-mono-sm uppercase px-1.5 py-0.5 font-semibold ${
                          loc.badge === 'FLAGSHIP'
                            ? 'bg-[#c7ebd4] text-[#002113]'
                            : 'bg-[#e5e2de] text-[#574239]'
                        }`}
                      >
                        {loc.badge}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-[#574239] mb-1">{loc.address}</p>
                    <div className="font-label-mono-sm text-label-mono-sm text-[#456553] font-bold uppercase">
                      {loc.restockNote}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Map & Detail Showcase */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div
                className="w-full h-80 border-2 border-[#1c1c1a] shadow-md bg-cover bg-center overflow-hidden relative"
                style={{
                  backgroundImage: `url('${activeStockist.mapImage}')`,
                }}
              >
                <div className="absolute inset-0 bg-[#31302e]/10 backdrop-contrast-125"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur p-4 border border-[#1c1c1a] shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#9e3d00] text-[24px]">storefront</span>
                    <div>
                      <h4 className="font-headline-sm text-base sm:text-lg text-[#1c1c1a] font-bold leading-none">
                        {activeStockist.name}
                      </h4>
                      <p className="font-label-mono-sm text-label-mono-sm uppercase text-[#574239] mt-1">
                        {activeStockist.address} • {activeStockist.city}
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-block font-label-mono-sm text-label-mono-sm uppercase px-2 py-1 bg-[#c7ebd4] text-[#002113] font-semibold border border-[#dec0b4]">
                    STOCKED
                  </span>
                </div>
              </div>

              {/* Postal Order Guarantee Ledger */}
              <div className="bg-[#f0edea] p-4 border border-[#dec0b4] flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#9e3d00] text-[32px] shrink-0">
                    markunread_mailbox
                  </span>
                  <div className="flex flex-col">
                    <span className="font-label-mono-md text-label-mono-md uppercase font-bold text-[#1c1c1a]">
                      Subscribers Priority Dispatch
                    </span>
                    <span className="font-body-sm text-body-sm text-[#574239]">
                      Printed volumes ship inside stiff unbleached cardboard packaging with glassine envelopes and sealed wax-stamp stamps.
                    </span>
                  </div>
                </div>

                <button
                  onClick={onOpenBag}
                  className="px-4 py-2 bg-[#1c1c1a] text-white font-label-mono-sm text-label-mono-sm uppercase font-bold tracking-wider hover:bg-[#9e3d00] transition-colors shrink-0 shadow cursor-pointer"
                  type="button"
                >
                  Go to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
