import React from 'react';
import { useAdmin } from '../../context/AdminContext';

interface EditableImageProps {
  id: string;
  defaultSrc: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  onClick?: () => void;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  id,
  defaultSrc,
  alt,
  className = '',
  imgClassName = '',
  onClick,
}) => {
  const { isAdmin, content, openImageModal } = useAdmin();

  const currentSrc = content[id] ?? defaultSrc;

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openImageModal(id, currentSrc);
  };

  return (
    <div
      className={`relative group/img-edit ${
        isAdmin
          ? 'admin-editable-img cursor-pointer transition-all hover:outline-dashed hover:outline-2 hover:outline-[#38bdf8] hover:outline-offset-2'
          : ''
      } ${className}`.trim()}
      onClick={isAdmin ? handleEditClick : onClick}
    >
      <img
        src={currentSrc}
        alt={alt}
        className={imgClassName}
      />

      {isAdmin && (
        <button
          type="button"
          onClick={handleEditClick}
          aria-label={`Replace image for ${id}`}
          className="absolute top-2.5 right-2.5 bg-[#1c1c1a]/90 hover:bg-sky-600 text-white px-2.5 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] flex items-center gap-1.5 font-label-mono-sm text-[11px] uppercase tracking-wider font-bold transition-all z-20 cursor-pointer border border-white/60 backdrop-blur-xs group-hover/img-edit:scale-105"
          title={`[Admin] Swap Image: ${id} (Upload new file or paste URL)`}
        >
          <span className="material-symbols-outlined text-[16px] text-sky-400">photo_camera</span>
          <span className="text-[10px] tracking-wider font-mono">SWAP</span>
        </button>
      )}
    </div>
  );
};

