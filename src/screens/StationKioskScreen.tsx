import React, { useState } from 'react';
import { ScreenId, CartItem } from '../types';
import { EditableText } from '../components/admin/EditableText';
import { EditableImage } from '../components/admin/EditableImage';


interface StationKioskScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
}

type JourneyType = 'short' | 'medium' | 'long' | 'indefinite';

interface JourneyRecommendation {
  duration: string;
  tag: string;
  title: string;
  desc: string;
  binding: string;
  extent: string;
  price: number;
  image: string;
}

const JOURNEY_DATA: Record<JourneyType, JourneyRecommendation> = {
  short: {
    duration: '20–45 MINS',
    tag: 'CIPHER SLIP • ACCORDION FOLD',
    title: 'The Subway Commute Mini Enigma',
    desc: 'Designed for high-frequency stop-and-go travel. A palm-sized 6-panel accordion fold with bite-sized word ladders and Caesar shifts solvable between stations.',
    binding: 'Saddle stitch',
    extent: '6 PANELS',
    price: 8.0,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA9LJdhTUKuPr5HpnIUt5U7EKqBMtAzUB9_KwuBE5uE8UW9rQYjbZ_72ZyhSUnDWkfKbXKACOjIfvw1bmKQFX_mcNiCN6_nDgU13-_RirT6wzRf4D3H_GoVhdfDcrcR38j1HvSHcqI5-Qu1TCk78lbq6SSoXgRVsoe64sAvqrxoYxgVkf41vCAX2fwl8x2cX-DzoislkHF7YJXWG_kBmzBD8vYOtA57vhSMzOW7FxkpGlCJncPfdy4D4w',
  },
  medium: {
    duration: '1–2 HOURS',
    tag: 'VOLUME 03 • SADDLE-STITCH',
    title: 'The Continental Café Enigma Slip',
    desc: 'Engineered to slip comfortably into an overcoat pocket. Contains 18 themed railway crosswords and four progressive substitution ciphers solvable in unhurried 20-minute sittings.',
    binding: 'SADDLE-STITCH',
    extent: '48 PAGES',
    price: 16.0,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDm8ZWkaaor7WnBXa4c6fTr1UtNKX76yu-iwt3AxvptdN0lSeJBVLZEvY9MWkc1oFisJZ2as-ZEJsKeCuNzeSlVuuQtL-1Ptad6VUX3ZH1PN_WdFif5YTpjj4dIqqHQCeZdN3usHQwpAPV4prENvD83h1cR2L0-XMy8cQEk7CdQ84y6k1Wgh6c7qCJmvCK5eVyW017_INJyR1P1V_aunjOc2sN0UI9X0bYQG-kpU02NX-732Yh7kmdHmQ',
  },
  long: {
    duration: '4+ HOURS',
    tag: 'COLLECTOR HARDCOVER • VOL. 01',
    title: 'The Trans-Continental Caesar Sleeper',
    desc: 'A massive, heirloom-grade compendium bound in linen cloth. Packed with multi-layered code wheels, telegraph transcripts, and 180 pages of deep cryptanalysis.',
    binding: 'SMYTH SEWN CLOTH',
    extent: '240 PAGES',
    price: 32.0,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCOvpMB1zZt0M3ff3u62FvKfc7tR8tA_lqd6rIWTs2K7ZvMfoPB9WjTymu_VLkZQaKZ8Zu9PZSJIKFGnClmVeWjTBLxH3zKm6-pr5iGJ_tfaHhVcsBXqwUc2Ku7fa7YcH7dhiXYH3b-0WSXDRHQht5EUkchZSxmFI14laU8KPPBu68z3DUE6fg_vBW2AEASa-NO6ntdYsqyNBuLmWB4iGmg1BAxmXXvu8RteWoFHVLzdVh-hZk9o2FlGQ',
  },
  indefinite: {
    duration: 'INDEFINITE WAIT',
    tag: 'SPECIAL FOLIO • STATION DELAY',
    title: 'The Delayed Departure Mystery Box',
    desc: 'When trains are cancelled and rain strikes the canopy. Includes 3 standalone dossier files, sealed evidence envelopes, and 12 intricate logic deduction matrices.',
    binding: 'PORTFOLIO SLEEVE',
    extent: '84 LOOSE SHEETS',
    price: 28.0,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB-6yeJvrp2qzpt-E-mtpP5Ms4IUeJ2u9DVU9qy3EZhz-mPDbxCVcfvlKZ7m9KfCsGqf3ls2sD8NUAY43y-ORnrrn7uEJFDGFteXDZE3fBxjo5y7uuDvXZo1j7ZxC6lhAhzxta9l4s6rPEJdM85vfNNn8N80m_YrrYFfW6BVmcCx9MmqwEQ87NEZ4ukUqkMnkpzx9s3yNyJVQ6tFJtFp--nWPlNTy81LJ0qHD1i2xPKoFbzkPTz-IVqdw',
  },
};

