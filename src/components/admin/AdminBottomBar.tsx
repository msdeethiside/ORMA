import React from 'react';
import { useAdmin } from '../../context/AdminContext';

export const AdminBottomBar: React.FC = () => {
  const {
    isAdmin,
    hasUnsavedChanges,
    pendingChanges,
    saveChanges,
    discardChanges,
    resetToDefaults,
    logout,
    savedToast,
    isSaving,
    saveError,
  } = useAdmin();

  if (!isAdmin) return null;

  const pendingCount = Object.keys(pendingChanges).length;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 animate-slideUp">
      <div className="bg-[#1c1c1a] text-[#ffffff] px-4 py-3 sm:px-6 sm:py-3.5 border-2 border-sky-400 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-wrap items-center justify-between gap-3">
        {/* Left: Status badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#31302e] px-2.5 py-1 border border-white/20">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-label-mono-sm text-xs font-bold uppercase tracking-wider text-white">
              Admin Mode Active
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-label-mono-sm text-xs">
            {hasUnsavedChanges ? (
              <span className="text-amber-300 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                {pendingCount} unsaved change{pendingCount > 1 ? 's' : ''} (staged)
              </span>
            ) : (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">cloud_done</span>
                Synced with Cloud Firestore
              </span>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {hasUnsavedChanges && !isSaving && (
            <button
              type="button"
              onClick={discardChanges}
              className="px-3 py-1.5 bg-[#31302e] hover:bg-[#4a4744] text-[#dec0b4] hover:text-white font-label-mono-sm text-xs uppercase tracking-wider transition-colors cursor-pointer border border-white/10"
              title="Revert unsaved edits"
            >
              Discard
            </button>
          )}

          <button
            type="button"
            onClick={resetToDefaults}
            disabled={isSaving}
            className="hidden md:inline-block px-2.5 py-1.5 bg-transparent hover:bg-white/10 text-stone-400 hover:text-white font-label-mono-sm text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
            title="Reset all content to original defaults in Firestore"
          >
            Reset Defaults
          </button>

          {/* Save Changes button */}
          <button
            type="button"
            onClick={saveChanges}
            disabled={!hasUnsavedChanges || isSaving}
            className={`px-4 py-1.5 sm:py-2 font-label-mono-sm text-xs uppercase font-bold tracking-wider flex items-center gap-1.5 shadow transition-all cursor-pointer ${
              hasUnsavedChanges && !isSaving
                ? 'bg-sky-500 hover:bg-sky-400 text-white shadow-[0_0_15px_rgba(56,189,248,0.5)] active:scale-95'
                : 'bg-stone-700 text-stone-400 cursor-not-allowed opacity-80'
            }`}
          >
            {isSaving ? (
              <>
                <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                <span>Saving to Cloud...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">cloud_upload</span>
                <span>Save Changes</span>
              </>
            )}
          </button>

          {/* Exit Admin Mode button */}
          <button
            type="button"
            onClick={logout}
            className="px-3 py-1.5 sm:py-2 bg-red-900/80 hover:bg-red-800 text-white font-label-mono-sm text-xs uppercase font-bold tracking-wider transition-colors flex items-center gap-1 cursor-pointer border border-red-500/50"
            title="Clears admin session and redirects to /"
          >
            <span className="material-symbols-outlined text-[15px]">logout</span>
            <span>Exit Admin Mode</span>
          </button>
        </div>
      </div>

      {savedToast && (
        <div className="mt-2 text-center bg-emerald-600 text-white py-1.5 px-4 font-label-mono-sm text-xs uppercase tracking-wider font-bold shadow-lg border border-emerald-400 animate-fadeIn">
          ✓ All batch changes saved permanently to Cloud Firestore!
        </div>
      )}

      {saveError && (
        <div className="mt-2 text-center bg-red-700 text-white py-1.5 px-4 font-label-mono-sm text-xs uppercase tracking-wider font-bold shadow-lg border border-red-500 animate-fadeIn">
          ⚠ {saveError}
        </div>
      )}
    </div>
  );
};
