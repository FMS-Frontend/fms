import { RefObject, useEffect, useRef } from "react";

export default function useOutsideClick(
  handler: () => void,
  listenCapturing: boolean = true
): RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) handler();
      }
      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
