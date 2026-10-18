import React, { useState } from 'react';
import { ScreenId, CartItem } from '../types';
import { EditableText } from '../components/admin/EditableText';
import { EditableImage } from '../components/admin/EditableImage';


interface FeaturedSolveScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
  onApplyVoucher: (code: string) => boolean;
  hasDiscount: boolean;
}

const GALLERY_IMAGES = [
  {
    id: 'cover',
    label: 'Cover Art',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNMJQwBidL_CLufhRquUpx3OcPKJ4EeEeZNhOTuiY0W3peSQ4z9TpmWSLLHoSQVyZVuwIQs-HAFOaTroCHx99OyvWC1Q21XRB7nC--TFCQkLTsanHBkAD9Nd_EmPiukm02SFPY1GV0rq0tMYlNEiGYN-w2u048Sm5nGSG8I6KG2Ewk8dFpICehGG4iguNhWjV7E2MZsQfwP9m_3lp9x8yf4wmi4upow2TbtfyJjH7410t9xIKL21_gAQ',
    alt: 'Cover of The Trans-Continental Caesar Cipher book on unbleached terracotta paper with copper foil stamping and letterpress embossing.',
  },
  {
    id: 'spread',
    label: 'Open Grid',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcwqL_bnatmFhUbJOXMZOXiSklBRMcP1s6JbtT68q2Ws6dt0yA2fFaf__eAmgFocwpSqShsKxwlptD4JjJwfzmIkJ06RWxPwVLqqCx8ShYxEZ9Fgrnrz6GIF6BzDCtoeQsRlOl4YeIztmCd3TCob8LJwzgrK98OpAVtnosmbSVrrXxUQT0YwBfaDjTZ8WtSJ6yvuFETBsJySpbyyO5qLdUrv2dV8NeDgs79sMdRibC4R1OkC7BD2TzmA',
    alt: 'Interior spread of risograph printed cryptic cipher matrix and station log on creamy unbleached Munken paper.',
  },
  {
    id: 'paper',
    label: 'Paper Grain',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-cRADG4U1f04t4ZVyMluRZj3jZFm2OON0pkIvGCH5c8hPxXjAVuXw8aFGj_18-2hrF9nloJQb4aLIHoBkZbUfzAJrEm4R7xsYr2buBj4kNlpWik3keTFrN-7R1QEJReGGTToO9-dr03fFp5RKGHLmtvvN8dvBv6rpUltMb0oPXnjJnOJkRKhB57rdOq4FQmVdhjCSvsF_-SzcjWRWX2S5ZGxL8bgRxU_1YwlHSo7lEQaqJ16gNi5DsA',
    alt: 'Macro detail of 110gsm archival Munken cream paper grain and subtle graphite pencil solve marks.',
  },
  {
    id: 'wheel',
    label: 'Wheel Token',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnWrEZ5Q7yb-Ewitcscv2NfCKvC1PINIW_C-U3OtFnmko8HzOyFYeVCeR-RLXEHNn6pe42mNXnZSBVbvYDOBTDZiEceSCIpyHzBj5IMQwQPnxq9mam5Y3up2HFrB5x7jw51sdngatzVyhE0C7Jqd17ty35LyWxDlkty8vObJBWEnBed2PGWCt-rIF60-J2MHcfvlHxaVuVmFjEt12aYvey5NyD9UlLjVP1dsSmIgCxNp_lIbwfd5ZndA',
    alt: 'Die-cut circular Caesar cipher decoder wheel on heavyweight cardstock tucked into a glassine archival sleeve.',
  },
];

