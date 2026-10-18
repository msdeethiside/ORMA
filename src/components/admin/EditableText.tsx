import React, { useRef, useLayoutEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';

export type EditableTag =
  | 'span'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'div'
  | 'blockquote'
  | 'a'
  | 'button'
  | 'strong'
  | 'b'
  | 'em'
  | 'i';

interface EditableTextProps {
  id: string;
  defaultText: string;
  as?: EditableTag;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  title?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({
  id,
  defaultText,
  as: Component = 'span',
  className = '',
  href,
  onClick,
  title,
}) => {
  const { isAdmin, content, updateContent } = useAdmin();
  const elementRef = useRef<HTMLElement>(null);

  const currentText = content[id] ?? defaultText;

  // Sync internal text if updated externally (e.g. discard, save, reset, or initial load)
  // CRITICAL: NEVER touch innerText while this element is actively focused/typed into,
  // otherwise the cursor collapses to index 0 causing backwards typing!
  useLayoutEffect(() => {
    if (elementRef.current) {
      if (document.activeElement !== elementRef.current) {
        if (elementRef.current.innerText !== currentText) {
          elementRef.current.innerText = currentText;
        }
      }
    }
  }, [currentText, isAdmin]);

  const handleInput = () => {
    if (!isAdmin || !elementRef.current) return;
    const newText = elementRef.current.innerText;
    updateContent(id, newText);
  };

  const handleBlur = () => {
    if (!isAdmin || !elementRef.current) return;
    const newText = elementRef.current.innerText;
    if (newText !== currentText) {
      updateContent(id, newText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && Component !== 'p' && Component !== 'blockquote') {
      e.preventDefault();
      elementRef.current?.blur();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (!isAdmin) return;
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  const adminClasses = isAdmin
    ? 'admin-editable-text cursor-text relative transition-all rounded-xs hover:outline-dashed hover:outline-2 hover:outline-[#38bdf8] hover:outline-offset-2 hover:bg-[#38bdf8]/10 focus:outline-solid focus:outline-2 focus:outline-[#0284c7] focus:bg-[#38bdf8]/15 min-w-[1ch]'
    : '';

  const handleClick = (e: React.MouseEvent) => {
    if (isAdmin) {
      // In admin mode, clicking text allows editing; prevent link navigation or button submits
      if (Component === 'a' || Component === 'button' || href) {
        e.stopPropagation();
      }
    } else if (onClick) {
      onClick(e);
    }
  };

  const commonProps = {
    ref: elementRef as any,
    contentEditable: isAdmin,
    suppressContentEditableWarning: true,
    onInput: handleInput,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    onPaste: handlePaste,
    className: `${className} ${adminClasses}`.trim(),
    title: isAdmin ? `[Editable: ${id}] Click to edit text inline` : title,
    onClick: handleClick,
  };

  if (Component === 'a') {
    return (
      <a href={isAdmin ? undefined : href} {...commonProps}>
        {isAdmin ? undefined : currentText}
      </a>
    );
  }

  // In admin mode, do NOT pass currentText as React children; the DOM text node is maintained natively to prevent cursor jumping
  return React.createElement(Component, commonProps, isAdmin ? undefined : currentText);
};


