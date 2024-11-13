import { RefObject, useEffect, useRef } from "react";

/**
 * Custom Hook - useOutsideClick
 *
 * This custom hook is used to detect clicks outside of a specified element(Specifically for Modals) and trigger a handler function (to close the modal).
 * It is commonly used for closing dropdowns, modals, or other UI elements when a user clicks outside them.
 *
 * @param {Function} handler - The function to be called when a click outside the referenced element occurs.
 * @param {boolean} [listenCapturing=true] - A boolean to specify whether to use capturing phase for the event listener. Defaults to `true`.
 *
 * @returns {RefObject<HTMLDivElement>} A `RefObject` that can be attached to a DOM element to track clicks outside of it.
 *
 * @example
 * const ref = useOutsideClick(() => {
 *   console.log('Clicked outside!');
 * });
 *
 * return <div ref={ref}>Some content</div>;
 *
 * @remarks
 * - This hook listens for click events on the `document` and triggers the handler function if the click is outside the element referenced by the returned `ref`.
 * - The hook allows you to specify whether the event listener should be attached during the capturing phase (default is `true`).
 * - Cleanup is handled automatically when the component is unmounted or the handler function changes.
 */

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
