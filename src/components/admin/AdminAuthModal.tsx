import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';

export const AdminAuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login } = useAdmin();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isAuthModalOpen) {
      setPin('');
      setError(false);
    }
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(pin);
    if (!success) {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1c1a]/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#fcf9f5] border-2 border-[#1c1c1a] shadow-[8px_8px_0px_0px_#1c1c1a] p-6 sm:p-8">
        {/* Header Strip */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#dec0b4]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-ping"></span>
            <span className="font-label-mono-sm text-xs uppercase tracking-widest text-[#9e3d00] font-bold">
              ORMA STUDIO TERMINAL • AUTH
            </span>
          </div>
          <button
            type="button"
            onClick={closeAuthModal}
            className="text-[#574239] hover:text-[#1c1c1a] cursor-pointer"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="mb-6">
          <h2 className="font-headline-md text-2xl text-[#1c1c1a] font-bold">
            Enter Admin Access PIN
          </h2>
          <p className="font-body-sm text-sm text-[#574239] mt-1 leading-relaxed">
            Please enter your administrative PIN to activate Inline Edit Mode for typography, content keys, and image assets. (Default PIN: <strong className="font-mono text-[#9e3d00] bg-[#ffdbcc] px-1 py-0.5">1994</strong>)
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="font-label-mono-sm text-xs uppercase text-[#1c1c1a] font-bold block mb-1">
              Admin PIN / Passcode
            </label>
            <input
              type="password"
              autoFocus
              maxLength={12}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              placeholder="e.g. 1994"
              className={`w-full bg-[#f0edea] p-3 text-center font-mono text-xl tracking-widest border-2 focus:bg-white focus:outline-none transition-colors ${
                error ? 'border-red-600 bg-red-50 text-red-900' : 'border-[#1c1c1a]'
              }`}
            />
            {error && (
              <p className="font-label-mono-sm text-xs text-red-600 mt-1 font-bold animate-shake">
                Incorrect PIN. Default is 1994.
              </p>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={closeAuthModal}
              className="flex-1 bg-[#f0edea] hover:bg-[#ebe8e4] text-[#1c1c1a] py-2.5 font-label-mono-sm text-xs uppercase font-bold tracking-wider border border-[#1c1c1a] cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#9e3d00] hover:bg-[#c15316] text-white py-2.5 font-label-mono-sm text-xs uppercase font-bold tracking-wider shadow-[3px_3px_0px_0px_#1c1c1a] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            >
              Unlock Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
