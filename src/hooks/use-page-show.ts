import { useEffect, useRef } from 'react';

type PageShowHandler = (event: Event) => void;

export function usePageShow(handler: PageShowHandler) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const invoke = (event: Event) => {
      handlerRef.current(event);
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        invoke(new Event('visibilitychange'));
      }
    };

    window.addEventListener('pageshow', invoke);
    window.addEventListener('focus', invoke);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('pageshow', invoke);
      window.removeEventListener('focus', invoke);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);
}
