import React, { useState } from 'react';
import { ScreenId } from '../types';
import { EditableText } from '../components/admin/EditableText';
import { EditableImage } from '../components/admin/EditableImage';

interface MakersNoteScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const MakersNoteScreen: React.FC<MakersNoteScreenProps> = ({ onNavigate }) => {
  const [senderName, setSenderName] = useState('');
  const [returnPost, setReturnPost] = useState('');
  const [dispatchReason, setDispatchReason] = useState('story');
  const [railwayLine, setRailwayLine] = useState('');
  const [message, setMessage] = useState('');
  const [archivePermission, setArchivePermission] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setMessage('');
    setRailwayLine('');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Archival Dossier Intro & Editorial Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 w-full pb-12">
        <div className="flex flex-col gap-2 pt-4 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 bg-[#f0edea] px-3 py-1 shadow-xs border border-[#dec0b4]">
              <span className="w-2 h-2 rounded-full bg-[#9e3d00] shrink-0 animate-ping"></span>
              <EditableText
                id="makers_page_folio_tag"
                defaultText="MEMOIR & MANIFESTO • FOLIO NO. 05 • MILANO & VERONA PRESSWORK"
                className="font-label-mono-sm text-label-mono-sm uppercase text-[#574239] tracking-widest font-bold"
              />
            </div>
            <div className="flex items-center gap-4 text-[#574239] font-label-mono-sm text-label-mono-sm uppercase">
              <EditableText
                id="makers_page_station_desk"
                defaultText="STATION DESK: VERONA RIVERA"
              />
              <span>•</span>
              <EditableText
                id="makers_page_dispatch_ref"
                defaultText="DISPATCH REF: #ORMA-LTR-24"
              />
            </div>
          </div>
        </div>

        {/* Title & Subtitle Split Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8 flex flex-col gap-2">
            <EditableText
              id="makers_page_essay_tag"
              defaultText="[ 01. ESSAY & MAKER’S INTENTION ]"
              className="font-label-mono-md text-label-mono-md uppercase tracking-wider text-[#9e3d00] font-bold block"
            />
            <EditableText
              id="makers_page_title"
              as="h1"
              defaultText="The Disappearance of the Train Bookstall"
              className="font-display-hero text-display-hero text-[#1c1c1a] tracking-tight leading-[1.08] block"
            />
          </div>
          <div className="lg:col-span-4 pb-2">
            <EditableText
              id="makers_page_subtitle"
              as="p"
              defaultText="A personal letter on why we craft slow, physical transit objects for the quiet in-between moments of travel and contemplation."
              className="font-title-editorial text-title-editorial text-[#574239] italic leading-snug block"
            />
          </div>
        </div>

        {/* Verbatim Letter Feature: Double Paper Layer with Hard Offset Stamp */}
        <div className="relative bg-[#f6f3ef] p-6 sm:p-8 lg:p-12 shadow-[6px_6px_0px_0px_#1c1c1a] border-2 border-[#1c1c1a] mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Text Column */}
            <div className="lg:col-span-8 flex flex-col gap-4 relative">
              {/* Postal Watermark Badge */}
              <div className="flex items-center gap-1.5 font-label-mono-sm text-label-mono-sm text-[#456553] uppercase tracking-widest mb-1 font-bold">
                <span className="material-symbols-outlined text-[16px]">draw</span>
                <EditableText
                  id="makers_page_watermark_badge"
                  defaultText="VERONA ATELIER • FOLIO CORRESPONDENCE"
                />
              </div>

