import { useEffect, useRef, type ForwardedRef } from "react";

/**
 * This hook is used to allow ref.current methods such as focus() and blur() to be
 * seen by the compiler when the ref is forwarded.
 *
 * https://github.com/facebook/react/issues/24722
 */
export const useForwardRef = <T>(
  ref: ForwardedRef<T>,
  initialValue: any = null
) => {
  const targetRef = useRef<T | null>(initialValue);

  useEffect(() => {
    if (!ref) return;

    if (typeof ref === "function") {
      ref(targetRef.current);
    } else {
      targetRef.current = ref.current;
    }
  }, []);

  return targetRef;
};
