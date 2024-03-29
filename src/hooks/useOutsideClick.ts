/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useRef } from "react";

export function useOutsideClick(handler: () => void, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e: Event) {
        // @ts-ignore
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
