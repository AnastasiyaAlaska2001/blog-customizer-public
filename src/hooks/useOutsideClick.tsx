import { useEffect } from 'react';

import type { RefObject } from 'react';

export const useOutsideClick = <T extends HTMLElement | null>(
  ref: RefObject<T>,
  onClickOutside: () => void
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as Node;
      if (ref?.current && !ref?.current?.contains(target)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClickOutside]);
};
