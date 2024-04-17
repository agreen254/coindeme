import { RefObject, useEffect } from "react";

/**
 * Hook to handle opening, closing, and keypress actions of a modal.
 *
 * @param modalRef ref assigned to the parent modal div
 * @param focusOnOpenRef ref you want to be focused when modal opens
 * @param isOpen state variable to tell when the modal is open or not
 * @param handleExit callback to be fired when the modal exits
 * @param dropdownRefs pass these to only close dropdowns with escape when the dropdowns are open instead of the entire modal
 */
export const useModalListener = (
  modalRef: RefObject<HTMLDivElement>,
  focusOnOpenRef: RefObject<HTMLInputElement>,
  isOpen: boolean,
  handleExit: () => void,
  dropdownRefs?: RefObject<HTMLElement>[]
) =>
  useEffect(() => {
    const handleModalExit = (e: KeyboardEvent) => {
      if (isOpen && e.key === "Escape" && dropdownRefs?.every((ref) => !ref.current))
        handleExit();
    };
    document.addEventListener("keydown", handleModalExit);

    if (isOpen) {
      // immediately focus the desired element when the modal is opened
      focusOnOpenRef.current?.focus();

      // prevent scrolling
      document.body.style.overflowY = "hidden";

      // prevent screen readers from reading content outside of modal
      document.body.ariaHidden = "true";

      // trap focus selection within modal
      // https://medium.com/cstech/achieving-focus-trapping-in-a-react-modal-component-3f28f596f35b
      // although in the above example the escape key handler is broken;
      // as a workaround add the listener to the document and not the modal ref
      const modalElement = modalRef.current;
      const focusableElements = modalElement?.querySelectorAll(
        // eslint-disable-next-line
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0];
      const lastElement = focusableElements?.[focusableElements.length - 1];

      const handleModalKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            if (lastElement instanceof HTMLElement) lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            if (firstElement instanceof HTMLElement) firstElement.focus();
          }
        }
      };

      modalElement?.addEventListener("keydown", handleModalKeyDown);
      return () => {
        modalElement?.removeEventListener("keydown", handleModalKeyDown);
        document.removeEventListener("keydown", handleModalExit);
      };
    } else {
      // restore properties that opening the modal alters
      document.body.style.overflowY = "scroll";
      document.body.ariaHidden = "false";
    }

    return () => {
      document.removeEventListener("keydown", handleModalExit);
    };
    // pointless to include ref objects as dependencies for the hook
    // https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780
  }, [isOpen]);