              {/* Verbatim Quote Block */}
              <blockquote className="font-body-lg text-body-lg text-[#1c1c1a] space-y-4 italic leading-relaxed">
                <EditableText
                  id="makers_page_p1"
                  as="p"
                  defaultText="“ORMA was born in the particular stillness of a long journey. I grew up travelling. Trains mostly, sometimes buses — long hours with my family, watching the landscape change outside the window. My mother always had something to read. So did we."
                  className="block"
                />
                <EditableText
                  id="makers_page_p2"
                  as="p"
                  defaultText="Somewhere along the way, the bookstalls at stations started disappearing. The vendors who boarded trains with stacks of books stopped coming. And everyone started looking at their phones instead."
                  className="block"
                />
                <EditableText
                  id="makers_page_p3"
                  as="p"
                  defaultText="ORMA Editions are my answer to that disappearance. For the train, the café, the wait, the quiet in-between moments that don’t need a screen.”"
                  className="block font-semibold text-[#1c1c1a]"
                />
              </blockquote>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#dec0b4]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#ffdbcc] text-[#9e3d00] flex items-center justify-center font-display-hero text-2xl font-bold shadow-xs border border-[#dec0b4]">
                    D
                  </div>
                  <div className="flex flex-col">
                    <EditableText
                      id="makers_page_author_name"
                      defaultText="— Ms. Dee"
                      className="font-headline-sm text-headline-sm text-[#1c1c1a] leading-tight font-bold block"
                    />
                    <EditableText
                      id="makers_page_author_title"
                      defaultText="Founder & Typographer, ORMA Editions"
                      className="font-label-mono-sm text-label-mono-sm uppercase text-[#574239] block"
                    />
                  </div>
                </div>

