import React, { useState } from 'react';
import { CartItem } from '../types';

interface CarriageBagModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearBag: () => void;
  discountCode: string;
  onApplyDiscount: (code: string) => boolean;
  discountPercent: number;
}

export const CarriageBagModal: React.FC<CarriageBagModalProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearBag,
  discountCode,
  onApplyDiscount,
  discountPercent,
}) => {
  const [voucherInput, setVoucherInput] = useState('');
  const [voucherMessage, setVoucherMessage] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [destinationStation, setDestinationStation] = useState('Milan Centrale, Platform 4 Courier Locker');
  const [transitNote, setTransitNote] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const finalTotal = subtotal - discountAmount;

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherInput.trim()) return;
    const success = onApplyDiscount(voucherInput.trim());
    if (success) {
      setVoucherMessage('✓ Voucher ENIGMA10 Stamped: 10% Solitude Courtesy Applied');
    } else {
      setVoucherMessage('Invalid telegraph coupon code. Try solving Enigma Plate #01');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutComplete(true);
    setTimeout(() => {
      onClearBag();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-[#1c1c1a]/60 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop click to dismiss */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-xl h-full bg-[#fcf9f5] shadow-2xl flex flex-col justify-between z-10 border-l border-[#1c1c1a] overflow-y-auto">
        {/* Drawer Header */}
        <div className="p-6 bg-[#ebe8e4] border-b border-[#1c1c1a] flex items-center justify-between sticky top-0 z-20">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#9e3d00] animate-pulse"></span>
              <span className="font-label-mono-sm text-label-mono-sm uppercase text-[#574239] font-bold tracking-widest">
                TRANSIT LUGGAGE MANIFEST
              </span>
            </div>
            <h2 className="font-headline-md text-headline-md text-[#1c1c1a] font-bold mt-1">
              Your Carriage Bag
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center text-[#1c1c1a] hover:bg-[#dec0b4] transition-colors cursor-pointer"
            aria-label="Close Carriage Bag"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 flex flex-col gap-6">
          {checkoutComplete ? (
            <div className="bg-[#f0edea] p-6 border-2 border-[#1c1c1a] shadow-[4px_4px_0px_0px_#1c1c1a] text-center my-auto animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#c7ebd4] text-[#002113] flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-[32px]">mark_email_read</span>
              </div>
              <span className="font-label-mono-sm text-label-mono-sm uppercase text-[#456553] font-bold tracking-widest block mb-1">
                DISPATCH SEAL NO. #ORMA-PARCEL-9182
              </span>
              <h3 className="font-headline-md text-headline-md text-[#1c1c1a] font-bold mb-2">
                Parcel Stamped & Registered
              </h3>
              <p className="font-body-md text-body-md text-[#574239] mb-4">
                Your tactile editions are being hand-wrapped in stiff unbleached corrugated fiberboard with authentic Verona postal wax stamps.
              </p>
              <div className="bg-[#fcf9f5] p-3 text-left font-label-mono-sm text-label-mono-sm border border-[#dec0b4] mb-6">
                <div><strong>DESTINATION:</strong> {destinationStation}</div>
                <div><strong>RECIPIENT:</strong> {recipientName || 'Solitary Railway Reader'}</div>
                <div><strong>TRACKING TELEGRAPH:</strong> VERONA-EXP-0881</div>
              </div>
              <button
                onClick={() => {
                  setCheckoutComplete(false);
                  setIsCheckingOut(false);
                  onClose();
                }}
                className="w-full bg-[#1c1c1a] hover:bg-[#9e3d00] text-[#fcf9f5] font-label-mono-md text-label-mono-md uppercase py-3 font-bold transition-colors"
              >
                Return to Station Kiosk
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Checkout Manifest Form */
            <form onSubmit={handleCompleteOrder} className="flex flex-col gap-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-[#dec0b4]">
                <h3 className="font-headline-sm text-headline-sm text-[#1c1c1a] font-bold">
                  Postal Delivery Ledger
                </h3>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="font-label-mono-sm text-label-mono-sm text-[#9e3d00] hover:underline uppercase"
                >
                  ← Back to Bag Items
                </button>
              </div>

              <div>
                <label className="font-label-mono-sm text-label-mono-sm uppercase text-[#1c1c1a] font-bold block mb-1">
                  Recipient Passenger Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. M. Castiglione"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full bg-[#f0edea] p-2.5 font-body-md text-body-md border border-[#1c1c1a] focus:bg-white"
                />
              </div>

              <div>
                <label className="font-label-mono-sm text-label-mono-sm uppercase text-[#1c1c1a] font-bold block mb-1">
                  Delivery Station / Street Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Station parcel locker or postal domicile"
                  value={destinationStation}
                  onChange={(e) => setDestinationStation(e.target.value)}
                  className="w-full bg-[#f0edea] p-2.5 font-body-md text-body-md border border-[#1c1c1a] focus:bg-white"
                />
              </div>

              <div>
                <label className="font-label-mono-sm text-label-mono-sm uppercase text-[#1c1c1a] font-bold block mb-1">
                  Luggage Tag Inscription (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Personal note stamped on the glassine wrap..."
                  value={transitNote}
                  onChange={(e) => setTransitNote(e.target.value)}
                  className="w-full bg-[#f0edea] p-2.5 font-body-md text-body-md border border-[#1c1c1a] focus:bg-white"
                />
              </div>

              <div className="bg-[#f0edea] p-4 border border-[#dec0b4] font-label-mono-sm text-label-mono-sm text-[#574239]">
                <div className="flex justify-between pb-1">
                  <span>ITEMS SUB-TOTAL:</span>
                  <span className="font-bold text-[#1c1c1a]">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between pb-1 text-[#456553] font-bold">
                    <span>SOLITUDE DISCOUNT (10%):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between pb-1">
                  <span>TRACKED RAILWAY POST:</span>
                  <span className="font-bold text-[#456553]">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#dec0b4] text-base font-bold text-[#1c1c1a]">
                  <span>FINAL TOTAL:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#9e3d00] hover:bg-[#c15316] text-white font-label-mono-lg text-label-mono-lg uppercase py-3 font-bold tracking-wider shadow-[4px_4px_0px_0px_#1c1c1a] active:translate-x-1 active:translate-y-1 transition-all"
              >
                Seal & Transmit Parcel (${finalTotal.toFixed(2)})
              </button>
            </form>
          ) : items.length === 0 ? (
            <div className="text-center py-12 my-auto">
              <span className="material-symbols-outlined text-[48px] text-[#dec0b4] mb-2">
                shopping_bag
              </span>
              <h3 className="font-headline-sm text-headline-sm text-[#1c1c1a] font-bold">
                Your Carriage Bag is Empty
              </h3>
              <p className="font-body-md text-body-md text-[#574239] mt-1 max-w-xs mx-auto">
                No printed puzzle compendiums have been stowed for your journey yet.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-[#9e3d00] text-white font-label-mono-sm text-label-mono-sm uppercase font-bold tracking-wider shadow"
              >
                Inspect Station Kiosk
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 bg-[#f0edea] border border-[#dec0b4] shadow-sm items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover border border-[#1c1c1a] shrink-0 bg-[#ebe8e4]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#1c1c1a] text-white font-label-mono-sm text-[10px] px-1.5 py-0.5">
                          {item.tag}
                        </span>
                        {item.binding && (
                          <span className="font-label-mono-sm text-[10px] text-[#574239] uppercase">
                            {item.binding}
                          </span>
                        )}
                      </div>
                      <h4 className="font-headline-sm text-base text-[#1c1c1a] font-bold truncate mt-0.5">
                        {item.title}
                      </h4>
                      <div className="font-headline-sm text-[#9e3d00] font-bold mt-0.5">
                        ${item.price.toFixed(2)}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="inline-flex items-center border border-[#1c1c1a] bg-white">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-6 h-6 flex items-center justify-center font-bold text-sm hover:bg-[#ebe8e4]"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-label-mono-sm text-xs font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-6 h-6 flex items-center justify-center font-bold text-sm hover:bg-[#ebe8e4]"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="font-label-mono-sm text-xs text-[#a83029] hover:underline uppercase ml-2"
                        >
                          Unpack
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Voucher Code Form */}
              <form onSubmit={handleApplyVoucher} className="bg-[#f0edea] p-3 border border-[#dec0b4]">
                <label className="font-label-mono-sm text-label-mono-sm uppercase text-[#1c1c1a] font-bold block mb-1">
                  Enigma Coupon / Voucher Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={voucherInput}
                    onChange={(e) => setVoucherInput(e.target.value.toUpperCase())}
                    placeholder="e.g. ENIGMA10"
                    className="flex-1 bg-white px-3 py-1.5 font-label-mono-sm text-sm uppercase tracking-wider border border-[#dec0b4]"
                  />
                  <button
                    type="submit"
                    className="bg-[#1c1c1a] text-white px-4 py-1.5 font-label-mono-sm text-xs uppercase font-bold tracking-wider hover:bg-[#9e3d00] transition-colors"
                  >
                    Stamp
                  </button>
                </div>
                {voucherMessage && (
                  <p
                    className={`font-label-mono-sm text-[11px] mt-1.5 ${
                      voucherMessage.startsWith('✓') ? 'text-[#456553] font-bold' : 'text-[#a83029]'
                    }`}
                  >
                    {voucherMessage}
                  </p>
                )}
                {discountCode && !voucherMessage && (
                  <p className="font-label-mono-sm text-[11px] text-[#456553] font-bold mt-1">
                    ✓ Applied Voucher: {discountCode} (10% Courtesy)
                  </p>
                )}
              </form>

              {/* Shipping Guarantee notice */}
              <div className="flex items-center gap-2 p-3 bg-[#e5e2de] text-xs font-label-mono-sm text-[#574239]">
                <span className="material-symbols-outlined text-[18px] text-[#456553]">inventory_2</span>
                <span>
                  Hand-wrapped in archival glassine envelopes with serialized railway baggage tags.
                </span>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer with Totals & Action */}
        {!checkoutComplete && !isCheckingOut && items.length > 0 && (
          <div className="p-6 bg-[#ebe8e4] border-t border-[#1c1c1a] sticky bottom-0 z-20">
            <div className="flex justify-between items-baseline mb-1 font-label-mono-sm text-xs text-[#574239]">
              <span>LEDGER SUB-TOTAL:</span>
              <span className="text-base text-[#1c1c1a] font-bold">${subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between items-baseline mb-2 font-label-mono-sm text-xs text-[#456553] font-bold">
                <span>SOLITUDE ENIGMA DISCOUNT (10%):</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between items-baseline mb-4 font-headline-sm text-xl text-[#1c1c1a] font-bold pt-2 border-t border-[#dec0b4]">
              <span>PAYABLE TOTAL:</span>
              <span className="text-[#9e3d00]">${finalTotal.toFixed(2)}</span>
            </div>

            <button
              onClick={() => setIsCheckingOut(true)}
              className="w-full bg-[#9e3d00] hover:bg-[#c15316] text-white font-label-mono-lg text-label-mono-lg uppercase py-3.5 px-4 shadow-[4px_4px_0px_0px_#1c1c1a] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2 font-bold tracking-wider cursor-pointer"
            >
              <span>Proceed to Station Checkout</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
