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
  const isFocusedRef = useRef<boolean>(false);

  const currentText = content[id] ?? defaultText;

  // Sync internal text if updated externally (e.g. discard, save, reset, or initial load)
  // CRITICAL FIX: NEVER touch the DOM while this element is actively focused/typed into!
  // Touching the DOM while focused collapses the browser selection to offset 0, causing backwards typing and breaking backspace.
  useLayoutEffect(() => {
    if (elementRef.current && !isFocusedRef.current) {
      if (elementRef.current.innerText !== currentText) {
        elementRef.current.innerText = currentText;
      }
    }
  }, [currentText, isAdmin]);

  const handleFocus = () => {
    isFocusedRef.current = true;
  };

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    isFocusedRef.current = false;
    if (!isAdmin) return;
    const finalVal = e.currentTarget.innerText ?? e.currentTarget.textContent ?? '';
    updateContent(id, finalVal);
  };

  const handleInput = (e: React.FormEvent<HTMLElement>) => {
    if (!isAdmin) return;
    const newText = e.currentTarget.innerText ?? e.currentTarget.textContent ?? '';
    updateContent(id, newText);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Prevent Enter on inline/single-line elements from adding accidental divs/brs
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

  const handleClick = (e: React.MouseEvent) => {
    if (isAdmin) {
      // In admin mode, clicking text allows editing; prevent link navigation or form submit
      if (Component === 'a' || Component === 'button' || href) {
        e.stopPropagation();
      }
      if (elementRef.current && !isFocusedRef.current) {
        elementRef.current.focus();
      }
    } else if (onClick) {
      onClick(e);
    }
  };

  // When not in admin mode, render standard lightweight React element
  if (!isAdmin) {
    if (Component === 'a') {
      return (
        <a href={href} onClick={onClick} className={className} title={title}>
          {currentText}
        </a>
      );
    }
    return React.createElement(
      Component,
      { className, onClick, title },
      currentText
    );
  }

  // Admin mode styling with hover light blue dashed border and edit hints
  const adminClasses =
    'admin-editable-text cursor-text relative transition-all rounded-xs hover:outline-dashed hover:outline-2 hover:outline-[#38bdf8] hover:outline-offset-2 hover:bg-[#38bdf8]/10 focus:outline-solid focus:outline-2 focus:outline-[#0284c7] focus:bg-[#38bdf8]/15 min-h-[1em] min-w-[1ch]';

  const commonProps = {
    ref: elementRef as any,
    contentEditable: true,
    suppressContentEditableWarning: true,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onInput: handleInput,
    onKeyDown: handleKeyDown,
    onPaste: handlePaste,
    className: `${className} ${adminClasses}`.trim(),
    title: `[Editable: ${id}] Click to edit text inline`,
    onClick: handleClick,
    type: Component === 'button' ? 'button' : undefined,
  };

  if (Component === 'a') {
    return <a {...commonProps} />;
  }

  // In admin mode, children are managed by DOM / useLayoutEffect to prevent React reconciliation resetting cursor
  return React.createElement(Component, commonProps);
};


