"use client";

import { useEffect } from "react";

type Options = {
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
  preventDefault?: boolean;
  ignoreInputs?: boolean;
};

export function useKeyboardShortcut(
  key: string,
  options: Options,
  handler: (e: KeyboardEvent) => void,
): void {
  const {
    meta,
    shift,
    alt,
    preventDefault = true,
    ignoreInputs = false,
  } = options;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== key.toLowerCase()) return;

      const metaPressed = e.metaKey || e.ctrlKey;
      if (!!meta !== metaPressed) return;
      if (!!shift !== e.shiftKey) return;
      if (!!alt !== e.altKey) return;

      if (ignoreInputs) {
        const t = e.target as HTMLElement | null;
        const tag = t?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || t?.isContentEditable)
          return;
      }

      if (preventDefault) e.preventDefault();
      handler(e);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [key, meta, shift, alt, preventDefault, ignoreInputs, handler]);
}
