import { RefObject, useEffect } from "react";

export type UseClickOutSide = <T extends HTMLElement = HTMLElement>({
  refs,
  handler,
}: {
  refs: RefObject<T>[];
  handler: (event: MouseEvent) => void;
}) => void;

export const useClickOutside: UseClickOutSide = ({ refs, handler }) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      refs.some((ref) => {
        const element = ref.current;
        if (!element || element.contains(event.target as Node)) {
          return true;
        }
        handler(event);
        return false;
      });
    };

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [refs, handler]);
};