                {/* Hand-drawn style Franking SVG Seal */}
                <div className="flex items-center gap-2 bg-[#ffffff] p-2.5 shadow-sm border border-[#1c1c1a] rotate-[-2deg]">
                  <div className="w-10 h-10 rounded-full bg-[#a83029]/10 flex items-center justify-center text-[#a83029]">
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                  </div>
                  <div className="flex flex-col font-label-mono-sm text-label-mono-sm text-[#1c1c1a]">
                    <span className="font-bold tracking-wider">VERONA PRINT GUILD</span>
                    <span className="text-[#574239] text-[9px]">EST. 2024 • INK & LEAD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Portrait / Atelier Vignette Image */}
            <div className="lg:col-span-4 relative flex flex-col items-center">
              <div className="relative w-full aspect-[4/5] overflow-hidden shadow-[4px_4px_0px_0px_#1c1c1a] bg-[#f0edea] border-2 border-[#1c1c1a]">
                <EditableImage
                  id="makers_page_portrait_img"
                  defaultSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCRSWQ0kQ8QIl4TEaY9iTnyNdloaPqNdl7P2mG3LmjdAU5RgDchdBkulq_1eNvQApUXaT55cUQAgs9WABXei2XQeUBOwbnJItYMlq1KBZ5UG8xGffTTDpSlZJajNpaSlNs_5VWpkFLU8bd9Ko_pKzt9kEPt3oJaTzcZuBnnG3NG-azqDu-srmOfD9H8B53YD6pT8ddYfIR7ucv9qt8XZvA47q04P3x-NktaMATad1eld715n0UhRYlZ2A"
                  alt="Editorial sepia-toned portrait of Ms Dee beside a vintage Heidelberg letterpress machine"
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-[#e5e2de]/95 backdrop-blur-sm p-2 flex justify-between items-center text-[#1c1c1a] border-t border-[#1c1c1a] z-10 pointer-events-auto">
                  <EditableText
                    id="makers_page_portrait_caption"
                    defaultText="PLATE 01: MS. DEE"
                    className="font-label-mono-sm text-label-mono-sm uppercase font-bold"
                  />
                  <EditableText
                    id="makers_page_portrait_time"
                    defaultText="VERONA, 07:15 AM"
                    className="font-label-mono-sm text-label-mono-sm uppercase text-[#9e3d00] font-bold"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Three Philosophical Pillars */}
      <section className="w-full bg-[#ebe8e4] py-16 md:py-20 border-y border-[#dec0b4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <EditableText
                id="makers_page_pillars_tag"
                defaultText="[ 02. ANATOMY OF A TRANSIT OBJECT ]"
                className="font-label-mono-md text-label-mono-md uppercase tracking-wider text-[#9e3d00] font-bold block"
              />
              <EditableText
                id="makers_page_pillars_title"
                as="h2"
                defaultText="The Three Foundational Pillars"
                className="font-headline-lg text-headline-lg text-[#1c1c1a] block font-bold"
              />
            </div>
            <EditableText
              id="makers_page_pillars_desc"
              as="p"
              defaultText="Every compendium and zine created in our Verona workshop is physically engineered around three uncompromising physical commitments."
              className="font-body-md text-body-md text-[#574239] max-w-md block"
            />
          </div>

          {/* Bento Grid of the 3 Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar I */}
            <div className="bg-[#ffffff] p-6 shadow-[4px_4px_0px_0px_#1c1c1a] border-2 border-[#1c1c1a] flex flex-col justify-between h-full">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-label-mono-lg text-label-mono-lg text-[#9e3d00] font-bold">PILLAR I</span>
                  <span className="bg-[#f0edea] px-2 py-0.5 border border-[#dec0b4] font-label-mono-sm text-label-mono-sm text-[#574239] font-bold">
                    BINDING
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-[#1c1c1a] font-bold">
                  Engineered for the Tray Table
                </h3>
                <p className="font-body-md text-body-md text-[#574239] leading-relaxed">
                  180° Smyth-sewn layflat cold glue binding. Designed specifically not to snap shut or flap restlessly in the cross-breeze of an open carriage window. Fits standard European rail overcoat pockets and unfolds effortlessly on compact second-class tray tables without sliding.
                </p>
              </div>

              {/* Micro Metric Ledger */}
              <div className="mt-6 bg-[#f6f3ef] p-3 border border-[#dec0b4] flex flex-col gap-1 text-[#574239] font-label-mono-sm text-label-mono-sm">
                <div className="flex justify-between items-center">
                  <span>LAYFLAT ANGLE:</span>
                  <span className="text-[#1c1c1a] font-bold">180.0° COMPLETE FLAT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>WEIGHT CLASS:</span>
                  <span className="text-[#1c1c1a] font-bold">142 GRAMS (PORTABLE)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>COAT POCKET SPEC:</span>
                  <span className="text-[#1c1c1a] font-bold">110 × 178 MM FORM</span>
                </div>
              </div>
            </div>

            {/* Pillar II */}
            <div className="bg-[#ffffff] p-6 shadow-[4px_4px_0px_0px_#1c1c1a] border-2 border-[#1c1c1a] flex flex-col justify-between h-full">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-label-mono-lg text-label-mono-lg text-[#456553] font-bold">PILLAR II</span>
                  <span className="bg-[#f0edea] px-2 py-0.5 border border-[#dec0b4] font-label-mono-sm text-label-mono-sm text-[#574239] font-bold">
                    SOLITUDE
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-[#1c1c1a] font-bold">
                  Unhurried Solitude vs Glare
                </h3>
                <p className="font-body-md text-body-md text-[#574239] leading-relaxed">
                  Why physical crosswords, substitution ciphers, and railway word matrices restore calm: zero notifications, zero battery anxiety, and zero QR code redirects. Just ink, a 2B soft pencil or fountain nib, and uninterrupted mental quiet from departure bell to terminus.
                </p>
              </div>

              {/* Micro Metric Ledger */}
              <div className="mt-6 bg-[#f6f3ef] p-3 border border-[#dec0b4] flex flex-col gap-1 text-[#574239] font-label-mono-sm text-label-mono-sm">
                <div className="flex justify-between items-center">
                  <span>DIGITAL NOISE:</span>
                  <span className="text-[#456553] font-bold">0% DISRUPTIONS</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>BATTERY REQUIREMENT:</span>
                  <span className="text-[#1c1c1a] font-bold">NONE (ETERNAL)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>RECOMMENDED TOOL:</span>
                  <span className="text-[#1c1c1a] font-bold">PALOMINO BLACKWING 602</span>
                </div>
              </div>
            </div>

            {/* Pillar III */}
            <div className="bg-[#ffffff] p-6 shadow-[4px_4px_0px_0px_#1c1c1a] border-2 border-[#1c1c1a] flex flex-col justify-between h-full">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-label-mono-lg text-label-mono-lg text-[#a83029] font-bold">PILLAR III</span>
                  <span className="bg-[#f0edea] px-2 py-0.5 border border-[#dec0b4] font-label-mono-sm text-label-mono-sm text-[#574239] font-bold">
                    PROVENANCE
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-[#1c1c1a] font-bold">
                  Verona Presswork & Paper
                </h3>
                <p className="font-body-md text-body-md text-[#574239] leading-relaxed">
                  Printed on FSC-certified unbleached 120gsm Munken cream stock and heavy cotton-rag cover wraps with two-color vegetable soy inks. We use vintage Heidelberg cylinder presses calibrated to leave a palpable, tactile impression into the fiber of the page.
                </p>
              </div>

              {/* Micro Metric Ledger */}
              <div className="mt-6 bg-[#f6f3ef] p-3 border border-[#dec0b4] flex flex-col gap-1 text-[#574239] font-label-mono-sm text-label-mono-sm">
                <div className="flex justify-between items-center">
                  <span>PAPER SUBSTRATE:</span>
                  <span className="text-[#1c1c1a] font-bold">120GSM MUNKEN CREAM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>INK FORMULA:</span>
                  <span className="text-[#1c1c1a] font-bold">SOY RESIN / PERSIMMON</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>PRESS MACHINERY:</span>
                  <span className="text-[#1c1c1a] font-bold">HEIDELBERG CYLINDER 1968</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inside the Verona Atelier & Archive (Photo Studio Gallery) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-16 md:py-20">
        <div className="flex flex-col gap-2 mb-10">
          <div className="flex items-center justify-between">
            <EditableText
              id="makers_page_gallery_tag"
              defaultText="[ 03. STUDIO GALLERY & PRESS DIARY ]"
              className="font-label-mono-md text-label-mono-md uppercase tracking-wider text-[#9e3d00] font-bold block"
            />
            <span className="font-label-mono-sm text-label-mono-sm text-[#574239] uppercase">
              ARCHIVE FOLIO: AUTUMN DISPATCH
            </span>
          </div>
          <EditableText
            id="makers_page_gallery_title"
            as="h2"
            defaultText="Inside the Verona Atelier & Archive"
            className="font-headline-lg text-headline-lg text-[#1c1c1a] block font-bold"
          />
          <EditableText
            id="makers_page_gallery_desc"
            as="p"
            defaultText="Every compendium is typeset by hand, proofed on cold zinc slabs, and packed in heavy kraft envelopes stamped with the day’s rail departures."
            className="font-body-md text-body-md text-[#574239] max-w-2xl block"
          />
        </div>

        {/* Gallery Triplets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Frame 1 */}
          <div className="bg-[#ffffff] shadow-[4px_4px_0px_0px_#1c1c1a] border-2 border-[#1c1c1a] overflow-hidden flex flex-col group">
            <div className="w-full aspect-[4/3] overflow-hidden relative bg-[#f0edea]">
              <EditableImage
                id="makers_frame1_img"
                defaultSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAak6a9d7zgB7ujopUXtMpyPlmIw35UhQ75JJIuLmS0CXQLN5N_txzbtR86VR0pqi_oRdXj6Ah0cDDSkPP738barwrSbXjMYnV4m7hWd43mlAx9VgA2LqZp8zi4bQsAL0Hi3cvE8MpYdXrmNEh-WhVggGjQba50KdQCbWy7QHJoFgdk3pO99hgDK7DUp2XZx469xP40qefsF3Fzwgv9SCNIvAj2UVjqsesC0kRzGmFA-34-iqqqcuVi1Q"
                alt="Close-up photograph of an antique wooden typesetting type drawer in an Italian letterpress workshop"
                className="w-full h-full"
                imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 bg-[#fcf9f5]/90 px-2 py-0.5 border border-[#dec0b4] font-label-mono-sm text-label-mono-sm uppercase text-[#1c1c1a] font-bold z-10 pointer-events-auto">
                FRAME 01 • TYPESET
              </div>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h4 className="font-title-editorial text-title-editorial text-[#1c1c1a] font-bold">
                The Typesetting Drawer
              </h4>
              <p className="font-body-sm text-body-sm text-[#574239]">
                Hand-set Monotype lead fonts & vintage brass railway timetable rules. Each puzzle grid is mechanically calculated and locked into steel chases.
              </p>
              <div className="flex items-center justify-between text-[#574239] font-label-mono-sm text-label-mono-sm pt-2 border-t border-[#dec0b4]">
                <span>LEAD ALLOY 12PT</span>
                <span className="text-[#9e3d00] uppercase font-bold">STAMPED 18.09.24</span>
              </div>
            </div>
          </div>

          {/* Frame 2 */}
          <div className="bg-[#ffffff] shadow-[4px_4px_0px_0px_#1c1c1a] border-2 border-[#1c1c1a] overflow-hidden flex flex-col group">
            <div className="w-full aspect-[4/3] overflow-hidden relative bg-[#f0edea]">
              <EditableImage
                id="makers_frame2_img"
                defaultSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAZfzDyHyo2kslzDA6bwzu9t_eroVx2-GfdKD628JagkoVPNELrdGBDfsqwgseFKGO5fBdiYlLYoLLarJQKwh7lzjaY6GRkfFt0eyP5kDLhpC2EJSleZlOwlLFCIIaF3VYvWXPD1JzCff7jVs2Sg3hBj_k1EaRm2rnvtuXoES3rStuy9ay-gBmkFB1mZiqI2TYtovB0qwfosaN4-0_AJtX7RNJj-jgv3ZOXrOn9B0baILMsAxO7BsxQYg"
                alt="Artisanal dual Risograph printing drums in an Italian printmaker workshop"
                className="w-full h-full"
                imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 bg-[#fcf9f5]/90 px-2 py-0.5 border border-[#dec0b4] font-label-mono-sm text-label-mono-sm uppercase text-[#1c1c1a] font-bold z-10 pointer-events-auto">
                FRAME 02 • SEPARATION
              </div>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h4 className="font-title-editorial text-title-editorial text-[#1c1c1a] font-bold">
                The Risograph Drums
              </h4>
              <p className="font-body-sm text-body-sm text-[#574239]">
                Verona Green & Burnt Persimmon ink drums. We run deliberate mis-registrations of 0.4mm to honor the organic character of rapid railway printing.
              </p>
              <div className="flex items-center justify-between text-[#574239] font-label-mono-sm text-label-mono-sm pt-2 border-t border-[#dec0b4]">
                <span>DUO-TONE SOY RESIN</span>
                <span className="text-[#9e3d00] uppercase font-bold">STAMPED 22.09.24</span>
              </div>
            </div>
          </div>

          {/* Frame 3 */}
          <div className="bg-[#ffffff] shadow-[4px_4px_0px_0px_#1c1c1a] border-2 border-[#1c1c1a] overflow-hidden flex flex-col group">
            <div className="w-full aspect-[4/3] overflow-hidden relative bg-[#f0edea]">
              <EditableImage
                id="makers_frame3_img"
                defaultSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBBXsi66dwlnvXscS4WNKxJa7QwzXdlrK-I0a37zhSx6D5S4d9sx8ysYA-AH-OIAG-WUy6NsPaY7BOnShLfTwArE1UcmUBfEEqLDHc2nEEgYVLkmIQDLrF7I-flzpjYC53fLyHKh6gR6f-6adMJ9E3EUYL4NVkdVyaly2ddcEsjiIjZpKPzgKaxcOKwn16jlPbtVz4cU0gUDUdZRtEKvX-otj32HyxkY7CD62wisv2vxwWRdFHhxeNf_Q"
                alt="Editorial still life of unbleached cream Munken paper prints drying flat under brass weights"
                className="w-full h-full"
                imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 bg-[#fcf9f5]/90 px-2 py-0.5 border border-[#dec0b4] font-label-mono-sm text-label-mono-sm uppercase text-[#1c1c1a] font-bold z-10 pointer-events-auto">
                FRAME 03 • PROOFING
              </div>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h4 className="font-title-editorial text-title-editorial text-[#1c1c1a] font-bold">
                The Proofing Table
              </h4>
              <p className="font-body-sm text-body-sm text-[#574239]">
                First impressions of Volume 03 Word Searches drying under weighted brass bars. Inspected by hand under magnifying glass before bindery collation.
              </p>
              <div className="flex items-center justify-between text-[#574239] font-label-mono-sm text-label-mono-sm pt-2 border-t border-[#dec0b4]">
                <span>MUNKEN CREAM 120GSM</span>
                <span className="text-[#9e3d00] uppercase font-bold">STAMPED 26.09.24</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Postal Desk & Wire Inquiries Desk (Contact Section) */}
      <section className="w-full bg-[#f0edea] py-16 md:py-20 border-t border-[#dec0b4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="flex flex-col gap-1 mb-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#456553]"></span>
              <EditableText
                id="makers_page_contact_tag"
                defaultText="[ 04. POSTAL INQUIRIES & DISPATCH DESK ]"
                className="font-label-mono-md text-label-mono-md uppercase tracking-wider text-[#574239] font-bold block"
              />
            </div>
            <EditableText
              id="makers_page_contact_title"
              as="h2"
              defaultText="Studio Postal Desk & Wire Inquiries"
              className="font-headline-lg text-headline-lg text-[#1c1c1a] block font-bold"
            />
            <EditableText
              id="makers_page_contact_desc"
              as="p"
              defaultText="Whether you are an independent station kiosk owner, a railway traveler with a solve story, or seeking bespoke editions for a continental passage."
              className="font-body-md text-body-md text-[#574239] max-w-xl block"
            />
          </div>

          {/* Main Postal Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Direct Coordinates & Hours Ledger */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Postal Coordinates Card */}
              <div className="bg-[#ffffff] p-6 shadow-[4px_4px_0px_0px_#1c1c1a] border-2 border-[#1c1c1a] flex flex-col gap-4">
                <div className="flex items-center gap-2 text-[#9e3d00]">
                  <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                  <span className="font-label-mono-sm text-label-mono-sm uppercase font-bold tracking-wider">
                    Direct Physical Post
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-headline-sm text-headline-sm text-[#1c1c1a] font-bold">
                    ORMA Presswork & Atelier
                  </p>
                  <p className="font-body-md text-body-md text-[#574239]">
                    Via Sottoriva 14<br />37121 Verona VR, Italy
                  </p>
                  <div className="mt-3 bg-[#f6f3ef] p-3 border border-[#dec0b4]">
                    <span className="font-label-mono-sm text-label-mono-sm text-[#574239] uppercase block font-bold">
                      MILANO OUTPOST:
                    </span>
                    <span className="font-body-sm text-body-sm text-[#1c1c1a]">
                      Milano Centrale Platform 04 Kiosk Annex
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Wire Lines Card */}
              <div className="bg-[#ffffff] p-6 shadow-[4px_4px_0px_0px_#1c1c1a] border-2 border-[#1c1c1a] flex flex-col gap-4">
                <div className="flex items-center gap-2 text-[#456553]">
                  <span className="material-symbols-outlined text-[20px]">contact_mail</span>
                  <span className="font-label-mono-sm text-label-mono-sm uppercase font-bold tracking-wider">
                    Telegraph & Electric Mail
                  </span>
                </div>
                <div className="space-y-2 font-label-mono-sm text-label-mono-sm">
                  <div className="flex justify-between items-center bg-[#f6f3ef] p-2.5 border border-[#dec0b4]">
                    <span className="text-[#574239] uppercase font-bold">GENERAL DESK:</span>
                    <span className="text-[#1c1c1a] font-bold">studio@ormaeditions.com</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#f6f3ef] p-2.5 border border-[#dec0b4]">
                    <span className="text-[#574239] uppercase font-bold">STOCKISTS & KIOSKS:</span>
                    <span className="text-[#1c1c1a] font-bold">kiosk@ormaeditions.com</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#f6f3ef] p-2.5 border border-[#dec0b4]">
                    <span className="text-[#574239] uppercase font-bold">PRESS & BROADCAST:</span>
                    <span className="text-[#1c1c1a] font-bold">press@ormaeditions.com</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#f6f3ef] p-2.5 border border-[#dec0b4]">
                    <span className="text-[#574239] uppercase font-bold">STUDIO TELEPHONE:</span>
                    <span className="text-[#1c1c1a] font-bold">+39 045 803 2199</span>
                  </div>
                </div>
              </div>

              {/* Friday Reader Correspondence Ritual */}
              <div className="bg-[#ebe8e4] p-4 shadow-sm border border-[#dec0b4] flex items-start gap-4">
                <span className="material-symbols-outlined text-[#9e3d00] text-[28px] shrink-0 mt-1">coffee</span>
                <div className="flex flex-col gap-1">
                  <h4 className="font-label-mono-md text-label-mono-md uppercase text-[#1c1c1a] font-bold">
                    The Friday Morning Espresso Ritual
                  </h4>
                  <p className="font-body-sm text-body-sm text-[#574239] italic leading-relaxed">
                    “Every postal letter received is read by Ms. Dee on Friday mornings with espresso. Replies sent via standard post or electronic telegram within 3 business days.”
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Dispatch Form Styled as Station Telegraph */}
            <div className="lg:col-span-7 bg-[#ffffff] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#1c1c1a] border-2 border-[#1c1c1a] relative">
              {/* Postal Heading Tag */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 bg-[#f6f3ef] px-4 py-2 border border-[#dec0b4]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#9e3d00] text-[20px]">send_time_extension</span>
                  <span className="font-label-mono-sm text-label-mono-sm uppercase font-bold text-[#1c1c1a]">
                    DISPATCH DISPATCH VOUCHER #504
                  </span>
                </div>
                <span className="font-label-mono-sm text-label-mono-sm text-[#574239] uppercase font-bold">
                  PRIORITY: REGISTERED POST
                </span>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Row 1: Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-label-mono-sm text-label-mono-sm uppercase text-[#1c1c1a] font-bold" htmlFor="sender-name">
                        Sender Name & Calling
                      </label>
                      <input
                        id="sender-name"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="e.g. Giuliano Rossi (Reader / Flâneur)"
                        required
                        type="text"
                        className="w-full bg-[#f6f3ef] px-3 py-2 text-[#1c1c1a] font-body-md text-body-md placeholder:text-[#574239]/50 focus:outline-none border border-[#dec0b4] focus:border-[#9e3d00]"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-label-mono-sm text-label-mono-sm uppercase text-[#1c1c1a] font-bold" htmlFor="return-post">
                        Return Email or Post Address
                      </label>
                      <input
                        id="return-post"
                        value={returnPost}
                        onChange={(e) => setReturnPost(e.target.value)}
                        placeholder="g.rossi@ferrovie.it or Physical Postal Box"
                        required
                        type="text"
                        className="w-full bg-[#f6f3ef] px-3 py-2 text-[#1c1c1a] font-body-md text-body-md placeholder:text-[#574239]/50 focus:outline-none border border-[#dec0b4] focus:border-[#9e3d00]"
                      />
                    </div>
                  </div>

                  {/* Row 2: Nature of Transmission */}
                  <div className="flex flex-col gap-1">
                    <label className="font-label-mono-sm text-label-mono-sm uppercase text-[#1c1c1a] font-bold" htmlFor="dispatch-reason">
                      Nature of Dispatch Transmission
                    </label>
                    <select
                      id="dispatch-reason"
                      value={dispatchReason}
                      onChange={(e) => setDispatchReason(e.target.value)}
                      className="w-full bg-[#f6f3ef] px-3 py-2 text-[#1c1c1a] font-body-md text-body-md border border-[#dec0b4] focus:outline-none focus:border-[#9e3d00] cursor-pointer"
                    >
                      <option value="story">Transit Story & Solitary Reader Letter</option>
                      <option value="stockist">Stockist & Station Bookstall Wholesale Orders</option>
                      <option value="press">Press, Editorial & Literary Reviews</option>
                      <option value="cipher">Cipher Verification / Puzzle Enigma Check</option>
                      <option value="general">General Studio Inquiry</option>
                    </select>
                  </div>

                  {/* Row 3: Journey Reference / Train Line */}
                  <div className="flex flex-col gap-1">
                    <label className="font-label-mono-sm text-label-mono-sm uppercase text-[#574239]" htmlFor="railway-line">
                      Associated Journey / Line (Optional)
                    </label>
                    <input
                      id="railway-line"
                      value={railwayLine}
                      onChange={(e) => setRailwayLine(e.target.value)}
                      placeholder="e.g. EuroCity 84 (Bologna – Innsbruck) • Seat 42 Window"
                      type="text"
                      className="w-full bg-[#f6f3ef] px-3 py-2 text-[#1c1c1a] font-body-md text-body-md placeholder:text-[#574239]/50 border border-[#dec0b4] focus:outline-none focus:border-[#9e3d00]"
                    />
                  </div>

                  {/* Row 4: Narrative / Message Field */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <label className="font-label-mono-sm text-label-mono-sm uppercase text-[#1c1c1a] font-bold" htmlFor="dispatch-message">
                        Your Message to Verona Desk
                      </label>
                      <span className="font-label-mono-sm text-label-mono-sm text-[#574239]">
                        PLAIN TEXT • UNLIMITED
                      </span>
                    </div>
                    <textarea
                      id="dispatch-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your note to Ms. Dee and our Verona printers... Share a train carriage experience, an enquiry on paper stock, or your favourite crossword puzzle clue."
                      required
                      rows={5}
                      className="w-full bg-[#f6f3ef] px-3 py-2 text-[#1c1c1a] font-body-md text-body-md placeholder:text-[#574239]/50 border border-[#dec0b4] focus:outline-none focus:border-[#9e3d00] resize-y"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-2 pt-1">
                    <input
                      id="archive-permission"
                      type="checkbox"
                      checked={archivePermission}
                      onChange={(e) => setArchivePermission(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-[#9e3d00] accent-[#9e3d00] cursor-pointer"
                    />
                    <label className="font-body-sm text-body-sm text-[#574239] select-none cursor-pointer" htmlFor="archive-permission">
                      You may preserve an excerpt of this reader reflection in our physical studio folio archive (names anonymized upon request).
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-[#9e3d00] hover:bg-[#c15316] text-[#ffffff] font-label-mono-md text-label-mono-md uppercase px-8 py-3.5 shadow-[3px_3px_0px_0px_#1c1c1a] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center justify-center gap-2 tracking-wider font-bold cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">mark_email_read</span>
                      <span>Dispatch to Verona Desk</span>
                    </button>
                    <div className="flex items-center gap-1.5 text-[#574239] font-label-mono-sm text-label-mono-sm uppercase font-bold">
                      <span className="material-symbols-outlined text-[16px] text-[#456553]">lock</span>
                      <span>NO ALGORITHMS • CONFIDENTIAL</span>
                    </div>
                  </div>
                </form>
              ) : (
                /* Interactive Success State */
                <div className="flex flex-col items-center justify-center text-center py-10 gap-3 bg-[#f6f3ef] p-8 border border-[#dec0b4] animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-[#c4e8d1] flex items-center justify-center text-[#496a57] border border-[#456553]/30">
                    <span className="material-symbols-outlined text-[32px]">check_circle</span>
                  </div>
                  <span className="font-label-mono-sm text-label-mono-sm uppercase text-[#456553] font-bold tracking-widest">
                    DISPATCH REGISTERED
                  </span>
                  <h3 className="font-headline-md text-headline-md text-[#1c1c1a] font-bold">
                    Transmission Stamped & Filed
                  </h3>
                  <p className="font-body-md text-body-md text-[#574239] max-w-md leading-relaxed">
                    Your note has been received by our Verona atelier telegraph log. It will rest in Ms. Dee's physical tray for Friday morning review with fresh espresso.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="mt-2 font-label-mono-sm text-label-mono-sm uppercase text-[#9e3d00] hover:underline tracking-wider font-bold cursor-pointer"
                  >
                    ← Send another transmission
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Colophon & Quotation Footnote */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-12">
        <div className="bg-[#f6f3ef] p-6 shadow-[3px_3px_0px_0px_#1c1c1a] border border-[#1c1c1a] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#ebe8e4] border border-[#dec0b4] flex items-center justify-center text-[#1c1c1a]">
              <span className="material-symbols-outlined text-[20px]">menu_book</span>
            </div>
            <div className="flex flex-col">
              <span className="font-title-editorial text-title-editorial text-[#1c1c1a] font-bold">
                Explore the Physical Catalog
              </span>
              <span className="font-body-sm text-body-sm text-[#574239]">
                Discover our active editions of Caesar Ciphers and Railway Word Searches.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => onNavigate('editions-and-archive')}
              className="w-full md:w-auto text-center bg-[#ffffff] hover:bg-[#ebe8e4] text-[#1c1c1a] font-label-mono-sm text-label-mono-sm uppercase px-4 py-2 border border-[#1c1c1a] shadow-xs transition-colors tracking-wider font-bold cursor-pointer"
              type="button"
            >
              View Archive Folio
            </button>
            <button
              onClick={() => onNavigate('featured-solve-caesar-cipher')}
              className="w-full md:w-auto text-center bg-[#9e3d00] hover:bg-[#c15316] text-white font-label-mono-sm text-label-mono-sm uppercase px-4 py-2 shadow-xs transition-colors tracking-wider font-bold cursor-pointer"
              type="button"
            >
              Try Caesar Cipher #04
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
