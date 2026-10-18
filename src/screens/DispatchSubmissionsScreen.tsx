import React, { useState } from 'react';
import { EditableText } from '../components/admin/EditableText';

export const DispatchSubmissionsScreen: React.FC = () => {

  const [creatorName, setCreatorName] = useState('');
  const [creatorEmail, setCreatorEmail] = useState('');
  const [manuscriptTitle, setManuscriptTitle] = useState('');
  const [carriageCategory, setCarriageCategory] = useState('travel-zine');
  const [journeyTime, setJourneyTime] = useState('short');
  const [pitch, setPitch] = useState('');
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);

  const [printingDesires, setPrintingDesires] = useState({
    riso: true,
    letterpress: true,
    smythSewn: false,
    saddleStitch: false,
    recycledPaper: true,
    coupons: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedManifestId, setSubmittedManifestId] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachedFileName(e.target.files[0].name);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setAttachedFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `ORMA-DS-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedManifestId(generatedId);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Archival Routing Bar */}
      <section className="w-full bg-[#ebe8e4] py-2 px-4 sm:px-6 shadow-sm border-b border-[#dec0b4]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 font-label-mono-sm text-label-mono-sm uppercase text-[#574239]">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 bg-[#9e3d00] text-white font-bold text-[9px]">
              DS
            </span>
            <span className="tracking-wider text-[#1c1c1a] font-bold">
              TELEGRAPH DESK • PLATFORM SUBMISSIONS
            </span>
            <span className="opacity-40">/</span>
            <span>DISPATCH LOG REF: OM-2025-SUB-B</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#456553] font-bold">
              <span className="material-symbols-outlined text-[14px]">circle</span>
              ACCEPTING ENTRIES: SEASON IV
            </span>
            <span className="hidden sm:inline opacity-40">•</span>
            <span className="hidden sm:inline">OFFLINE CO-PRINTING PROGRAM</span>
          </div>
        </div>
      </section>

      {/* Editorial Page Header */}
      <section className="relative w-full px-4 sm:px-6 pt-12 pb-16 bg-[#fcf9f5] overflow-hidden">
        {/* Subtle Stamp Watermark SVG */}
        <div className="absolute right-6 top-8 pointer-events-none opacity-10 select-none hidden lg:block">
          <svg className="text-[#1c1c1a]" height="240" viewBox="0 0 200 200" width="240">
            <circle cx="100" cy="100" fill="none" r="92" stroke="currentColor" strokeDasharray="6,4" strokeWidth="3"></circle>
            <circle cx="100" cy="100" fill="none" r="76" stroke="currentColor" strokeWidth="1.5"></circle>
            <path d="M 30 100 A 70 70 0 0 1 170 100" fill="none" id="curve"></path>
            <text className="font-label-mono-sm text-[11px] uppercase tracking-widest" fill="currentColor">
              <textPath href="#curve" startOffset="50%" textAnchor="middle">
                ORMA EDITIONS • MILANO POST
              </textPath>
            </text>
            <text className="font-headline-sm text-headline-sm" fill="currentColor" textAnchor="middle" x="100" y="105">
              1924
            </text>
            <text className="font-label-mono-sm text-[9px] uppercase tracking-wider" fill="currentColor" textAnchor="middle" x="100" y="125">
              DESPATCH INSP.
            </text>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Monospace Telegraph Head */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-[#f0edea] font-label-mono-sm text-label-mono-sm uppercase tracking-wider text-[#1c1c1a] border border-[#dec0b4] font-bold">
              ORMA EDITIONS NO. 08
            </span>
            <span className="text-[#9e3d00] font-label-mono-sm text-label-mono-sm uppercase tracking-wider font-bold">
              CALL FOR MANUSCRIPTS • ZINES • PUZZLE COMPENDIUMS
            </span>
          </div>

          {/* Main Headline and Editorial Lead */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8">
              <EditableText
                id="submissions_title"
                as="h1"
                defaultText="Open Carriage Submissions & Creator Dispatch"
                className="font-headline-lg text-headline-lg text-[#1c1c1a] tracking-tight leading-none mb-4 font-bold block"
              />
              <EditableText
                id="submissions_lead"
                as="p"
                defaultText="We are actively acquiring and co-publishing independent zines, bespoke word searches, narrative crosswords, mathematical enigmas, and travel chronicles made for offline contemplation. If you have spent quiet transit hours composing paper artifacts, lay them on our desk."
                className="font-body-lg text-body-lg text-[#574239] max-w-2xl leading-relaxed block"
              />
            </div>

            {/* Archival Status Card */}
            <div className="lg:col-span-4 bg-[#f6f3ef] p-4 border border-[#dec0b4] shadow-sm">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#dec0b4]">
                <span className="font-label-mono-sm text-label-mono-sm uppercase text-[#574239]">Desk In-Charge</span>
                <span className="font-label-mono-sm text-label-mono-sm text-[#456553] font-bold uppercase tracking-wider">
                  Ms. Dee & Editorial Guild
                </span>
              </div>
              <div className="font-body-sm text-body-sm text-[#574239] italic mb-3">
                “Every printed object we release must smell of real ink and survive sixty journeys in an overcoat pocket.”
              </div>
              <div className="flex items-center justify-between font-label-mono-sm text-label-mono-sm text-[#574239] pt-1">
                <span>READING TIMEFRAME:</span>
                <span className="font-bold text-[#1c1c1a]">14 RAIL DAYS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Visual Intermission */}
      <section className="w-full px-4 sm:px-6 pb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative overflow-hidden shadow-sm h-64 bg-[#f0edea] border border-[#1c1c1a]">
            <img
              className="w-full h-full object-cover"
              alt="Archival letterpress printing blocks laid on a weathered oak workbench with dried terracotta ink"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiIFk-d-j_pqvSqrqk2ELAxNGMPtEhBIQASr-YHLdI_YYDwbFoIF9Huam_NkjQnJXhAHLphfCvo_0pF-gNmc1qfIyo7cI7mzty9f0QgR769i9Of73TzxaOjPyIgOFwWsuLnTslbptGZqLg1YMU5xkMQPpYmx5-mrZKdEa0fAO9hRQPch1bYCya5GVIF0Rgfwkon2c6RxqDFqV4xz3xKhX0iRlG50eJsbLCq40L1fJehO6dPkbDEET_qg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1a]/80 via-transparent to-transparent flex items-end p-4">
              <span className="font-label-mono-sm text-label-mono-sm uppercase tracking-wider text-white font-bold">
                Verona Letterpress Proofing
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden shadow-sm h-64 bg-[#f0edea] border border-[#1c1c1a]">
            <img
              className="w-full h-full object-cover"
              alt="Traveler notebook showing hand-drawn railway map ciphers, ink stamps from Swiss and Italian railway lines"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAInyleuFZ53PDXACRXPzlyboyO9uHvBKz6xLYhJcB5OS0ILGkKGU3IwGHKBf59iplxuINqcKqoSeRshsOGUUaqE1GxBS4fOZQ0_VeHmKMwiVTRP9hMVAFs0TUE35JzXO7-9m9k1WkX9fsf0YFlSvVDU7NGoMcrgqqRwmwkfUFt-YNnMT8hclU-dkYLdxOVoXWyYg_1Eqi1P9TG-YsS7lyQ8xXEM6kyDxehqCyynAwR_YLXm9v8XuJtDA"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1a]/80 via-transparent to-transparent flex items-end p-4">
              <span className="font-label-mono-sm text-label-mono-sm uppercase tracking-wider text-white font-bold">
                Field Ciphers & Transit Log
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden shadow-sm h-64 bg-[#f0edea] border border-[#1c1c1a]">
            <img
              className="w-full h-full object-cover"
              alt="Tactile risograph printed indie zine in terracotta and sage green inks on train carriage table"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfDDgdoj8PzO9tc4rYOhBAMaxnilM2siijJGVP27xhz2ETRt1tLcgbeiPiW2SQ31qp9K8Cdi1RCifHJZxLs2It9AQ-XzX7I5lgEiZ1wXMcQlmjD5VlQkSE9P7KIkggXnKJLtIiC7tvTGmg3Wlb3qLnTtq5LgRGYVXnYNPlNuPM-wKUIXZqvyZcm4gjsNdjA8FhNNbHrIuXzN8RuE1VtTTaNv5Id5Yp2vNddHR5Po9QdCHMu6rJqPqNjw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1a]/80 via-transparent to-transparent flex items-end p-4">
              <span className="font-label-mono-sm text-label-mono-sm uppercase tracking-wider text-white font-bold">
                Hand-Numbered Station Editions
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* What We Seek: The Four Submission Carriages */}
      <section className="w-full px-4 sm:px-6 py-12 bg-[#f6f3ef] border-y border-[#dec0b4]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#dec0b4]">
            <div>
              <span className="font-label-mono-sm text-label-mono-sm uppercase tracking-widest text-[#9e3d00] font-bold">
                SECTION II • CARRIAGE SPECS
              </span>
              <h2 className="font-headline-lg text-headline-lg text-[#1c1c1a] mt-1 font-bold">
                The Four Submission Carriages
              </h2>
            </div>
            <p className="font-body-md text-body-md text-[#574239] max-w-md mt-2 md:mt-0">
              We organize our publishing calendar along four distinct editorial carriages. Choose the compartment your work naturally boards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Carriage 01 */}
            <div className="bg-[#ffffff] p-6 shadow-[3px_3px_0px_0px_#1c1c1a] border-2 border-[#1c1c1a] flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-0.5 bg-[#ffdbcc] text-[#7c2e00] font-label-mono-sm text-label-mono-sm uppercase font-bold border border-[#dec0b4]">
                    CARRIAGE 01
                  </span>
                  <span className="material-symbols-outlined text-[#9e3d00] text-[24px]">train</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-[#1c1c1a] mb-2 font-bold">
                  Personal Travel & Transit Zines
                </h3>
                <p className="font-body-md text-body-md text-[#574239] mb-4 leading-relaxed">
                  Micro-essays, visual train diaries, found ticket collages, and two-color Risograph photography capturing the peculiar stillness of transit corridors, station lunch counters, and night couchette berths.
                </p>
              </div>
              <div className="pt-3 bg-[#f6f3ef] -mx-6 -mb-6 p-4 border-t border-[#dec0b4]">
                <span className="font-label-mono-sm text-label-mono-sm text-[#574239] uppercase tracking-wider block mb-1">
                  IDEAL FORMAT:
                </span>
                <span className="font-label-mono-sm text-label-mono-sm text-[#1c1c1a] font-bold uppercase">
                  16–36 PAGES • A6 OR SLENDER POCKET TALL
                </span>
              </div>
            </div>

            {/* Carriage 02 */}
            <div className="bg-[#ffffff] p-6 shadow-[3px_3px_0px_0px_#1c1c1a] border-2 border-[#1c1c1a] flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-0.5 bg-[#c7ebd4] text-[#2d4d3c] font-label-mono-sm text-label-mono-sm uppercase font-bold border border-[#dec0b4]">
                    CARRIAGE 02
                  </span>
                  <span className="material-symbols-outlined text-[#456553] text-[24px]">key</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-[#1c1c1a] mb-2 font-bold">
                  Themed Cipher & Cryptic Compendiums
                </h3>
                <p className="font-body-md text-body-md text-[#574239] mb-4 leading-relaxed">
                  Meticulously engineered paper puzzles with literary, cartographic, or historical mysteries. Caesar ciphers, Vigenère wheels, railway schedules with encoded waypoints, and narrative escape-page compendiums.
                </p>
              </div>
              <div className="pt-3 bg-[#f6f3ef] -mx-6 -mb-6 p-4 border-t border-[#dec0b4]">
                <span className="font-label-mono-sm text-label-mono-sm text-[#574239] uppercase tracking-wider block mb-1">
                  IDEAL FORMAT:
                </span>
                <span className="font-label-mono-sm text-label-mono-sm text-[#1c1c1a] font-bold uppercase">
                  SMYTH-SEWN FLAT • 48–96 PAGES WITH GLOSSARY
                </span>
              </div>
            </div>

            {/* Carriage 03 */}
            <div className="bg-[#ffffff] p-6 shadow-[3px_3px_0px_0px_#1c1c1a] border-2 border-[#1c1c1a] flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-0.5 bg-[#e5e2de] text-[#1c1c1a] font-label-mono-sm text-label-mono-sm uppercase font-bold border border-[#dec0b4]">
                    CARRIAGE 03
                  </span>
                  <span className="material-symbols-outlined text-[#574239] text-[24px]">map</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-[#1c1c1a] mb-2 font-bold">
                  Broadside & Pocket Puzzles
                </h3>
                <p className="font-body-md text-body-md text-[#574239] mb-4 leading-relaxed">
                  Single-sheet folded broadsheets, ingenious pocket origami puzzles, tactile route-finding maps, and miniature table games engineered to unfold entirely onto a 40cm train drop-table.
                </p>
              </div>
              <div className="pt-3 bg-[#f6f3ef] -mx-6 -mb-6 p-4 border-t border-[#dec0b4]">
                <span className="font-label-mono-sm text-label-mono-sm text-[#574239] uppercase tracking-wider block mb-1">
                  IDEAL FORMAT:
                </span>
                <span className="font-label-mono-sm text-label-mono-sm text-[#1c1c1a] font-bold uppercase">
                  FOLDOUT BROADSIDE • 100% COTTON MAP FOLD
                </span>
              </div>
            </div>

            {/* Carriage 04 */}
            <div className="bg-[#ffffff] p-6 shadow-[3px_3px_0px_0px_#1c1c1a] border-2 border-[#1c1c1a] flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-0.5 bg-[#ffdad5] text-[#8a1a16] font-label-mono-sm text-label-mono-sm uppercase font-bold border border-[#dec0b4]">
                    CARRIAGE 04
                  </span>
                  <span className="material-symbols-outlined text-[#a83029] text-[24px]">spellcheck</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-[#1c1c1a] mb-2 font-bold">
                  Experimental Word Craft
                </h3>
                <p className="font-body-md text-body-md text-[#574239] mb-4 leading-relaxed">
                  Bespoke constraint writing, railway station anagrams, lipograms, slow-burn word chains, and meditative crosswords built around forgotten continental flora, maritime signals, or architectural terms.
                </p>
              </div>
              <div className="pt-3 bg-[#f6f3ef] -mx-6 -mb-6 p-4 border-t border-[#dec0b4]">
                <span className="font-label-mono-sm text-label-mono-sm text-[#574239] uppercase tracking-wider block mb-1">
                  IDEAL FORMAT:
                </span>
                <span className="font-label-mono-sm text-label-mono-sm text-[#1c1c1a] font-bold uppercase">
                  SADDLE-STITCHED OCTAVO • 24–40 PAGES
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The ORMA Publishing Covenant */}
      <section className="w-full px-4 sm:px-6 py-16 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#f0edea] p-8 md:p-12 border-2 border-[#1c1c1a] shadow-[4px_4px_0px_0px_#1c1c1a] relative">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#456553] text-[#ffffff] font-label-mono-sm text-label-mono-sm uppercase tracking-wider mb-4 font-bold">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              CREATOR ETHICS • CODE OF CONDUCT 2025
            </div>

            <h2 className="font-headline-lg text-headline-lg text-[#1c1c1a] max-w-3xl mb-4 font-bold">
              The ORMA Publishing Covenant: Fair & Transparent Terms for Independent Creators
            </h2>

            <p className="font-body-lg text-body-lg text-[#574239] max-w-3xl mb-8 leading-relaxed">
              We founded ORMA because modern publishing often isolates creators behind opaque contracts and meager royalties. We operate as an artisan guild where your effort is honored with equal partnership, uncompromising paper selection, and immediate transparency.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Covenant 1 */}
              <div className="bg-[#ffffff] p-5 border border-[#dec0b4] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="font-headline-lg text-headline-lg text-[#9e3d00] mb-1 font-bold">
                    50 / 50
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-[#1c1c1a] mb-2 font-bold">
                    Net Profit Split on Every Copy
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#574239] leading-relaxed">
                    From copy number 001 to the final folio sold, creator profits are calculated after raw material costs and divided cleanly down the middle. Statements sent every 60 days.
                  </p>
                </div>
                <div className="mt-4 font-label-mono-sm text-label-mono-sm text-[#9e3d00] uppercase font-bold tracking-wider pt-2 border-t border-[#dec0b4]">
                  NO HIDDEN STUDIO DEDUCTIONS
                </div>
              </div>

              {/* Covenant 2 */}
              <div className="bg-[#ffffff] p-5 border border-[#dec0b4] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-[#c7ebd4] text-[#002113] flex items-center justify-center mb-3 border border-[#dec0b4]">
                    <span className="material-symbols-outlined text-[24px]">layers</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-[#1c1c1a] mb-2 font-bold">
                    Artisan Physical Production Covered
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#574239] leading-relaxed">
                    We finance and supervise all letterpress plates, Risograph drums, Fedrigoni unbleached cotton paper, and hand thread-binding in our Verona workshop. You contribute zero capital.
                  </p>
                </div>
                <div className="mt-4 font-label-mono-sm text-label-mono-sm text-[#456553] uppercase font-bold tracking-wider pt-2 border-t border-[#dec0b4]">
                  100% GUILD CAPITAL UNDERWRITTEN
                </div>
              </div>

              {/* Covenant 3 */}
              <div className="bg-[#ffffff] p-5 border border-[#dec0b4] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-[#ffdbcc] text-[#351000] flex items-center justify-center mb-3 border border-[#dec0b4]">
                    <span className="material-symbols-outlined text-[24px]">copyright</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-[#1c1c1a] mb-2 font-bold">
                    You Retain 100% IP & Copyright
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#574239] leading-relaxed">
                    Your puzzles, words, characters, and concepts remain entirely yours forever. We license only the physical print edition rights for specific limited numbered runs.
                  </p>
                </div>
                <div className="mt-4 font-label-mono-sm text-label-mono-sm text-[#9e3d00] uppercase font-bold tracking-wider pt-2 border-t border-[#dec0b4]">
                  CREATOR REVERSIBLE RIGHTS
                </div>
              </div>

              {/* Covenant 4 */}
              <div className="bg-[#ffffff] p-5 border border-[#dec0b4] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-[#e5e2de] text-[#1c1c1a] flex items-center justify-center mb-3 border border-[#dec0b4]">
                    <span className="material-symbols-outlined text-[24px]">storefront</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-[#1c1c1a] mb-2 font-bold">
                    Global Indie Kiosk Network
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#574239] leading-relaxed">
                    Guaranteed placement across 40+ curated independent station kiosks, railway bookshops, and art zine libraries throughout Zurich, Milan, Tokyo, Berlin, and Paris.
                  </p>
                </div>
                <div className="mt-4 font-label-mono-sm text-label-mono-sm text-[#1c1c1a] font-bold uppercase tracking-wider pt-2 border-t border-[#dec0b4]">
                  40+ STOCKISTS WORLDWIDE
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Dispatch Telegraph (Customs Dispatch Slip) */}
      <section className="w-full px-4 sm:px-6 py-16 bg-[#f6f3ef] border-t border-[#dec0b4]" id="telegraph-desk">
        <div className="max-w-4xl mx-auto">
          {/* Postal Header Header Accent */}
          <div className="text-center mb-8">
            <span className="px-3 py-1 bg-[#f0edea] font-label-mono-sm text-label-mono-sm uppercase tracking-widest text-[#1c1c1a] border border-[#dec0b4] inline-block mb-2 font-bold">
              FORM OM-DISPATCH-2025/VERONA
            </span>
            <h2 className="font-headline-lg text-headline-lg text-[#1c1c1a] tracking-tight font-bold">
              Digital Dispatch Telegraph Manifest
            </h2>
            <p className="font-body-md text-body-md text-[#574239] max-w-lg mx-auto mt-1">
              Complete the dispatch ledger below. When ready, transmit your manuscript folio directly into Ms. Dee's review basket.
            </p>
          </div>

          {/* Postal Slip Envelope Container */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#ffffff] p-6 md:p-10 border-2 border-[#1c1c1a] shadow-[6px_6px_0px_0px_#1c1c1a] flex flex-col gap-6"
          >
            {/* Top Custom Slip Ledger Data */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f6f3ef] p-3 border border-[#dec0b4] font-label-mono-sm text-label-mono-sm text-[#574239]">
              <div>
                <span className="text-[#1c1c1a] font-bold uppercase">PORT OF DESPATCH:</span> MILANO CENTRALE / STATION 04
              </div>
              <div>
                <span className="text-[#1c1c1a] font-bold uppercase">MANIFEST ID:</span> ORMA-DS-9831
              </div>
              <div className="text-[#9e3d00] font-bold uppercase">STATUS: OPEN FOR REGISTRATION</div>
            </div>

            {/* Creator Information Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-label-mono-sm text-label-mono-sm uppercase text-[#1c1c1a] font-bold">
                  Creator / Telegraph Handle *
                </label>
                <input
                  type="text"
                  required
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  placeholder="e.g. Elena V. / Atelier Sforza"
                  className="w-full bg-[#f6f3ef] px-3.5 py-2.5 text-[#1c1c1a] font-body-md text-body-md border border-[#1c1c1a] focus:bg-white placeholder:text-[#574239]/50"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-mono-sm text-label-mono-sm uppercase text-[#1c1c1a] font-bold">
                  Return Post Office / Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={creatorEmail}
                  onChange={(e) => setCreatorEmail(e.target.value)}
                  placeholder="e.g. elena@couchette-press.ch"
                  className="w-full bg-[#f6f3ef] px-3.5 py-2.5 text-[#1c1c1a] font-label-mono-md text-label-mono-md border border-[#1c1c1a] focus:bg-white placeholder:text-[#574239]/50"
                />
              </div>
            </div>

            {/* Work Details Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 flex flex-col gap-1">
                <label className="font-label-mono-sm text-label-mono-sm uppercase text-[#1c1c1a] font-bold">
                  Proposed Transit Object Title *
                </label>
                <input
                  type="text"
                  required
                  value={manuscriptTitle}
                  onChange={(e) => setManuscriptTitle(e.target.value)}
                  placeholder="e.g. The Simplon Orient Enigma: 12 Alpine Cryptograms"
                  className="w-full bg-[#f6f3ef] px-3.5 py-2.5 text-[#1c1c1a] font-body-md text-body-md border border-[#1c1c1a] focus:bg-white placeholder:text-[#574239]/50"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-mono-sm text-label-mono-sm uppercase text-[#1c1c1a] font-bold">
                  Carriage Category *
                </label>
                <select
                  value={carriageCategory}
                  onChange={(e) => setCarriageCategory(e.target.value)}
                  className="w-full bg-[#f6f3ef] px-3.5 py-2.5 text-[#1c1c1a] font-body-md text-body-md border border-[#1c1c1a] focus:bg-white cursor-pointer"
                >
                  <option value="travel-zine">Carriage 01: Travel & Transit Zine</option>
                  <option value="cipher-compendium">Carriage 02: Cipher & Cryptic Compendium</option>
                  <option value="broadside-puzzle">Carriage 03: Broadside / Pocket Game</option>
                  <option value="word-craft">Carriage 04: Experimental Word Craft</option>
                  <option value="other-enigma">Unclassified Offline Object</option>
                </select>
              </div>
            </div>

            {/* Journey Duration & Scope */}
            <div className="flex flex-col gap-2">
              <label className="font-label-mono-sm text-label-mono-sm uppercase text-[#1c1c1a] font-bold">
                Estimated Journey / Reading Time (Offline Solitary Metric)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { id: 'short', label: '30–45 Mins (Commute)' },
                  { id: 'medium', label: '2–3 Hours (Regional)' },
                  { id: 'long', label: 'Overnight Sleeper' },
                  { id: 'multi', label: 'Multi-Week Companion' },
                ].map((choice) => (
                  <label
                    key={choice.id}
                    className="flex items-center gap-2 p-3 bg-[#f6f3ef] border border-[#dec0b4] cursor-pointer hover:bg-[#f0edea]"
                  >
                    <input
                      type="radio"
                      name="journeyTime"
                      value={choice.id}
                      checked={journeyTime === choice.id}
                      onChange={(e) => setJourneyTime(e.target.value)}
                      className="accent-[#9e3d00] w-4 h-4 cursor-pointer"
                    />
                    <span className="font-label-mono-sm text-label-mono-sm text-[#1c1c1a]">
                      {choice.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Printing Desires Checkboxes */}
            <div className="flex flex-col gap-2">
              <label className="font-label-mono-sm text-label-mono-sm uppercase text-[#1c1c1a] font-bold">
                Paper & Physical Printing Desires (Select all that entice you)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { key: 'riso', label: 'Risograph 2-Color Ink' },
                  { key: 'letterpress', label: 'Letterpress Cover Foil / Deboss' },
                  { key: 'smythSewn', label: 'Smyth-Sewn Layflat Binding' },
                  { key: 'saddleStitch', label: 'Saddle-Stitch Brass Wire' },
                  { key: 'recycledPaper', label: 'FSC Recycled Heavy Newsprint' },
                  { key: 'coupons', label: 'Perforated Tear-Out Coupons' },
                ].map((opt) => (
                  <label
                    key={opt.key}
                    className="flex items-center gap-2 p-3 bg-[#f6f3ef] border border-[#dec0b4] cursor-pointer hover:bg-[#f0edea]"
                  >
                    <input
                      type="checkbox"
                      checked={printingDesires[opt.key as keyof typeof printingDesires]}
                      onChange={(e) =>
                        setPrintingDesires({
                          ...printingDesires,
                          [opt.key]: e.target.checked,
                        })
                      }
                      className="accent-[#9e3d00] w-4 h-4 cursor-pointer"
                    />
                    <span className="font-label-mono-sm text-label-mono-sm text-[#1c1c1a]">
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Narrative Pitch */}
            <div className="flex flex-col gap-1">
              <label className="font-label-mono-sm text-label-mono-sm uppercase text-[#1c1c1a] font-bold">
                Brief Pitch & Origin Journey *
              </label>
              <span className="font-body-sm text-body-sm text-[#574239] italic mb-1">
                Tell us where this idea was conceived — what train line, bus route, bench, or quiet café inspired it?
              </span>
              <textarea
                required
                rows={4}
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                placeholder="It began on the Regional express between Domodossola and Brig, watching mountain light fade into dusk. The crossword grid reflects the elevation change of the old pass..."
                className="w-full bg-[#f6f3ef] p-3 text-[#1c1c1a] font-body-md text-body-md border border-[#1c1c1a] focus:bg-white placeholder:text-[#574239]/50 resize-y"
              ></textarea>
            </div>

            {/* Tactile File Dropzone */}
            <div className="flex flex-col gap-1">
              <label className="font-label-mono-sm text-label-mono-sm uppercase text-[#1c1c1a] font-bold">
                Manuscript / Sample Puzzle PDF Upload
              </label>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="group relative bg-[#f6f3ef] p-6 border-2 border-dashed border-[#1c1c1a] flex flex-col items-center justify-center text-center cursor-pointer transition-colors hover:bg-[#f0edea]"
              >
                <input
                  type="file"
                  accept=".pdf,.tiff,.zip,.doc,.txt"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="w-12 h-12 bg-white border border-[#dec0b4] shadow-sm flex items-center justify-center text-[#9e3d00] group-hover:scale-110 transition-transform mb-2">
                  <span className="material-symbols-outlined text-[28px]">upload_file</span>
                </div>
                <span className="font-headline-sm text-headline-sm text-[#1c1c1a] font-semibold mb-1">
                  Drop manuscript folio or puzzle plates here
                </span>
                <span className="font-label-mono-sm text-label-mono-sm text-[#574239] uppercase tracking-wider">
                  PDF or TIFF sample plates under 25MB • Or click to browse postal pouch
                </span>
                {attachedFileName && (
                  <div className="mt-3 font-label-mono-sm text-label-mono-sm text-[#456553] font-bold bg-[#c7ebd4] px-3 py-1 border border-[#456553]">
                    ✓ Folio Registered: {attachedFileName}
                  </div>
                )}
              </div>
            </div>

            {/* Submission Dispatch Button */}
            <div className="pt-4 border-t border-[#dec0b4] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[#574239] font-label-mono-sm text-label-mono-sm">
                <span className="material-symbols-outlined text-[#456553] text-[20px]">local_shipping</span>
                <span>TRANSMITTED VIA ENCRYPTED TELEGRAPH DISPATCH</span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#9e3d00] hover:bg-[#c15316] text-white font-label-mono-md text-label-mono-md uppercase tracking-widest font-bold shadow-[4px_4px_0px_0px_#1c1c1a] active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Transmitting telegraph...' : "Transmit Folio to Ms. Dee's Desk"}</span>
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </form>

          {/* Telegraph Confirmation Slip */}
          {submittedManifestId && (
            <div className="mt-8 bg-[#ffffff] p-8 border-2 border-[#1c1c1a] shadow-[6px_6px_0px_0px_#1c1c1a] text-center animate-fadeIn">
              <div className="w-16 h-16 bg-[#c7ebd4] text-[#002113] mx-auto flex items-center justify-center mb-3 border border-[#456553]">
                <span className="material-symbols-outlined text-[36px]">mark_email_read</span>
              </div>
              <div className="inline-block px-3 py-1 bg-[#456553] text-white font-label-mono-sm text-label-mono-sm uppercase mb-2 font-bold">
                [TELEGRAPH SENT • RECEIVED AT VERONA DISPATCH]
              </div>
              <h3 className="font-headline-lg text-headline-lg text-[#1c1c1a] mb-2 font-bold">
                Your Transit Dispatch is Registered
              </h3>
              <p className="font-body-lg text-body-lg text-[#574239] max-w-lg mx-auto mb-4 leading-relaxed">
                A physical receipt (Manifest: <strong>{submittedManifestId}</strong>) has been routed to our reading desk at Platform 04. Ms. Dee will inspect your sample plates within 14 rail days. Keep your train ticket handy.
              </p>
              <button
                onClick={() => {
                  setSubmittedManifestId(null);
                  setManuscriptTitle('');
                  setPitch('');
                  setAttachedFileName(null);
                }}
                className="font-label-mono-sm text-label-mono-sm uppercase text-[#9e3d00] hover:underline tracking-wider font-bold cursor-pointer"
                type="button"
              >
                ← Log Another Carriage Dispatch
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Editorial Production FAQ & Railway Timetable */}
      <section className="w-full px-4 sm:px-6 py-16 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar context */}
            <div className="lg:col-span-4">
              <span className="font-label-mono-sm text-label-mono-sm uppercase tracking-widest text-[#456553] font-bold">
                SECTION IV • CLERK INQUIRIES
              </span>
              <h2 className="font-headline-lg text-headline-lg text-[#1c1c1a] mt-1 mb-4 font-bold">
                Production Questions & Railway Schedule
              </h2>
              <p className="font-body-md text-body-md text-[#574239] mb-6 leading-relaxed">
                Publishing slow physical print requires clear, patient milestones. Here is how manuscripts travel from digital ledger submission to printed station release.
              </p>

              {/* Small Postal Badge */}
              <div className="bg-[#f0edea] p-4 border border-[#dec0b4] shadow-sm">
                <div className="flex items-center gap-1.5 text-[#9e3d00] font-label-mono-sm text-label-mono-sm uppercase font-bold mb-1">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  HAND-NUMBERED GUARANTEE
                </div>
                <p className="font-body-sm text-body-sm text-[#574239]">
                  Every ORMA run contains a unique hand-stamped transit index card signed by the typesetter and creator prior to postal sealing.
                </p>
              </div>
            </div>

            {/* FAQ accordion list */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="bg-[#f6f3ef] p-6 border border-[#dec0b4] shadow-sm">
                <h3 className="font-headline-sm text-headline-sm text-[#1c1c1a] mb-2 flex items-center justify-between font-bold">
                  <span>How long until you review my dispatch?</span>
                  <span className="font-label-mono-sm text-label-mono-sm uppercase text-[#456553] font-bold">
                    14 Rail Days
                  </span>
                </h3>
                <p className="font-body-md text-body-md text-[#574239] leading-relaxed">
                  All submissions are printed out onto proof newsprint and read away from computer monitors. We guarantee a thoughtful personal reply from Ms. Dee or one of our resident editors within 14 days of telegraph arrival. We do not use automated rejection letters.
                </p>
              </div>

              <div className="bg-[#f6f3ef] p-6 border border-[#dec0b4] shadow-sm">
                <h3 className="font-headline-sm text-headline-sm text-[#1c1c1a] mb-2 flex items-center justify-between font-bold">
                  <span>Do I need finished artwork or type-set layouts?</span>
                  <span className="font-label-mono-sm text-label-mono-sm uppercase text-[#9e3d00] font-bold">
                    Concept First
                  </span>
                </h3>
                <p className="font-body-md text-body-md text-[#574239] leading-relaxed">
                  Not at all. If you are a writer or puzzle creator who works in plain text, notebook drawings, or grid spreadsheets, our studio layout artisans will collaborate with you to craft the typography, bespoke icons, and plate separations suitable for letterpress and Risograph printing.
                </p>
              </div>

              <div className="bg-[#f6f3ef] p-6 border border-[#dec0b4] shadow-sm">
                <h3 className="font-headline-sm text-headline-sm text-[#1c1c1a] mb-2 flex items-center justify-between font-bold">
                  <span>What print volume do you produce per run?</span>
                  <span className="font-label-mono-sm text-label-mono-sm uppercase text-[#1c1c1a] font-bold">
                    300 – 1,000 Copies
                  </span>
                </h3>
                <p className="font-body-md text-body-md text-[#574239] leading-relaxed">
                  Our standard first editions are limited to between 300 and 1,000 numbered artifacts. This guarantees rapid sell-through across our indie kiosk network, keeps printing quality immaculate, and allows immediate profit payout to creators before a second impression is scheduled.
                </p>
              </div>

              <div className="bg-[#f6f3ef] p-6 border border-[#dec0b4] shadow-sm">
                <h3 className="font-headline-sm text-headline-sm text-[#1c1c1a] mb-2 flex items-center justify-between font-bold">
                  <span>Can I submit collaborative works with a cartographer or illustrator?</span>
                  <span className="font-label-mono-sm text-label-mono-sm uppercase text-[#456553] font-bold">
                    Collaborations Welcomed
                  </span>
                </h3>
                <p className="font-body-md text-body-md text-[#574239] leading-relaxed">
                  Yes. Many of our most celebrated compendiums pair an enigma designer with a botanical artist or train map draughtsman. Simply note both creators in your telegraph handle, and our covenant will split the creator share equally between both contributors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
