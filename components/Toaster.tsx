"use client";

import { useTheme } from "next-themes";

import { Slide, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

/**
 * Container to house toast notifications. The container can only be used inside of a client component,
 * but it needs to be rendered only a single time in the application.
 *
 * It is hidden in this client component so that it can be placed in the main layout file.
 */
const Toaster = () => {
  const { theme } = useTheme();

  return (
    <ToastContainer
      closeOnClick={false}
      position={"bottom-right"}
      pauseOnHover={true}
      theme={theme}
      transition={Slide}
      autoClose={10 * 1000}
    />
  );
};

export default Toaster;
