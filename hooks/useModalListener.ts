import { RefObject, useEffect } from "react";

export const useModalListener = (
  modalRef: RefObject<HTMLDivElement>,
  isOpen: boolean,
  exit: () => void
) =>
  useEffect(() => {
    const handleModalKeys = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        exit();
      }
    };
    document.addEventListener("keydown", handleModalKeys);

    if (isOpen) {
      // prevent scrolling
      document.body.style.overflowY = "hidden";

      // trap focus within modal
      // https://medium.com/cstech/achieving-focus-trapping-in-a-react-modal-component-3f28f596f35b
      // although in the above example the escape key handler is broken;
      // as a workaround add the listener to the document and not the modal
      const modalElement = modalRef.current;
      const focusableElements = modalElement?.querySelectorAll(
        // eslint-disable-next-line
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0];
      const lastElement = focusableElements?.[focusableElements.length - 1];

      const handleModalKeyPress = (e: KeyboardEvent) => {
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

      modalElement?.addEventListener("keydown", handleModalKeyPress);
      return () => {
        modalElement?.removeEventListener("keydown", handleModalKeyPress);
        document.removeEventListener("keydown", handleModalKeys);
      };
    } else document.body.style.overflowY = "scroll";

    return () => {
      document.removeEventListener("keydown", handleModalKeys);
    };
  }, [isOpen, modalRef]);
