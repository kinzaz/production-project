/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutableRefObject, useCallback, useRef } from 'react';

export const useDebounce = (cb: (...args: any) => void, ms: number) => {
  const timeout = useRef() as MutableRefObject<any>;

  return useCallback(
    (...args: any) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(() => cb(...args), ms);
    },
    [cb, ms]
  );
};
