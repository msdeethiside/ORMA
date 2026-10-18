import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';

export const ImageSwapModal: React.FC = () => {
  const { activeImageModal, closeImageModal, applyImageSwap } = useAdmin();
  const [imageUrl, setImageUrl] = useState('');
  const [previewSrc, setPreviewSrc] = useState('');
  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    if (activeImageModal) {
      setImageUrl(activeImageModal.currentSrc);
      setPreviewSrc(activeImageModal.currentSrc);
      setFileError(null);
    }
  }, [activeImageModal]);

  if (!activeImageModal) return null;

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setImageUrl(val);
    setPreviewSrc(val);
    setFileError(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFileError('Please select a valid image file (PNG, JPG, WebP, SVG).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size is larger than 5MB. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewSrc(result);
      setImageUrl(result);
      setFileError(null);
    };
    reader.onerror = () => {
      setFileError('Failed to read file from local drive.');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (previewSrc.trim()) {
      applyImageSwap(activeImageModal.key, previewSrc.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1c1a]/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#fcf9f5] border-2 border-[#1c1c1a] shadow-[8px_8px_0px_0px_#1c1c1a] p-6 sm:p-8 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#dec0b4]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-600 text-[22px]">photo_camera</span>
            <span className="font-label-mono-sm text-xs uppercase tracking-widest text-[#1c1c1a] font-bold">
              SWAP IMAGE ASSET • [KEY: {activeImageModal.key}]
            </span>
          </div>
          <button
            type="button"
            onClick={closeImageModal}
            className="text-[#574239] hover:text-[#1c1c1a] cursor-pointer"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Live Preview Box */}
        <div className="flex flex-col gap-2">
          <label className="font-label-mono-sm text-xs uppercase text-[#574239] font-bold">
            Live Preview
          </label>
          <div className="w-full h-48 bg-[#f0edea] border-2 border-[#1c1c1a] flex items-center justify-center overflow-hidden relative">
            {previewSrc ? (
              <img
                src={previewSrc}
                alt="Image Preview"
                className="w-full h-full object-cover"
                onError={() => setFileError('Image preview failed to load from this URL.')}
              />
            ) : (
              <span className="font-label-mono-sm text-xs text-[#574239]">No image selected</span>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Method 1: Upload File directly */}
          <div>
            <label className="font-label-mono-sm text-xs uppercase text-[#1c1c1a] font-bold block mb-1">
              Option 1: Upload New Image File Directly
            </label>
            <label className="w-full bg-[#f0edea] hover:bg-[#e5e2de] border border-[#1c1c1a] py-2 px-3 flex items-center justify-center gap-2 cursor-pointer font-label-mono-sm text-xs uppercase font-bold text-[#1c1c1a] transition-colors">
              <span className="material-symbols-outlined text-[18px]">upload_file</span>
              <span>Choose Image File (PNG, JPG, WebP)</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex items-center gap-2 text-xs font-label-mono-sm uppercase text-[#574239]">
            <span className="flex-1 border-t border-[#dec0b4]"></span>
            <span>OR</span>
            <span className="flex-1 border-t border-[#dec0b4]"></span>
          </div>

          {/* Method 2: Paste URL */}
          <div>
            <label className="font-label-mono-sm text-xs uppercase text-[#1c1c1a] font-bold block mb-1">
              Option 2: Paste Image URL
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={handleUrlChange}
              placeholder="https://images.unsplash.com/... or Google Photos / CDN"
              className="w-full bg-[#f0edea] p-2.5 font-label-mono-sm text-xs border border-[#1c1c1a] focus:bg-white focus:outline-none"
            />
          </div>

          {fileError && (
            <p className="font-label-mono-sm text-xs text-red-600 font-bold bg-red-50 p-2 border border-red-200">
              {fileError}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2 border-t border-[#dec0b4]">
            <button
              type="button"
              onClick={closeImageModal}
              className="flex-1 bg-[#f0edea] hover:bg-[#ebe8e4] text-[#1c1c1a] py-2.5 font-label-mono-sm text-xs uppercase font-bold tracking-wider border border-[#1c1c1a] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-sky-600 hover:bg-sky-500 text-white py-2.5 font-label-mono-sm text-xs uppercase font-bold tracking-wider shadow-[3px_3px_0px_0px_#1c1c1a] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            >
              Apply Image Swap
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
