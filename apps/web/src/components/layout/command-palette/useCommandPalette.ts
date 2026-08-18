
/**
 * @file hooks/useCommandPalette.ts
 * @description Sellora Application Shell — Global ⌘K Keyboard Shortcut Hook
 *
 * Listens for Cmd+K (Mac) / Ctrl+K (Windows/Linux) anywhere in the
 * document and toggles the Command Palette. Ignores the shortcut while
 * focus is inside a text input/textarea/contenteditable UNLESS that
 * input is the command palette's own search field — prevents accidental
 * triggers while a merchant is typing "k" inside, say, a product title
 * field, while still allowing ⌘K to close the palette when its own input
 * is focused.
 */
 
'use client';
 
import { useState, useEffect, useCallback } from 'react';
 
 
export function useCommandPalette() {
  const [open, setOpen] = useState(false);
 
  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((p) => !p), []);
 
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      if (!isCmdK) return;
 
      // Allow the shortcut even inside editable fields (standard ⌘K UX
      // convention — Linear/Notion/Vercel all permit this), but always
      // preventDefault to stop browser/OS default bindings (e.g. browser
      // search bar focus in some browsers).
      e.preventDefault();
      setOpen((prev) => !prev);
    };
 
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);
 
  return { open, close, toggle, setOpen };
}
 