export const FeaturedSolveScreen: React.FC<FeaturedSolveScreenProps> = ({
  onNavigate,
  onAddToCart,
  onApplyVoucher,
  hasDiscount,
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [addonBrass, setAddonBrass] = useState(false);
  const [addonPouch, setAddonPouch] = useState(false);
  const [addedNotif, setAddedNotif] = useState(false);

  // Cipher Wheel & Solver State
  const [currentShift, setCurrentShift] = useState(3);
  const [userDecodedInput, setUserDecodedInput] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const [voucherApplied, setVoucherApplied] = useState(hasDiscount);

  const targetCiphertext = 'WKH WUDLQ LV GHODBHG DW SODWIRUP WKUHH. WDNH RXW BRXU SHQFLO.';
  const targetSolution = 'THE TRAIN IS DELAYED AT PLATFORM THREE. TAKE OUT YOUR PENCIL.';

  // Price calculations
  let basePrice = 24.0;
  if (addonBrass) basePrice += 14.0;
  if (addonPouch) basePrice += 18.0;
  const currentTotal = hasDiscount || voucherApplied ? basePrice * 0.9 : basePrice;

  const handleAdjustShift = (delta: number) => {
    let next = (currentShift + delta) % 26;
    if (next < 0) next += 26;
    setCurrentShift(next);
  };

  const decodeCaesar = (str: string, shiftVal: number) => {
    return str
      .split('')
      .map((char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 - shiftVal + 26) % 26) + 65);
        }
        return char;
      })
      .join('');
  };

  const handleAutoDecode = () => {
    const decoded = decodeCaesar(targetCiphertext, currentShift);
    setUserDecodedInput(decoded);
    checkSolution(decoded);
  };

  const checkSolution = (text: string) => {
    const cleaned = text.trim().toUpperCase();
    if (cleaned === targetSolution) {
      setIsSolved(true);
    } else {
      setIsSolved(false);
    }
  };

  const handleInputChange = (val: string) => {
    setUserDecodedInput(val);
    checkSolution(val);
  };

  const handleReset = () => {
    setUserDecodedInput('');
    setIsSolved(false);
    setCurrentShift(3);
  };

  const handleRevealFirstWord = () => {
    if (!userDecodedInput.startsWith('THE TRAIN')) {
      const updated = 'THE TRAIN ' + userDecodedInput.trim();
      setUserDecodedInput(updated);
      checkSolution(updated);
    }
  };

  const handleApplyVoucherClick = () => {
    onApplyVoucher('ENIGMA10');
    setVoucherApplied(true);
  };

  const handleAddVolumeToBag = () => {
    onAddToCart({
      id: 'or-01',
      title: 'The Trans-Continental Caesar Cipher',
      price: currentTotal,
      image: GALLERY_IMAGES[0].src,
      tag: 'VOL. I • SMYTH SEWN',
      binding: 'Exposed Smyth-Sewn',
    });
    setAddedNotif(true);
    setTimeout(() => setAddedNotif(false), 3500);
  };

  // Angle for SVG rotor: 360 / 26 = 13.846 deg per letter
  const rotorAngle = currentShift * 13.846;
  const shiftedLetter = String.fromCharCode(65 + currentShift);

  return (
    <div className="flex flex-col w-full">
      {/* Archival Edition Header & Ledger Breadcrumb */}
      <div className="w-full bg-[#f6f3ef] px-4 sm:px-6 py-2.5 border-b border-[#dec0b4]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-1 text-[#574239] font-label-mono-sm text-label-mono-sm uppercase tracking-wider">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => onNavigate('editions-and-archive')}
              className="hover:text-[#9e3d00] transition-colors cursor-pointer"
            >
              Archive
            </button>
            <span>/</span>
            <button
              onClick={() => onNavigate('editions-and-archive')}
              className="hover:text-[#9e3d00] transition-colors cursor-pointer"
            >
              Ciphers & Substitution
            </button>
            <span>/</span>
            <span className="text-[#1c1c1a] font-bold">Vol. 01: Caesar & Substitution</span>
            <span>/</span>
            <span className="bg-[#ebe8e4] px-1.5 py-0.5 text-[#1c1c1a] border border-[#dec0b4]">
              Plate No. 104
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#456553]"></span>
            <span>STAMPED: FIRST EDITION • BATCH 04 • 180 PAGES • 100% COTTON-RAG</span>
          </div>
        </div>
      </div>

      {/* Primary Presentation Bento Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Rich Book Visual Presentation & Tactile Specifications */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Main Physical Book Display Card */}
            <div className="relative bg-[#ffffff] p-6 shadow-md border-2 border-[#1c1c1a] overflow-hidden group">
              {/* Top Metadata Ribbon inside card */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#dec0b4]">
                <span className="bg-[#9e3d00] text-white font-label-mono-sm text-label-mono-sm uppercase tracking-widest px-2.5 py-1 font-bold">
                  COLLECTION PIECE N° 01
                </span>
                <div className="flex items-center gap-1 text-[#574239] font-label-mono-sm text-label-mono-sm">
                  <span className="material-symbols-outlined text-[16px] text-[#9e3d00]">verified</span>
                  <span>CERTIFIED VERONA PRESSWORK</span>
                </div>
              </div>

              {/* Hero Book Cover Representation */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#f0edea] border border-[#dec0b4] flex items-center justify-center p-4">
                <EditableImage
                  id="solve_hero_img"
                  defaultSrc={GALLERY_IMAGES[activePhotoIdx].src}
                  alt={GALLERY_IMAGES[activePhotoIdx].alt}
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover shadow-md transition-all duration-300"
                />

                {/* Letterpress Physical Stamp Badge Overlaid */}
                <div className="absolute bottom-4 right-4 bg-[#ffffff]/95 backdrop-blur-sm p-3 border border-[#1c1c1a] shadow-md flex items-center gap-2 pointer-events-none">
                  <div className="w-8 h-8 rounded-full bg-[#ca483e]/20 flex items-center justify-center text-[#a83029]">
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                  </div>
                  <div>
                    <p className="font-label-mono-sm text-label-mono-sm uppercase text-[#1c1c1a] font-bold leading-tight">
                      LAY-FLAT SMYTH BINDING
                    </p>
                    <p className="font-label-mono-sm text-label-mono-sm text-[#574239] leading-none">
                      Designed for train tray tables
                    </p>
                  </div>
                </div>
              </div>

              {/* Thumbnail Gallery Switcher */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-4">
                {GALLERY_IMAGES.map((img, idx) => {
                  const isActive = idx === activePhotoIdx;
                  return (
                    <button
                      key={img.id}
                      onClick={() => setActivePhotoIdx(idx)}
                      className={`p-1 transition-all shadow-sm focus:outline-none cursor-pointer border ${
                        isActive
                          ? 'border-2 border-[#9e3d00] bg-[#ffdbcc]/40'
                          : 'border-[#dec0b4] bg-[#f0edea] hover:bg-[#ebe8e4]'
                      }`}
                      type="button"
                    >
                      <img
                        className="w-full h-16 object-cover"
                        alt={img.alt}
                        src={img.src}
                      />
                      <span className="block mt-1 font-label-mono-sm text-[10px] text-[#574239] text-center uppercase truncate font-bold">
                        {img.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tactile Specifications Accordion / Spec Sheet */}
            <div className="bg-[#f0edea] p-6 shadow-sm border border-[#dec0b4]">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#dec0b4]">
                <h3 className="font-headline-sm text-headline-sm text-[#1c1c1a] font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#9e3d00] text-[24px]">menu_book</span>
                  Tactile Specifications & Craft
                </h3>
                <span className="font-label-mono-sm text-label-mono-sm uppercase text-[#574239] bg-[#e5e2de] px-2 py-0.5 border border-[#dec0b4]">
                  FOLIO 130 • 200MM
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#ffffff] p-4 border border-[#dec0b4] shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="font-label-mono-sm text-label-mono-sm uppercase tracking-wider text-[#9e3d00] font-bold">
                      01 / DIMENSIONS
                    </span>
                    <h4 className="font-title-editorial text-title-editorial text-[#1c1c1a] mt-1 font-bold">
                      130mm × 200mm
                    </h4>
                    <p className="font-body-sm text-body-sm text-[#574239] mt-1 leading-relaxed">
                      Engineered precisely for the interior breast pocket of a standard continental travel coat or railway rucksack sleeve.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#dec0b4]/60 flex items-center gap-1 font-label-mono-sm text-label-mono-sm text-[#456553] font-bold">
                    <span className="material-symbols-outlined text-[15px]">check_circle</span>
                    <span>Coat Pocket Verified</span>
                  </div>
                </div>

                <div className="bg-[#ffffff] p-4 border border-[#dec0b4] shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="font-label-mono-sm text-label-mono-sm uppercase tracking-wider text-[#9e3d00] font-bold">
                      02 / BINDING CRAFT
                    </span>
                    <h4 className="font-title-editorial text-title-editorial text-[#1c1c1a] mt-1 font-bold">
                      Exposed Smyth-Sewn
                    </h4>
                    <p className="font-body-sm text-body-sm text-[#574239] mt-1 leading-relaxed">
                      Lays completely flat (180°) on train tray tables without hand strain. Copper thread exposed spine with archival spine cloth.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#dec0b4]/60 flex items-center gap-1 font-label-mono-sm text-label-mono-sm text-[#456553] font-bold">
                    <span className="material-symbols-outlined text-[15px]">check_circle</span>
                    <span>Zero Springback Strain</span>
                  </div>
                </div>

                <div className="bg-[#ffffff] p-4 border border-[#dec0b4] shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="font-label-mono-sm text-label-mono-sm uppercase tracking-wider text-[#9e3d00] font-bold">
                      03 / SUBSTRATE
                    </span>
                    <h4 className="font-title-editorial text-title-editorial text-[#1c1c1a] mt-1 font-bold">
                      110gsm Munken Cream
                    </h4>
                    <p className="font-body-sm text-body-sm text-[#574239] mt-1 leading-relaxed">
                      Uncoated archival Munken Print Cream paper (FSC Certified). Optimized for 2B graphite pencil erase cycles without page tear.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#dec0b4]/60 flex items-center gap-1 font-label-mono-sm text-label-mono-sm text-[#456553] font-bold">
                    <span className="material-symbols-outlined text-[15px]">check_circle</span>
                    <span>Smudge-Resistant Grain</span>
                  </div>
                </div>

                <div className="bg-[#ffffff] p-4 border border-[#dec0b4] shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="font-label-mono-sm text-label-mono-sm uppercase tracking-wider text-[#9e3d00] font-bold">
                      04 / COMPANION ARTIFACT
                    </span>
                    <h4 className="font-title-editorial text-title-editorial text-[#1c1c1a] mt-1 font-bold">
                      Die-Cut Decryption Wheel
                    </h4>
                    <p className="font-body-sm text-body-sm text-[#574239] mt-1 leading-relaxed">
                      Dual-rotor revolving card wheel and slotted cipher ruler stored in a rear translucent glassine document pocket.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#dec0b4]/60 flex items-center gap-1 font-label-mono-sm text-label-mono-sm text-[#456553] font-bold">
                    <span className="material-symbols-outlined text-[15px]">check_circle</span>
                    <span>Included with Every Copy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Purchase, Storytelling & Journey Companion Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Main Product Ledger Ticket */}
            <div className="bg-[#ffffff] p-6 shadow-md border-2 border-[#1c1c1a] flex flex-col gap-4 relative">
              <div className="flex items-center justify-between pb-2 border-b border-[#dec0b4]">
                <span className="font-label-mono-sm text-label-mono-sm uppercase tracking-widest text-[#574239] font-bold">
                  SERIES: THE CONTINENTAL ENIGMAS
                </span>
                <span className="bg-[#456553] text-[#ffffff] font-label-mono-sm text-label-mono-sm px-2 py-0.5 uppercase font-bold">
                  IN STOCK • DISPATCH 04
                </span>
              </div>

              <div>
                <EditableText
                  id="solve_screen_title"
                  as="h1"
                  defaultText="The Trans-Continental Caesar Cipher"
                  className="font-headline-lg text-headline-lg text-[#1c1c1a] font-semibold leading-tight tracking-tight block"
                />
                <EditableText
                  id="solve_screen_subtitle"
                  as="p"
                  defaultText="82 Enigmas for the Rails • Vol. I"
                  className="font-headline-sm text-headline-sm text-[#9e3d00] font-normal italic mt-1 block"
                />
              </div>

              {/* Price & Solitude Guarantee Metrics */}
              <div className="bg-[#f6f3ef] p-4 border border-[#dec0b4] shadow-sm">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-lg text-headline-lg font-bold text-[#1c1c1a]">
                      ${currentTotal.toFixed(2)}
                    </span>
                    <span className="font-label-mono-sm text-label-mono-sm uppercase text-[#574239]">
                      USD • VAT INCLUDED
                    </span>
                  </div>
                  <span className="bg-[#f0edea] text-[#574239] font-label-mono-sm text-label-mono-sm uppercase px-2 py-1 border border-[#dec0b4]">
                    WEIGHT: 310G
                  </span>
                </div>

                <div className="mt-4 bg-[#ffffff] p-3 shadow-sm border border-[#dec0b4] flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#456553] text-[22px] shrink-0">
                    hourglass_top
                  </span>
                  <div>
                    <p className="font-label-mono-sm text-label-mono-sm uppercase text-[#1c1c1a] font-bold tracking-wider">
                      SOLITUDE GUARANTEE: 16+ HOURS
                    </p>
                    <p className="font-body-sm text-body-sm text-[#574239] leading-snug mt-0.5">
                      Curated across 82 encrypted station dispatches, cryptographic anagrams, and progressive Caesar substitutions calibrated for distraction-free transit.
                    </p>
                  </div>
                </div>
              </div>

              {/* Journey Companion Bundle Add-ons */}
              <div className="flex flex-col gap-2">
                <span className="font-label-mono-sm text-label-mono-sm uppercase tracking-wider text-[#574239] font-bold">
                  COMPANION ADD-ONS FOR THE TRAY TABLE:
                </span>

                <label className="flex items-center justify-between p-3 bg-[#f0edea] border border-[#dec0b4] cursor-pointer hover:bg-[#ebe8e4] transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={addonBrass}
                      onChange={(e) => setAddonBrass(e.target.checked)}
                      className="w-4 h-4 rounded text-[#9e3d00] focus:ring-[#9e3d00] accent-[#9e3d00] cursor-pointer"
                    />
                    <div className="flex flex-col">
                      <span className="font-title-editorial text-title-editorial text-[#1c1c1a] leading-snug font-bold">
                        Solid Brass Travel Pencil & Clip
                      </span>
                      <span className="font-label-mono-sm text-label-mono-sm text-[#574239]">
                        2B lead core with knurled grip
                      </span>
                    </div>
                  </div>
                  <span className="font-label-mono-md text-label-mono-md font-bold text-[#1c1c1a]">
                    +$14.00
                  </span>
                </label>

                <label className="flex items-center justify-between p-3 bg-[#f0edea] border border-[#dec0b4] cursor-pointer hover:bg-[#ebe8e4] transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={addonPouch}
                      onChange={(e) => setAddonPouch(e.target.checked)}
                      className="w-4 h-4 rounded text-[#9e3d00] focus:ring-[#9e3d00] accent-[#9e3d00] cursor-pointer"
                    />
                    <div className="flex flex-col">
                      <span className="font-title-editorial text-title-editorial text-[#1c1c1a] leading-snug font-bold">
                        Waxed Canvas Transit Pouch
                      </span>
                      <span className="font-label-mono-sm text-label-mono-sm text-[#574239]">
                        Forest green duck canvas with leather closure
                      </span>
                    </div>
                  </div>
                  <span className="font-label-mono-md text-label-mono-md font-bold text-[#1c1c1a]">
                    +$18.00
                  </span>
                </label>
              </div>

              {/* Primary CTA & Total */}
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={handleAddVolumeToBag}
                  className="w-full bg-[#9e3d00] hover:bg-[#c15316] text-white py-3.5 px-6 shadow-[4px_4px_0px_0px_#1c1c1a] active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform">
                    shopping_bag
                  </span>
                  <span className="font-label-mono-lg text-label-mono-lg uppercase tracking-wider font-bold">
                    Add to Carriage Bag • ${currentTotal.toFixed(2)}
                  </span>
                </button>

                {addedNotif && (
                  <div className="bg-[#c7ebd4] text-[#002113] p-2.5 text-center font-label-mono-sm text-label-mono-sm uppercase tracking-wider font-bold animate-fadeIn border border-[#456553]">
                    • Item Stowed into Carriage Bag. Dispatches in 24h •
                  </div>
                )}

                <div className="flex items-center justify-center gap-1.5 text-[#574239] font-label-mono-sm text-label-mono-sm text-center pt-1">
                  <span className="material-symbols-outlined text-[16px] text-[#9e3d00]">local_shipping</span>
                  <span>Plastic-free parcel stamped with authentic Italian postal postmarks.</span>
                </div>
              </div>

              {/* Departure Station Ledger Info */}
              <div className="bg-[#ebe8e4] p-3 border border-[#dec0b4] flex items-center justify-between text-[#574239] font-label-mono-sm text-label-mono-sm uppercase tracking-wide">
                <div>
                  <span className="text-[#1c1c1a] font-bold">CURRENT RUN:</span> 1,200 COPIES
                </div>
                <div>
                  <span className="text-[#1c1c1a] font-bold">REMAINING:</span> 184 UNITS
                </div>
                <div className="text-[#456553] font-bold">READY TO DISPATCH</div>
              </div>
            </div>

            {/* Curated Companion Reading Essay Snip */}
            <div className="bg-[#f0edea] p-4 border border-[#dec0b4] shadow-sm">
              <div className="flex items-center gap-1.5 text-[#574239] font-label-mono-sm text-label-mono-sm uppercase mb-2">
                <span className="material-symbols-outlined text-[16px] text-[#a83029]">edit_note</span>
                <span className="font-bold">From the Curator's Bench • Station 04</span>
              </div>
              <p className="font-body-md text-body-md text-[#1c1c1a] italic leading-relaxed">
                “There is a specific stillness that arrives after the carriage whistle blows and the cellular signal fades to zero between tunnels. This volume was typeset specifically for those three-hour blind spots where the mind demands something heavier than a screen and softer than silence.”
              </p>
              <p className="font-label-mono-sm text-label-mono-sm uppercase text-[#574239] mt-2 text-right">
                — Eleanor Dee, Verona Studio
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE SOLVE SECTION: "Test Your Transit Solitude" */}
      <div className="w-full bg-[#ebe8e4] py-16 px-4 sm:px-6 my-8 border-y border-[#dec0b4] shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Interactive Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 font-label-mono-sm text-label-mono-sm uppercase tracking-wider text-[#9e3d00] font-bold mb-1">
                <span className="material-symbols-outlined text-[18px]">key</span>
                <span>Interactive Dispatch • Enigma Plate #01</span>
              </div>
              <EditableText
                id="solve_interactive_title"
                as="h2"
                defaultText="Test Your Transit Solitude"
                className="font-headline-lg text-headline-lg text-[#1c1c1a] font-semibold tracking-tight block"
              />
              <EditableText
                id="solve_interactive_desc"
                as="p"
                defaultText="Experience the tactile rhythm of the physical cipher compendium directly in your browser. Rotate the brass shift key, inspect the substitution rings, and decrypt the station dispatch."
                className="font-body-lg text-body-lg text-[#574239] max-w-2xl mt-1 block"
              />
            </div>

            <div className="bg-[#ffffff] p-3 border border-[#1c1c1a] shadow-sm flex items-center gap-4">
              <div className="text-right">
                <span className="font-label-mono-sm text-label-mono-sm uppercase text-[#574239] block">
                  DIFFICULTY RATING
                </span>
                <span className="font-label-mono-md text-label-mono-md text-[#1c1c1a] font-bold uppercase">
                  GRADE II: NOVICE TELEGRAPH
                </span>
              </div>
              <div className="w-10 h-10 bg-[#c7ebd4] flex items-center justify-center text-[#002113]">
                <span className="material-symbols-outlined text-[20px]">psychology</span>
              </div>
            </div>
          </div>

          {/* Cipher Wheel & Decryption Console Bento */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Dual-Ring SVG Cipher Wheel Simulator */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#ffffff] p-6 border-2 border-[#1c1c1a] shadow-[4px_4px_0px_0px_#1c1c1a]">
              <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-[#dec0b4]">
                <span className="font-label-mono-sm text-label-mono-sm uppercase tracking-wider text-[#574239] font-bold">
                  ROTATING ARTIFACT
                </span>
                <span className="font-label-mono-md text-label-mono-md uppercase bg-[#ffdbcc] text-[#351000] px-2 py-0.5 font-bold border border-[#dec0b4]">
                  SHIFT: +{currentShift} [ {shiftedLetter} → A ]
                </span>
              </div>

              {/* Interactive SVG Wheel with Dynamic Rotation */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center select-none my-2">
                {/* Outer Fixed Card Ring */}
                <svg className="absolute inset-0 w-full h-full transform transition-transform" viewBox="0 0 320 320">
                  <circle cx="160" cy="160" fill="#f6f3ef" r="148" stroke="#8b7267" strokeDasharray="4 2" strokeWidth="2"></circle>
                  <circle cx="160" cy="160" fill="#ebe8e4" r="120"></circle>
                  {/* Outer Letter Markings (A-Z) */}
                  <g dominantBaseline="central" fill="#1c1c1a" fontFamily="Space Mono" fontSize="9" fontWeight="700" textAnchor="middle">
                    {[
                      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                      'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                    ].map((letter, i) => {
                      const angle = i * 13.846;
                      return (
                        <text
                          key={letter}
                          transform={`translate(160, 160) rotate(${angle}) translate(0, -134) rotate(-${angle})`}
                        >
                          {letter}
                        </text>
                      );
                    })}
                  </g>
                </svg>

                {/* Inner Brass Rotating Ring (Rotates dynamically with CSS transform) */}
                <svg
                  className="absolute w-52 h-52 transition-transform duration-500 ease-out"
                  style={{ transform: `rotate(${rotorAngle}deg)` }}
                  viewBox="0 0 200 200"
                >
                  <circle cx="100" cy="100" fill="#ffdbcc" r="92" stroke="#9e3d00" strokeWidth="2"></circle>
                  <circle cx="100" cy="100" fill="#f0edea" r="60" stroke="#dec0b4" strokeWidth="1"></circle>
                  {/* Brass center hub rivet */}
                  <circle cx="100" cy="100" fill="#9e3d00" r="22"></circle>
                  <circle cx="100" cy="100" fill="#7c2e00" r="16"></circle>
                  <circle cx="100" cy="100" fill="#ffdbcc" r="6"></circle>
                  {/* Inner Shifted Letters (A-Z) */}
                  <g dominantBaseline="central" fill="#7c2e00" fontFamily="Space Mono" fontSize="8.5" fontWeight="700" textAnchor="middle">
                    {[
                      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                      'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                    ].map((letter, i) => {
                      const angle = i * 13.846;
                      return (
                        <text
                          key={letter}
                          transform={`translate(100, 100) rotate(${angle}) translate(0, -76) rotate(-${angle})`}
                        >
                          {letter}
                        </text>
                      );
                    })}
                  </g>
                </svg>

                {/* Pointer Indicator */}
                <div className="absolute top-0 text-[#9e3d00] pointer-events-none flex flex-col items-center">
                  <span className="material-symbols-outlined text-[20px]">arrow_drop_down</span>
                </div>
              </div>

              {/* Shift Stepper Controls */}
              <div className="w-full flex items-center justify-between gap-2 mt-2 bg-[#f0edea] p-2 border border-[#dec0b4]">
                <button
                  aria-label="Decrease shift"
                  onClick={() => handleAdjustShift(-1)}
                  className="w-10 h-10 bg-white text-[#1c1c1a] hover:bg-[#ebe8e4] transition-colors flex items-center justify-center font-label-mono-md text-label-mono-md font-bold shadow-sm border border-[#1c1c1a] cursor-pointer"
                  type="button"
                >
                  -1
                </button>
                <div className="flex flex-col items-center">
                  <span className="font-label-mono-sm text-label-mono-sm uppercase text-[#574239] leading-none">
                    KEY ROTATION
                  </span>
                  <span className="font-label-mono-lg text-label-mono-lg font-bold text-[#1c1c1a]">
                    +{currentShift}
                  </span>
                </div>
                <button
                  aria-label="Increase shift"
                  onClick={() => handleAdjustShift(1)}
                  className="w-10 h-10 bg-white text-[#1c1c1a] hover:bg-[#ebe8e4] transition-colors flex items-center justify-center font-label-mono-md text-label-mono-md font-bold shadow-sm border border-[#1c1c1a] cursor-pointer"
                  type="button"
                >
                  +1
                </button>
              </div>
            </div>

            {/* Right: Telegraph Dispatch Decode Console */}
            <div className="lg:col-span-7 flex flex-col gap-4 bg-[#ffffff] p-6 border-2 border-[#1c1c1a] shadow-[4px_4px_0px_0px_#1c1c1a]">
              {/* Encrypted Wire Telegram Slip */}
              <div className="bg-[#f6f3ef] p-4 border border-[#dec0b4] shadow-inner">
                <div className="flex items-center justify-between pb-2 mb-2 text-[#574239] font-label-mono-sm text-label-mono-sm uppercase border-b border-[#dec0b4]">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#a83029]">contactless</span>
                    <span>INTERCEPTED TELEGRAM • ZÜRICH HB PLATFORM 3</span>
                  </div>
                  <span className="bg-[#f0edea] px-2 py-0.5 text-[#1c1c1a] font-bold border border-[#dec0b4]">
                    CIPHER CODE: CAESAR (+3)
                  </span>
                </div>

                <p className="font-label-mono-lg text-label-mono-lg text-[#a83029] tracking-widest font-bold select-all bg-white p-3 border border-[#dec0b4]">
                  {targetCiphertext}
                </p>
              </div>

              {/* Interactive User Decryption Input Area */}
              <div className="flex flex-col gap-1">
                <label className="font-label-mono-sm text-label-mono-sm uppercase tracking-wider text-[#574239] flex items-center justify-between">
                  <span>YOUR DECODED TRANSCRIPTION:</span>
                  <span className="text-[#456553] font-bold">LIVE TELEGRAPH FIELD</span>
                </label>
                <textarea
                  value={userDecodedInput}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="w-full bg-[#f0edea] text-[#1c1c1a] p-3 font-label-mono-md text-label-mono-md placeholder:text-[#574239]/60 focus:bg-white focus:outline-none transition-all border border-[#1c1c1a] uppercase tracking-wider resize-none"
                  placeholder="Type your deciphered words here, or press 'Auto-Decode with Current Shift' to test the current rotor shift..."
                  rows={3}
                ></textarea>
              </div>

              {/* Action Buttons for Cipher Console */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleAutoDecode}
                  className="w-full sm:w-auto flex-1 bg-[#f0edea] hover:bg-[#ebe8e4] text-[#1c1c1a] py-2.5 px-4 font-label-mono-sm text-label-mono-sm uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-1.5 border border-[#1c1c1a] cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">autorenew</span>
                  <span>Auto-Decode with Current Shift (+{currentShift})</span>
                </button>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto bg-[#ebe8e4] hover:bg-[#e5e2de] text-[#574239] py-2.5 px-4 font-label-mono-sm text-label-mono-sm uppercase tracking-wider transition-colors border border-[#dec0b4] cursor-pointer"
                  type="button"
                >
                  Reset Field
                </button>
              </div>

              {/* Decryption Success Feedback Block */}
              {isSolved && (
                <div className="bg-[#456553] text-[#ffffff] p-4 border-2 border-[#1c1c1a] shadow-md animate-fadeIn">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#c7ebd4] text-[28px] shrink-0">
                        military_tech
                      </span>
                      <div>
                        <h4 className="font-label-mono-md text-label-mono-md font-bold uppercase tracking-widest text-[#c7ebd4]">
                          CIPHER CRACKED • CERTIFIED TRAVEL READY
                        </h4>
                        <p className="font-body-md text-body-md mt-1 leading-snug">
                          "THE TRAIN IS DELAYED AT PLATFORM THREE. TAKE OUT YOUR PENCIL."
                        </p>
                        <p className="font-label-mono-sm text-label-mono-sm text-[#abcfb8] uppercase tracking-wider mt-2">
                          Promotion Unlocked: Enter coupon{' '}
                          <strong className="bg-white/20 px-1 py-0.5 text-white">ENIGMA10</strong> at carriage checkout for 10% off Volume I.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleApplyVoucherClick}
                      className="shrink-0 bg-[#c7ebd4] text-[#002113] px-3 py-1.5 font-label-mono-sm text-label-mono-sm uppercase font-bold tracking-wider hover:bg-white transition-colors shadow-sm cursor-pointer"
                      type="button"
                    >
                      {voucherApplied ? '10% Applied ✓' : 'Apply 10%'}
                    </button>
                  </div>
                </div>
              )}

              {/* Real-world hint toggle */}
              <div className="pt-2 flex items-center justify-between text-[#574239] font-label-mono-sm text-label-mono-sm uppercase border-t border-[#dec0b4]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#9e3d00]">help_outline</span>
                  Hint: Julius Caesar shifted standard Latin characters backward by 3 steps.
                </span>
                <span
                  onClick={handleRevealFirstWord}
                  className="text-[#9e3d00] font-bold cursor-pointer hover:underline"
                >
                  Reveal 1st Word
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CUSTOMER LETTERS & POSTCARDS FROM JOURNEYS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-2 border-b border-[#dec0b4] pb-4">
          <div>
            <span className="font-label-mono-sm text-label-mono-sm uppercase tracking-widest text-[#9e3d00] font-bold">
              CARRIAGE CORRESPONDENCE • DISPATCH ARCHIVE
            </span>
            <h3 className="font-headline-lg text-headline-lg text-[#1c1c1a] font-semibold tracking-tight">
              Letters Stamped in Transit
            </h3>
          </div>
          <p className="font-body-md text-body-md text-[#574239] max-w-md">
            Actual dispatches and field notes posted back to our Verona studio from passenger compartments worldwide.
          </p>
        </div>

        {/* Postcard Reviews Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Review Postcard 1: Bernina Express */}
          <div className="bg-[#ffffff] p-6 shadow-md border-2 border-[#1c1c1a] flex flex-col justify-between relative overflow-hidden group hover:shadow-lg transition-shadow">
            <div>
              <div className="flex items-start justify-between pb-3 mb-3 border-b border-[#dec0b4]">
                <div className="flex flex-col">
                  <span className="font-label-mono-sm text-label-mono-sm font-bold uppercase text-[#1c1c1a]">
                    Route: Bernina Express
                  </span>
                  <span className="font-label-mono-sm text-label-mono-sm text-[#574239]">
                    Chur → Tirano • 2,253m Elevation
                  </span>
                </div>
                <div className="w-12 h-14 bg-[#f0edea] border border-[#dec0b4] p-1 flex flex-col items-center justify-center text-center shadow-inner">
                  <span className="material-symbols-outlined text-[14px] text-[#a83029]">train</span>
                  <span className="font-label-mono-sm text-[8px] uppercase tracking-tighter text-[#574239] leading-none mt-1">
                    POSTE IT
                  </span>
                  <span className="font-label-mono-sm text-[8px] font-bold text-[#9e3d00]">€ 1.80</span>
                </div>
              </div>

              <div className="flex items-center gap-0.5 text-[#9e3d00] mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="material-symbols-outlined text-[18px]">
                    star
                  </span>
                ))}
              </div>

              <p className="font-title-editorial text-title-editorial text-[#1c1c1a] font-semibold mb-1">
                “The Smyth binding is a masterwork.”
              </p>
              <p className="font-body-md text-body-md text-[#574239] leading-relaxed">
                The way this book rests completely flat on a cramped Swiss dining table while the train snakes through the snowdrifts is sheer joy. The paper holds up to countless graphite erasures. Solved enigmas #01 through #19 between St. Moritz and Poschiavo without glancing at my phone once.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#dec0b4] flex items-center justify-between text-[#574239] font-label-mono-sm text-label-mono-sm uppercase">
              <span className="font-bold text-[#1c1c1a]">Matteo V. • Zurich</span>
              <span>POSTMARKED: OCT 14</span>
            </div>
          </div>

          {/* Review Postcard 2: Coast Starlight */}
          <div className="bg-[#ffffff] p-6 shadow-md border-2 border-[#1c1c1a] flex flex-col justify-between relative overflow-hidden group hover:shadow-lg transition-shadow">
            <div>
              <div className="flex items-start justify-between pb-3 mb-3 border-b border-[#dec0b4]">
                <div className="flex flex-col">
                  <span className="font-label-mono-sm text-label-mono-sm font-bold uppercase text-[#1c1c1a]">
                    Route: Coast Starlight
                  </span>
                  <span className="font-label-mono-sm text-label-mono-sm text-[#574239]">
                    Seattle → Los Angeles • 35h Run
                  </span>
                </div>
                <div className="w-12 h-14 bg-[#f0edea] border border-[#dec0b4] p-1 flex flex-col items-center justify-center text-center shadow-inner">
                  <span className="material-symbols-outlined text-[14px] text-[#456553]">sailing</span>
                  <span className="font-label-mono-sm text-[8px] uppercase tracking-tighter text-[#574239] leading-none mt-1">
                    US MAIL
                  </span>
                  <span className="font-label-mono-sm text-[8px] font-bold text-[#456553]">AIR 88¢</span>
                </div>
              </div>

              <div className="flex items-center gap-0.5 text-[#9e3d00] mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="material-symbols-outlined text-[18px]">
                    star
                  </span>
                ))}
              </div>

              <p className="font-title-editorial text-title-editorial text-[#1c1c1a] font-semibold mb-1">
                “The rotating cipher disc is addicting.”
              </p>
              <p className="font-body-md text-body-md text-[#574239] leading-relaxed">
                I spent the entire passage through the Cascade mountains decoding plate after plate in the observation car. The tactile feel of rotating the card wheel with my thumb while watching rain streak the glass was the most restful afternoon of my entire year.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#dec0b4] flex items-center justify-between text-[#574239] font-label-mono-sm text-label-mono-sm uppercase">
              <span className="font-bold text-[#1c1c1a]">Claire D. • Portland</span>
              <span>POSTMARKED: NOV 02</span>
            </div>
          </div>

          {/* Review Postcard 3: Paris-Milan Frecciarossa */}
          <div className="bg-[#ffffff] p-6 shadow-md border-2 border-[#1c1c1a] flex flex-col justify-between relative overflow-hidden group hover:shadow-lg transition-shadow">
            <div>
              <div className="flex items-start justify-between pb-3 mb-3 border-b border-[#dec0b4]">
                <div className="flex flex-col">
                  <span className="font-label-mono-sm text-label-mono-sm font-bold uppercase text-[#1c1c1a]">
                    Route: Paris-Milano 9281
                  </span>
                  <span className="font-label-mono-sm text-label-mono-sm text-[#574239]">
                    Gare de Lyon → Centrale • 7h Run
                  </span>
                </div>
                <div className="w-12 h-14 bg-[#f0edea] border border-[#dec0b4] p-1 flex flex-col items-center justify-center text-center shadow-inner">
                  <span className="material-symbols-outlined text-[14px] text-[#9e3d00]">navigation</span>
                  <span className="font-label-mono-sm text-[8px] uppercase tracking-tighter text-[#574239] leading-none mt-1">
                    PAR AVION
                  </span>
                  <span className="font-label-mono-sm text-[8px] font-bold text-[#9e3d00]">FS 1.20</span>
                </div>
              </div>

              <div className="flex items-center gap-0.5 text-[#9e3d00] mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="material-symbols-outlined text-[18px]">
                    star
                  </span>
                ))}
              </div>

              <p className="font-title-editorial text-title-editorial text-[#1c1c1a] font-semibold mb-1">
                “An object with genuine dignity.”
              </p>
              <p className="font-body-md text-body-md text-[#574239] leading-relaxed">
                In an era of disposable puzzle apps that demand your face scan and sell advertisements, ORMA's letterpress compendium is quiet, elegant, and uncompromising. You smell the ink before you even begin the cipher. Magnificent edition.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#dec0b4] flex items-center justify-between text-[#574239] font-label-mono-sm text-label-mono-sm uppercase">
              <span className="font-bold text-[#1c1c1a]">Henri de L. • Lyon</span>
              <span>POSTMARKED: NOV 19</span>
            </div>
          </div>
        </div>

        {/* Stockist Callout Banner */}
        <div className="mt-8 bg-[#f0edea] p-6 border border-[#dec0b4] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#9e3d00]/10 flex items-center justify-center text-[#9e3d00] shrink-0 border border-[#dec0b4]">
              <span className="material-symbols-outlined text-[28px]">storefront</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-[#1c1c1a] font-semibold">
                Physical Kiosks & Station Bookstalls
              </h4>
              <p className="font-body-sm text-body-sm text-[#574239]">
                Also stocked at Milano Centrale Platform 4 Kiosk, Zurich HB Travel Books, and Gare de Lyon Hall 2.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('editions-and-archive')}
            className="shrink-0 bg-white text-[#1c1c1a] hover:bg-[#ebe8e4] px-4 py-2 border border-[#1c1c1a] font-label-mono-sm text-label-mono-sm uppercase tracking-wider font-bold transition-colors shadow-sm cursor-pointer"
          >
            Find Station Stockist →
          </button>
        </div>
      </div>
    </div>
  );
};
