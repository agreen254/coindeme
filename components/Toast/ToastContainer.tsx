"use client";

import { Toaster } from "react-hot-toast";

/**
 * Container to house toast notifications. The container can only be used inside of a client component,
 * but it needs to be rendered just once in the application.
 *
 * It is wrapped within this client component so that it can be placed in the main layout file.
 */
const ToastContainer = () => {
  return <Toaster />;
};

export default ToastContainer;