export const StationKioskScreen: React.FC<StationKioskScreenProps> = ({
  onNavigate,
  onAddToCart,
}) => {
  const [selectedJourney, setSelectedJourney] = useState<JourneyType>('medium');
  const [packFeedback, setPackFeedback] = useState(false);
  const [claimedStatus, setClaimedStatus] = useState<Record<string, boolean>>({});
  const [remainingRunCounts, setRemainingRunCounts] = useState({
    run1: 142,
    run2: 89,
    run3: 56,
  });

  const currentRec = JOURNEY_DATA[selectedJourney];

  const handlePackRecommended = () => {
    onAddToCart({
      id: `rec-${selectedJourney}`,
      title: currentRec.title,
      price: currentRec.price,
      image: currentRec.image,
      tag: currentRec.tag,
      binding: currentRec.binding,
    });
    setPackFeedback(true);
    setTimeout(() => setPackFeedback(false), 2000);
  };

  const handleClaimRun = (
    key: 'run1' | 'run2' | 'run3',
    itemData: { id: string; title: string; price: number; image: string; tag: string }
  ) => {
    onAddToCart(itemData);
    setClaimedStatus((prev) => ({ ...prev, [key]: true }));
    setRemainingRunCounts((prev) => ({
      ...prev,
      [key]: Math.max(1, prev[key] - 1),
    }));
    setTimeout(() => {
      setClaimedStatus((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO (Station Kiosk & Continental Train Compartment) */}
      <section className="relative w-full overflow-hidden bg-[#f6f3ef] px-4 sm:px-6 py-12 md:py-16 border-b border-[#dec0b4]/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          {/* Left Column: Editorial & Departure Manifesto */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-4">
            {/* Archival Overline Ledger Tag */}
            <div className="inline-flex items-center gap-2 bg-[#e5e2de] px-3 py-1 shadow-sm border border-[#dec0b4]">
              <span className="w-2 h-2 rounded-full bg-[#9e3d00] shrink-0 animate-ping"></span>
              <EditableText
                id="hero_dispatch_tag"
                defaultText="EDITIONS DISPATCH • KIOSK BERTH NO. 04"
                className="font-label-mono-sm text-label-mono-sm uppercase text-[#1c1c1a] tracking-widest font-bold"
              />
            </div>

            <h1 className="font-display-hero text-[#1c1c1a] tracking-tight leading-[1.08] max-w-2xl">
              <EditableText
                id="hero_brand_h1"
                defaultText="ORMA EDITIONS"
                as="span"
                className="block text-2xl sm:text-3xl md:text-4xl uppercase tracking-wider text-[#9e3d00] font-bold font-headline-sm mb-2"
              />
              <EditableText
                id="hero_tagline"
                defaultText="Objects for the quiet in-between."
                as="span"
                className="inline"
              />
            </h1>

            <EditableText
              id="hero_lead_text"
              as="p"
              defaultText="Printed puzzle compendiums, cipher books, and tactile zines created for trains, delayed departures, café benches, and unhurried afternoons without screens."
              className="font-body-lg text-body-lg text-[#574239] max-w-xl leading-relaxed"
            />

            {/* CTAs & Ticket Perforations */}
            <div className="pt-4 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              {/* Ticket-stub style primary action */}
              <button
                onClick={() => onNavigate('editions-and-archive')}
                className="group relative inline-flex items-center justify-between gap-4 bg-[#9e3d00] text-[#ffffff] font-label-mono-lg text-label-mono-lg px-6 py-3.5 shadow-[4px_4px_0px_0px_#1c1c1a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#1c1c1a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer font-bold"
              >
                <EditableText
                  id="hero_cta_inspect"
                  defaultText="INSPECT EDITIONS [VOL. 01–06]"
                  className="tracking-wider"
                />
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
                {/* Perforation notches at top/bottom edges */}
                <div className="absolute -top-1.5 left-1/3 w-3 h-3 bg-[#f6f3ef] rounded-full border-b border-[#1c1c1a]"></div>
                <div className="absolute -bottom-1.5 left-1/3 w-3 h-3 bg-[#f6f3ef] rounded-full border-t border-[#1c1c1a]"></div>
              </button>

              <a
                className="font-label-mono-md text-label-mono-md uppercase tracking-wider text-[#1c1c1a] underline underline-offset-8 decoration-[#9e3d00] decoration-2 hover:text-[#9e3d00] transition-colors py-2 cursor-pointer font-bold"
                href="#makers-note"
              >
                <EditableText
                  id="hero_cta_makers_note"
                  defaultText="Read Ms. Dee’s Maker’s Note ↓"
                />
              </a>
            </div>

            {/* Ledger Micro-Specs */}
            <div className="pt-6 grid grid-cols-3 gap-4 w-full max-w-lg text-[#574239] font-label-mono-sm text-label-mono-sm uppercase bg-[#f0edea]/80 p-3 shadow-sm border border-[#dec0b4]">
              <div>
                <div className="text-[#1c1c1a] font-bold">TYPEFACE</div>
                <EditableText
                  id="hero_spec_typeface_val"
                  defaultText="VERONA COLD TYPE"
                />
              </div>
              <div>
                <div className="text-[#1c1c1a] font-bold">PAPER STOCK</div>
                <EditableText
                  id="hero_spec_paper_val"
                  defaultText="120 GSM UNBLEACHED"
                />
              </div>
              <div>
                <div className="text-[#1c1c1a] font-bold">OFFLINE ONLY</div>
                <EditableText
                  id="hero_spec_offline_val"
                  defaultText="NO QR CODES"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Archival Tactile Visual & Ticket Stamped Card */}
          <div className="lg:col-span-5 relative">
            {/* Visual Frame with Hard Letterpress Offset */}
            <div className="relative bg-[#ffffff] p-4 shadow-[6px_6px_0px_0px_#1c1c1a] border-2 border-[#1c1c1a] transition-all">
              {/* Tactile Image */}
              <div className="relative w-full h-[360px] overflow-hidden bg-[#f0edea]">
                <EditableImage
                  id="hero_still_life_img"
                  defaultSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCpt4uPaofYvtj-hD4CI1vOIi_4imKlcW23jGOGONtFBnU6lsgtfc2P_fI2FuNkThlsbnAgltAf8U1u2cX9XGvjIDiHtVpBSu1eYSPOWaCTk2bsFpt4jOOCKWHX3E_VH6WuFVgJlYNjQFrT8VEZKgLjq2sgU4KKi6oJmmWe9Pdd7Unp4E5MHhx6W2O47k74QhkXiWwFhWwDAkgyxMBIOLP2OgjJZ6Cf23np34xMWhC_Scc3GXHJ7n6CJw"
                  alt="Editorial still life photograph of an unbleached open railway crossword compendium"
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover"
                />

                {/* Monospace Ticket Stamp floating over visual */}
                <div className="absolute top-4 right-4 bg-[#ffffff]/95 backdrop-blur-sm p-3 shadow-[3px_3px_0px_0px_#1c1c1a] border border-[#1c1c1a] rotate-2 z-10 pointer-events-auto">
                  <div className="flex items-center gap-1.5 text-[#9e3d00] font-label-mono-sm text-label-mono-sm font-bold tracking-widest uppercase">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    <EditableText
                      id="hero_journey_badge"
                      defaultText="JOURNEY TIME: 3H 45M"
                    />
                  </div>
                  <div className="text-[10px] font-label-mono-sm text-[#574239] uppercase mt-0.5">
                    <EditableText
                      id="hero_route_line"
                      defaultText="MILANO CENTRALE → ZÜRICH HB"
                    />
                  </div>
                </div>

                {/* Inked Corner Station Master Stamp */}
                <div className="absolute -bottom-2 -left-2 bg-[#456553] text-[#ffffff] px-3 py-1 font-label-mono-sm text-label-mono-sm uppercase tracking-widest -rotate-3 shadow-md border border-[#1c1c1a] z-10 pointer-events-auto">
                  <EditableText
                    id="hero_stamp_text"
                    defaultText="OFFICIAL VERONA PRESS"
                  />
                </div>
              </div>

              {/* Bottom Ledger Strip on the card */}
              <div className="mt-3 pt-2 border-t border-[#dec0b4] flex items-center justify-between font-label-mono-sm text-label-mono-sm text-[#574239] uppercase">
                <EditableText
                  id="hero_plate_log"
                  defaultText="PLATE 014 // DISPATCH LOG"
                />
                <EditableText
                  id="hero_series_year"
                  defaultText="SERIES 2025"
                  className="font-bold text-[#1c1c1a]"
                />
              </div>
            </div>

            {/* Decorative background transit grid shadow block */}
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-[#c7ebd4]/50 -z-10 border border-[#dec0b4]"></div>
          </div>
        </div>
      </section>

      {/* SECTION 2: MS. DEE'S MAKER'S NOTE (Framed Station Memorandum) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20" id="makers-note">
        <div className="relative bg-[#f0edea] p-6 md:p-10 shadow-[4px_4px_0px_0px_#1c1c1a] border-2 border-[#1c1c1a]">
          {/* Top Memorandum Header Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-2 bg-[#ebe8e4] p-3 mb-6 shadow-sm border border-[#dec0b4]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#a83029]"></span>
              <EditableText
                id="makers_note_memo_tag"
                defaultText="STATION ARCHIVE / FOUNDING DISPATCH • MEMO NO. 01"
                className="font-label-mono-sm text-label-mono-sm uppercase font-bold tracking-widest text-[#1c1c1a]"
              />
            </div>
            <div className="font-label-mono-sm text-label-mono-sm uppercase tracking-wider text-[#574239] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">local_post_office</span>
              <EditableText
                id="makers_note_registry"
                defaultText="POSTAL REGISTRY: MILANO • WRITTEN IN TRANSIT"
              />
            </div>
          </div>

          {/* Main Quote Body & Woodcut Illustration Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Verbatim Quote Block */}
            <div className="lg:col-span-8 flex flex-col space-y-4">
              <EditableText
                id="makers_note_quote"
                as="blockquote"
                defaultText="“ORMA was born in the particular stillness of a long journey.”"
                className="font-headline-md text-headline-md text-[#1c1c1a] leading-snug tracking-tight font-semibold"
              />

              <div className="space-y-4 font-body-lg text-body-lg text-[#574239] leading-relaxed">
                <EditableText
                  id="makers_note_p1"
                  as="p"
                  defaultText="I grew up travelling. Trains mostly, sometimes buses — long hours with my family, watching the landscape change outside the window. My mother always had something to read. So did we. Somewhere along the way, the bookstalls at stations started disappearing. The vendors who boarded trains with stacks of books stopped coming. And everyone started looking at their phones instead."
                />
                <EditableText
                  id="makers_note_p2"
                  as="p"
                  defaultText="ORMA Editions are my answer to that disappearance. For the train, the café, the wait, the quiet in-between moments that don’t need a screen."
                  className="font-body-md text-body-md text-[#1c1c1a]"
                />
              </div>

              {/* Editorial Signature Line */}
              <div className="pt-4 flex items-center justify-between border-t border-[#dec0b4]/60">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#9e3d00] text-[#ffffff] flex items-center justify-center font-title-editorial text-title-editorial italic font-bold shadow-sm">
                    Dee
                  </div>
                  <div>
                    <EditableText
                      id="makers_note_author_name"
                      defaultText="Ms. Dee"
                      className="font-label-mono-md text-label-mono-md font-bold uppercase tracking-wider text-[#1c1c1a] block"
                    />
                    <EditableText
                      id="makers_note_author_role"
                      defaultText="Founder & Editor, ORMA Compendiums"
                      className="font-label-mono-sm text-label-mono-sm uppercase text-[#574239] block"
                    />
                  </div>
                </div>

                {/* Inked Seal */}
                <div className="hidden sm:flex flex-col items-center justify-center w-24 h-24 rounded-full bg-[#e5e2de] border border-[#dec0b4] shadow-inner rotate-[-6deg] p-1">
                  <div className="text-[9px] font-label-mono-sm font-bold text-[#a83029] text-center uppercase tracking-tighter leading-tight">
                    VERONA PRINT
                    <br />
                    OFFLINE SOLACE
                    <br />• EST. 2024 •
                  </div>
                </div>
              </div>
            </div>

            {/* Woodcut / Window Vignette Graphic */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative w-full max-w-sm bg-[#ffffff] p-3 shadow-[4px_4px_0px_0px_#1c1c1a] border-2 border-[#1c1c1a]">
                {/* Stylized Train Window SVG Vignette with Telegraph Wire Lines */}
                <div className="w-full h-64 bg-[#f6f3ef] flex flex-col items-center justify-center relative overflow-hidden border border-[#dec0b4]">
                  <svg className="w-full h-full text-[#456553]" preserveAspectRatio="none" viewBox="0 0 400 300">
                    <path
                      d="M0,220 Q120,180 240,210 T400,190 L400,300 L0,300 Z"
                      fill="currentColor"
                      fillOpacity="0.18"
                    ></path>
                    <path
                      d="M0,250 Q160,210 280,240 T400,230 L400,300 L0,300 Z"
                      fill="currentColor"
                      fillOpacity="0.3"
                    ></path>
                    <line stroke="#1c1c1a" strokeWidth="2" x1="60" x2="60" y1="120" y2="240"></line>
                    <line stroke="#1c1c1a" strokeWidth="2" x1="45" x2="75" y1="135" y2="135"></line>
                    <line stroke="#1c1c1a" strokeWidth="2" x1="220" x2="220" y1="145" y2="240"></line>
                    <line stroke="#1c1c1a" strokeWidth="2" x1="205" x2="235" y1="158" y2="158"></line>
                    <line stroke="#1c1c1a" strokeWidth="2" x1="360" x2="360" y1="165" y2="240"></line>
                    <line stroke="#1c1c1a" strokeWidth="2" x1="350" x2="370" y1="175" y2="175"></line>
                    <path
                      d="M45,135 Q130,165 205,158 T350,175"
                      fill="none"
                      stroke="#1c1c1a"
                      strokeDasharray="3,2"
                      strokeWidth="1.2"
                    ></path>
                    <path
                      d="M75,135 Q145,170 235,158 T370,175"
                      fill="none"
                      stroke="#1c1c1a"
                      strokeWidth="1"
                    ></path>
                    <rect fill="none" height="270" rx="20" stroke="#1c1c1a" strokeWidth="6" width="370" x="15" y="15"></rect>
                    <rect fill="none" height="254" rx="14" stroke="#dec0b4" strokeWidth="2" width="354" x="23" y="23"></rect>
                  </svg>
                  <div className="absolute bottom-2 left-4 text-[10px] font-label-mono-sm text-[#1c1c1a] uppercase tracking-widest bg-white/90 px-1 border border-[#dec0b4]">
                    WINDOW 3B • BOLOGNA LINE
                  </div>
                </div>
                <div className="text-center font-label-mono-sm text-label-mono-sm uppercase text-[#574239] pt-2">
                  <EditableText
                    id="makers_note_window_caption"
                    defaultText="FIG. 01 — THE PASSING WIRESCAPE"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE JOURNEY TIME CALCULATOR (Transit Companion Picker) */}
      <section className="w-full bg-[#ebe8e4] py-16 md:py-20 px-4 sm:px-6 border-y border-[#dec0b4]">
        <div className="max-w-7xl mx-auto">
          {/* Section Title & Subheader */}
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-1 bg-[#ffffff] text-[#9e3d00] font-label-mono-sm text-label-mono-sm uppercase px-2 py-0.5 tracking-wider mb-2 border border-[#dec0b4]">
              <EditableText
                id="compass_badge"
                defaultText="INTERACTIVE ROUTE COMPASS"
              />
            </div>
            <EditableText
              id="compass_title"
              as="h2"
              defaultText="How long is your journey today?"
              className="font-headline-lg text-headline-lg text-[#1c1c1a] tracking-tight block"
            />
            <EditableText
              id="compass_subtitle"
              as="p"
              defaultText="Select your transit window to reveal the compendium format engineered precisely for that duration."
              className="font-body-md text-body-md text-[#574239] mt-1 block"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Ticket Selectors */}
            <div className="lg:col-span-7 flex flex-col space-y-3">
              {/* Option 1: 20-45 Mins */}
              <div
                onClick={() => setSelectedJourney('short')}
                className={`p-4 transition-all flex items-center justify-between border-2 border-[#1c1c1a] cursor-pointer ${
                  selectedJourney === 'short'
                    ? 'bg-[#e5e2de] shadow-[5px_5px_0px_0px_#1c1c1a] translate-x-1'
                    : 'bg-[#ffffff] shadow-[3px_3px_0px_0px_#1c1c1a] hover:translate-x-1'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="font-label-mono-lg text-label-mono-lg font-bold text-[#9e3d00]">01</span>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-[#1c1c1a] font-semibold">
                      20–45 Mins: The Subway Commute
                    </h3>
                    <p className="font-body-sm text-body-sm text-[#574239]">
                      Quick Cipher Sheets • Mini Word Grids • Pocket single-fold newsprint
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#9e3d00] text-[24px]">tram</span>
              </div>

              {/* Option 2: 1-2 Hours (Selected by default) */}
              <div
                onClick={() => setSelectedJourney('medium')}
                className={`p-4 transition-all flex items-center justify-between border-2 border-[#1c1c1a] cursor-pointer ${
                  selectedJourney === 'medium'
                    ? 'bg-[#e5e2de] shadow-[5px_5px_0px_0px_#1c1c1a] translate-x-1'
                    : 'bg-[#ffffff] shadow-[3px_3px_0px_0px_#1c1c1a] hover:translate-x-1'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="font-label-mono-lg text-label-mono-lg font-bold text-[#9e3d00]">02</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-headline-sm text-headline-sm text-[#1c1c1a] font-semibold">
                        1–2 Hours: The Café Afternoon
                      </h3>
                      <span className="bg-[#9e3d00] text-[#ffffff] font-label-mono-sm text-[10px] px-1.5 uppercase tracking-widest font-bold">
                        RECOMMENDED
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-[#574239]">
                      Pocket Saddle-Stitch Zines • Vol. 03 Crosswords • 48 Pages
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#9e3d00] text-[24px]">local_cafe</span>
              </div>

              {/* Option 3: 4+ Hours */}
              <div
                onClick={() => setSelectedJourney('long')}
                className={`p-4 transition-all flex items-center justify-between border-2 border-[#1c1c1a] cursor-pointer ${
                  selectedJourney === 'long'
                    ? 'bg-[#e5e2de] shadow-[5px_5px_0px_0px_#1c1c1a] translate-x-1'
                    : 'bg-[#ffffff] shadow-[3px_3px_0px_0px_#1c1c1a] hover:translate-x-1'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="font-label-mono-lg text-label-mono-lg font-bold text-[#9e3d00]">03</span>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-[#1c1c1a] font-semibold">
                      4+ Hours: The Cross-Country Sleeper
                    </h3>
                    <p className="font-body-sm text-body-sm text-[#574239]">
                      The Hardcover Lay-Flat Compendium • 240 Heavy Pages • Multi-tier ciphers
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#9e3d00] text-[24px]">bed</span>
              </div>

              {/* Option 4: Indefinite Wait */}
              <div
                onClick={() => setSelectedJourney('indefinite')}
                className={`p-4 transition-all flex items-center justify-between border-2 border-[#1c1c1a] cursor-pointer ${
                  selectedJourney === 'indefinite'
                    ? 'bg-[#e5e2de] shadow-[5px_5px_0px_0px_#1c1c1a] translate-x-1'
                    : 'bg-[#ffffff] shadow-[3px_3px_0px_0px_#1c1c1a] hover:translate-x-1'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="font-label-mono-lg text-label-mono-lg font-bold text-[#9e3d00]">04</span>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-[#1c1c1a] font-semibold">
                      Indefinite Wait: The Station Delay
                    </h3>
                    <p className="font-body-sm text-body-sm text-[#574239]">
                      Enigmas, Polyalphabetic Ciphers • Archival Railway Mystery Suite
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#9e3d00] text-[24px]">hourglass_empty</span>
              </div>
            </div>

            {/* Right 5 Cols: Dynamic Recommendation Card Preview */}
            <div className="lg:col-span-5 bg-[#ffffff] p-6 shadow-[6px_6px_0px_0px_#1c1c1a] border-2 border-[#1c1c1a] relative">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#dec0b4]">
                <span className="font-label-mono-sm text-label-mono-sm uppercase text-[#456553] font-bold tracking-widest flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#456553]"></span> RECOMMENDED ARTIFACT
                </span>
                <span className="font-label-mono-sm text-label-mono-sm uppercase text-[#574239]">
                  {currentRec.duration}
                </span>
              </div>

              {/* Dynamic Artifact Image & Details */}
              <div className="h-44 w-full bg-[#f0edea] relative mb-4 overflow-hidden border border-[#dec0b4]">
                <img
                  className="w-full h-full object-cover"
                  alt={currentRec.title}
                  src={currentRec.image}
                />
                <div className="absolute bottom-2 left-2 bg-[#1c1c1a] text-[#ffffff] font-label-mono-sm text-[11px] px-2 py-0.5 font-bold">
                  {currentRec.tag}
                </div>
              </div>

              <h3 className="font-headline-md text-headline-md text-[#1c1c1a] leading-snug mb-1 font-bold">
                {currentRec.title}
              </h3>

              <p className="font-body-md text-body-md text-[#574239] mb-4">
                {currentRec.desc}
              </p>

              {/* Archival Specifications Ledger */}
              <div className="grid grid-cols-2 gap-2 font-label-mono-sm text-label-mono-sm uppercase bg-[#f6f3ef] p-3 mb-4 border border-[#dec0b4]">
                <div>
                  <span className="text-[#574239]">BINDING:</span>
                  <span className="text-[#1c1c1a] font-bold ml-1">{currentRec.binding}</span>
                </div>
                <div>
                  <span className="text-[#574239]">EXTENT:</span>
                  <span className="text-[#1c1c1a] font-bold ml-1">{currentRec.extent}</span>
                </div>
                <div>
                  <span className="text-[#574239]">PENCIL GRADE:</span>
                  <span className="text-[#1c1c1a] font-bold ml-1">2B OR HB</span>
                </div>
                <div>
                  <span className="text-[#574239]">PRICE:</span>
                  <span className="text-[#9e3d00] font-bold ml-1">${currentRec.price.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePackRecommended}
                className="w-full bg-[#1c1c1a] hover:bg-[#9e3d00] text-[#ffffff] font-label-mono-md text-label-mono-md uppercase py-3 px-4 flex items-center justify-center gap-2 transition-colors shadow-sm font-bold tracking-wider cursor-pointer"
                type="button"
              >
                <span>{packFeedback ? 'PACKED INTO BAG ✓' : 'PACK INTO CARRIAGE BAG'}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CURRENT PRINT RUN (Curated Carousel / Card Grid) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        {/* Header with Live Stock Monospace Feed */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 gap-4 border-b border-[#dec0b4]">
          <div>
            <EditableText
              id="print_run_tag"
              defaultText="CURRENT STATION PRESSWORK"
              className="font-label-mono-sm text-label-mono-sm uppercase tracking-widest text-[#9e3d00] font-bold block"
            />
            <EditableText
              id="print_run_title"
              as="h2"
              defaultText="The Current Print Run"
              className="font-headline-lg text-headline-lg text-[#1c1c1a] tracking-tight mt-1 font-bold block"
            />
          </div>
          <div className="flex items-center gap-2 font-label-mono-sm text-label-mono-sm uppercase bg-[#f0edea] px-3 py-1.5 shadow-sm border border-[#dec0b4]">
            <span className="w-2 h-2 rounded-full bg-[#456553]"></span>
            <EditableText
              id="print_run_dispatch_status"
              defaultText="VERONA WORKSHOP DISPATCH: ACTIVE"
              className="text-[#1c1c1a] font-bold"
            />
          </div>
        </div>

        {/* 3 Featured Editions Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* EDITION 01 */}
          <article className="bg-[#ffffff] p-4 shadow-[4px_4px_0px_0px_#1c1c1a] border-2 border-[#1c1c1a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#1c1c1a] transition-all flex flex-col justify-between">
            <div>
              <div className="relative h-56 w-full bg-[#f0edea] overflow-hidden mb-4 border border-[#dec0b4]">
                <EditableImage
                  id="run1_img"
                  defaultSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuDKMqcsdCOxSMKe5XEyVsisWhPF3roQC0NM1Q7JB0DE6qjrz9gzccbXXGtwMV9uJ3W9F0EIcnV1KVNMpGld1XMwHYAvw7pBAUrk3pS-jaqGaxn9BkLUli0u62IHwLBOlaG0lFSEqbsfEHs2oak6UDrtDUu_AHLqJVfIlKQ0F5Yn98FrwHXB_xTBiVqTM32PF-3xYeloS7wIlO3qAUHLZSGqOezE1QCXOGJQO_FcLDBS0prS81kYm7-LEQ"
                  alt="Photograph of Volume I book cover titled The Trans-Continental Caesar Cipher"
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-white text-[#1c1c1a] font-label-mono-sm text-[10px] px-2 py-0.5 shadow-sm font-bold border border-[#dec0b4] z-10 pointer-events-auto">
                  VOL. 01 • HARDCOVER
                </div>
                <div className="absolute bottom-2 right-2 bg-[#9e3d00] text-white font-label-mono-sm text-label-mono-sm px-2 py-0.5 font-bold shadow-sm z-10 pointer-events-auto">
                  $24.00
                </div>
              </div>

              <EditableText
                id="run1_title"
                as="h3"
                defaultText="The Trans-Continental Caesar Cipher"
                className="font-headline-sm text-headline-sm text-[#1c1c1a] font-semibold mb-1 leading-snug block"
              />
              <EditableText
                id="run1_desc"
                as="p"
                defaultText="180 pages of cascading polyalphabetic riddles matched with historical passenger train manifests from Paris to Istanbul."
                className="font-body-sm text-body-sm text-[#574239] mb-4 block"
              />
              <div className="font-label-mono-sm text-label-mono-sm uppercase text-[#574239] space-y-1 pb-4">
                <div className="flex justify-between">
                  <span>FORMAT:</span> <span className="text-[#1c1c1a] font-bold">GOLD FOIL / RAW CARD</span>
                </div>
                <div className="flex justify-between">
                  <span>EXTENT:</span> <span className="text-[#1c1c1a] font-bold">180 PAGES</span>
                </div>
                <div className="flex justify-between">
                  <span>CIPHER CLASS:</span> <span className="text-[#1c1c1a] font-bold">CAESAR & VIGENÈRE</span>
                </div>
              </div>
            </div>

            <div className="pt-2 bg-[#f6f3ef] p-2 border-t border-[#dec0b4]">
              <div className="font-label-mono-sm text-[11px] text-[#a83029] font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>[RUN 02: {remainingRunCounts.run1} COPIES REMAINING]</span>
                <span className="material-symbols-outlined text-[14px]">inventory_2</span>
              </div>
              <button
                onClick={() =>
                  handleClaimRun('run1', {
                    id: 'or-01',
                    title: 'The Trans-Continental Caesar Cipher',
                    price: 24.0,
                    image:
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuDKMqcsdCOxSMKe5XEyVsisWhPF3roQC0NM1Q7JB0DE6qjrz9gzccbXXGtwMV9uJ3W9F0EIcnV1KVNMpGld1XMwHYAvw7pBAUrk3pS-jaqGaxn9BkLUli0u62IHwLBOlaG0lFSEqbsfEHs2oak6UDrtDUu_AHLqJVfIlKQ0F5Yn98FrwHXB_xTBiVqTM32PF-3xYeloS7wIlO3qAUHLZSGqOezE1QCXOGJQO_FcLDBS0prS81kYm7-LEQ',
                    tag: 'VOL. 01 • HARDCOVER',
                  })
                }
                className="w-full bg-[#9e3d00] hover:bg-[#c15316] text-[#ffffff] font-label-mono-sm text-label-mono-sm uppercase py-2 tracking-wider transition-colors font-bold cursor-pointer"
                type="button"
              >
                {claimedStatus.run1 ? 'Copy Packed in Bag ✓' : 'Claim Edition Copy'}
              </button>
            </div>
          </article>

          {/* EDITION 02 */}
          <article className="bg-[#ffffff] p-4 shadow-[4px_4px_0px_0px_#1c1c1a] border-2 border-[#1c1c1a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#1c1c1a] transition-all flex flex-col justify-between">
            <div>
              <div className="relative h-56 w-full bg-[#f0edea] overflow-hidden mb-4 border border-[#dec0b4]">
                <EditableImage
                  id="run2_img"
                  defaultSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBISGYmFSPWxXKof71snFTCkAr86xncjWAY58PL0UQ9A2jQFNnZV1jANKSSHxYhN7QAyFNk4szzqnbrd0PcXSxTOCRZ-Uz8I5-HJIXoV6Wt4S4WDcg3Z_xmrBFaFxUGlxopzN6DQ2RpFHz_lW4S4UpJeUF3dpVqC1WmVsoHfmtTXm08uGvI914oxQvbsFiWDGI7yDZ5eHhAI4dGyl5HhNRMQI8z2cHD98a0gNpHcpe0xr9uaLU_Blt4qw"
                  alt="Photograph of Volume II Station Architecture Word Search book open flat"
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-white text-[#1c1c1a] font-label-mono-sm text-[10px] px-2 py-0.5 shadow-sm font-bold border border-[#dec0b4] z-10 pointer-events-auto">
                  VOL. 02 • LAY-FLAT
                </div>
                <div className="absolute bottom-2 right-2 bg-[#456553] text-white font-label-mono-sm text-label-mono-sm px-2 py-0.5 font-bold shadow-sm z-10 pointer-events-auto">
                  $22.00
                </div>
              </div>

              <EditableText
                id="run2_title"
                as="h3"
                defaultText="Station Architecture Word Search & Field Notes"
                className="font-headline-sm text-headline-sm text-[#1c1c1a] font-semibold mb-1 leading-snug block"
              />
              <EditableText
                id="run2_desc"
                as="p"
                defaultText="Word matrices nested directly into authentic terminal blueprints and platform schematics from Leipzig, Milano, and St. Pancras."
                className="font-body-sm text-body-sm text-[#574239] mb-4 block"
              />
              <div className="font-label-mono-sm text-label-mono-sm uppercase text-[#574239] space-y-1 pb-4">
                <div className="flex justify-between">
                  <span>FORMAT:</span> <span className="text-[#1c1c1a] font-bold">RISO GREEN INK / SPIRAL</span>
                </div>
                <div className="flex justify-between">
                  <span>EXTENT:</span> <span className="text-[#1c1c1a] font-bold">140 PAGES</span>
                </div>
                <div className="flex justify-between">
                  <span>PAPER:</span> <span className="text-[#1c1c1a] font-bold">140 GSM RECYCLED WHEAT</span>
                </div>
              </div>
            </div>

            <div className="pt-2 bg-[#f6f3ef] p-2 border-t border-[#dec0b4]">
              <div className="font-label-mono-sm text-[11px] text-[#456553] font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>[RUN 01: {remainingRunCounts.run2} COPIES REMAINING]</span>
                <span className="material-symbols-outlined text-[14px]">inventory_2</span>
              </div>
              <button
                onClick={() =>
                  handleClaimRun('run2', {
                    id: 'or-02',
                    title: 'Station Architecture Word Search & Field Notes',
                    price: 22.0,
                    image:
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuBISGYmFSPWxXKof71snFTCkAr86xncjWAY58PL0UQ9A2jQFNnZV1jANKSSHxYhN7QAyFNk4szzqnbrd0PcXSxTOCRZ-Uz8I5-HJIXoV6Wt4S4WDcg3Z_xmrBFaFxUGlxopzN6DQ2RpFHz_lW4S4UpJeUF3dpVqC1WmVsoHfmtTXm08uGvI914oxQvbsFiWDGI7yDZ5eHhAI4dGyl5HhNRMQI8z2cHD98a0gNpHcpe0xr9uaLU_Blt4qw',
                    tag: 'VOL. 02 • LAY-FLAT',
                  })
                }
                className="w-full bg-[#9e3d00] hover:bg-[#c15316] text-[#ffffff] font-label-mono-sm text-label-mono-sm uppercase py-2 tracking-wider transition-colors font-bold cursor-pointer"
                type="button"
              >
                {claimedStatus.run2 ? 'Copy Packed in Bag ✓' : 'Claim Edition Copy'}
              </button>
            </div>
          </article>

          {/* EDITION 03 (Zine 04) */}
          <article className="bg-[#ffffff] p-4 shadow-[4px_4px_0px_0px_#1c1c1a] border-2 border-[#1c1c1a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#1c1c1a] transition-all flex flex-col justify-between">
            <div>
              <div className="relative h-56 w-full bg-[#f0edea] overflow-hidden mb-4 border border-[#dec0b4]">
                <EditableImage
                  id="run3_img"
                  defaultSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCSH1PwlwwAuIYVtH38XMlT-gHD9LjFgQOjLt9QJWjID5zhL5JErq8Q6TtltJnuum8uR6ornv0s9VghgQRi0s4_YKIUbrfolJKd65TMQ8bRWbSJixtkQopuLsCOdC-7vw9FoXV-NuqVEAvliDri0YFV2J43IglnGcO3Tm_3meXwmKUU2lgtLD2Nhs05M0AxeyQGFxjFlU4d3sOCdrN3YUj07rsdebEVBS4zy0S9em5TbID0wYoKa02TdA"
                  alt="Editorial overhead macro view of Zine 04 Telegram Enigmas"
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-white text-[#1c1c1a] font-label-mono-sm text-[10px] px-2 py-0.5 shadow-sm font-bold border border-[#dec0b4] z-10 pointer-events-auto">
                  ZINE 04 • SINGER SEWN
                </div>
                <div className="absolute bottom-2 right-2 bg-[#1c1c1a] text-white font-label-mono-sm text-label-mono-sm px-2 py-0.5 font-bold shadow-sm z-10 pointer-events-auto">
                  $14.00
                </div>
              </div>

              <EditableText
                id="run3_title"
                as="h3"
                defaultText="Telegram Enigmas & Lost Station Maps"
                className="font-headline-sm text-headline-sm text-[#1c1c1a] font-semibold mb-1 leading-snug block"
              />
              <EditableText
                id="run3_desc"
                as="p"
                defaultText="A pocket-sized sequence of short telegram cyphers, forgotten semaphore flags, and cartographic logic puzzles for brief train hops."
                className="font-body-sm text-body-sm text-[#574239] mb-4 block"
              />
              <div className="font-label-mono-sm text-label-mono-sm uppercase text-[#574239] space-y-1 pb-4">
                <div className="flex justify-between">
                  <span>FORMAT:</span> <span className="text-[#1c1c1a] font-bold">SINGER SEWN RED THREAD</span>
                </div>
                <div className="flex justify-between">
                  <span>EXTENT:</span> <span className="text-[#1c1c1a] font-bold">48 PAGES</span>
                </div>
                <div className="flex justify-between">
                  <span>BINDING:</span> <span className="text-[#1c1c1a] font-bold">FLEXIBLE NEWSPRINT</span>
                </div>
              </div>
            </div>

            <div className="pt-2 bg-[#f6f3ef] p-2 border-t border-[#dec0b4]">
              <div className="font-label-mono-sm text-[11px] text-[#a83029] font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>[RUN 03: {remainingRunCounts.run3} COPIES REMAINING]</span>
                <span className="material-symbols-outlined text-[14px]">inventory_2</span>
              </div>
              <button
                onClick={() =>
                  handleClaimRun('run3', {
                    id: 'zn-04',
                    title: 'Telegram Enigmas & Lost Station Maps',
                    price: 14.0,
                    image:
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuCSH1PwlwwAuIYVtH38XMlT-gHD9LjFgQOjLt9QJWjID5zhL5JErq8Q6TtltJnuum8uR6ornv0s9VghgQRi0s4_YKIUbrfolJKd65TMQ8bRWbSJixtkQopuLsCOdC-7vw9FoXV-NuqVEAvliDri0YFV2J43IglnGcO3Tm_3meXwmKUU2lgtLD2Nhs05M0AxeyQGFxjFlU4d3sOCdrN3YUj07rsdebEVBS4zy0S9em5TbID0wYoKa02TdA',
                    tag: 'ZINE 04 • SINGER SEWN',
                  })
                }
                className="w-full bg-[#9e3d00] hover:bg-[#c15316] text-[#ffffff] font-label-mono-sm text-label-mono-sm uppercase py-2 tracking-wider transition-colors font-bold cursor-pointer"
                type="button"
              >
                {claimedStatus.run3 ? 'Copy Packed in Bag ✓' : 'Claim Edition Copy'}
              </button>
            </div>
          </article>
        </div>
      </section>

      {/* SECTION 5: PHYSICAL CRAFT & PHILOSOPHY STRIP */}
      <section className="w-full bg-[#e5e2de] px-4 sm:px-6 py-16 border-t border-[#dec0b4]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-baseline justify-between gap-2 border-b border-[#dec0b4]/60 pb-4">
            <div>
              <EditableText
                id="manifesto_tag"
                defaultText="THE PHYSICAL MANIFESTO"
                className="font-label-mono-sm text-label-mono-sm uppercase tracking-widest text-[#574239] font-bold block"
              />
              <EditableText
                id="manifesto_title"
                as="h3"
                defaultText="Crafted for the human hand, not the glass screen."
                className="font-headline-md text-headline-md text-[#1c1c1a] tracking-tight font-semibold mt-1 block"
              />
            </div>
            <div className="font-label-mono-sm text-label-mono-sm uppercase tracking-wider text-[#574239]">
              <EditableText
                id="manifesto_spec_code"
                defaultText="SPECIFICATION CODE: DIN 476 • FSC CERTIFIED"
              />
            </div>
          </div>

          {/* 3 Tactile Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1: Lay-Flat Cold Binding */}
            <div className="bg-[#ffffff] p-6 shadow-[4px_4px_0px_0px_#1c1c1a] border-2 border-[#1c1c1a]">
              <div className="w-10 h-10 bg-[#ffdbcc] text-[#351000] flex items-center justify-center mb-4 border border-[#dec0b4]">
                <span className="material-symbols-outlined text-[24px]">menu_book</span>
              </div>
              <span className="font-label-mono-sm text-label-mono-sm uppercase text-[#9e3d00] font-bold tracking-widest block mb-1">
                PILLAR 01
              </span>
              <EditableText
                id="manifesto_p1_title"
                as="h4"
                defaultText="Lay-Flat Cold Binding"
                className="font-headline-sm text-headline-sm text-[#1c1c1a] font-semibold mb-2 block"
              />
              <EditableText
                id="manifesto_p1_desc"
                as="p"
                defaultText="Pencils won’t snap the spine. Every compendium is bound using flexible cold-glue Swiss techniques that allow the book to rest 180° open across your knee or café table without closing on itself."
                className="font-body-md text-body-md text-[#574239] leading-relaxed block"
              />
            </div>

            {/* Pillar 2: 100% Recycled Cotton-Rag & Wheat Paper */}
            <div className="bg-[#ffffff] p-6 shadow-[4px_4px_0px_0px_#1c1c1a] border-2 border-[#1c1c1a]">
              <div className="w-10 h-10 bg-[#c7ebd4] text-[#002113] flex items-center justify-center mb-4 border border-[#dec0b4]">
                <span className="material-symbols-outlined text-[24px]">history_edu</span>
              </div>
              <span className="font-label-mono-sm text-label-mono-sm uppercase text-[#456553] font-bold tracking-widest block mb-1">
                PILLAR 02
              </span>
              <EditableText
                id="manifesto_p2_title"
                as="h4"
                defaultText="Cotton-Rag & Wheat Paper"
                className="font-headline-sm text-headline-sm text-[#1c1c1a] font-semibold mb-2 block"
              />
              <EditableText
                id="manifesto_p2_desc"
                as="p"
                defaultText="Zero bleed-through from fountain pens. Custom 120–140 GSM unbleached rag crafted in Verona mills, providing tactile tooth for graphite and pure resistance to bleeding ink."
                className="font-body-md text-body-md text-[#574239] leading-relaxed block"
              />
            </div>

            {/* Pillar 3: Zero QR Codes or Screen Links */}
            <div className="bg-[#ffffff] p-6 shadow-[4px_4px_0px_0px_#1c1c1a] border-2 border-[#1c1c1a]">
              <div className="w-10 h-10 bg-[#ffdad5] text-[#410002] flex items-center justify-center mb-4 border border-[#dec0b4]">
                <span className="material-symbols-outlined text-[24px]">phonelink_erase</span>
              </div>
              <span className="font-label-mono-sm text-label-mono-sm uppercase text-[#a83029] font-bold tracking-widest block mb-1">
                PILLAR 03
              </span>
              <EditableText
                id="manifesto_p3_title"
                as="h4"
                defaultText="Zero QR Codes or Links"
                className="font-headline-sm text-headline-sm text-[#1c1c1a] font-semibold mb-2 block"
              />
              <EditableText
                id="manifesto_p3_desc"
                as="p"
                defaultText="Completely offline solace. Solutions are housed in sealed rear envelopes printed upside down with mechanical cipher discs included inside the front jacket. No connectivity required."
                className="font-body-md text-body-md text-[#574239] leading-relaxed block"
              />
            </div>
          </div>

          {/* Bottom Postal Inscription */}
          <div className="mt-8 pt-4 border-t border-[#dec0b4] flex flex-col sm:flex-row items-center justify-between text-[#574239] font-label-mono-sm text-label-mono-sm uppercase tracking-wider text-center sm:text-left">
            <span>STAMPED • VERONA STATION KIOSK PRINT SHOP</span>
            <span>SHIPS INTERNATIONALLY VIA SECURE PARCEL TELEGRAPH</span>
          </div>
        </div>
      </section>
    </div>
  );
};
