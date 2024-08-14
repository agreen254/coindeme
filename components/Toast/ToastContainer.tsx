"use client";

import { Toaster, type DefaultToastOptions } from "react-hot-toast";
import { useThemeTyped } from "@/hooks/useThemeTyped";

/**
 * Container to house toast notifications. The container can only be used inside of a client component,
 * but it needs to be rendered just once in the application.
 *
 * It is wrapped within this client component so that it can be placed in the main layout file.
 */
const ToastContainer = () => {
  const theme = useThemeTyped();
  const options: DefaultToastOptions = {
    success: {
      iconTheme: { primary: "white", secondary: "rgb(0, 177, 167)" },
      style: {
        fontSize: "1.1rem",
        padding: "18px 22px 18px 16px",
        borderRadius: "6px",
        color: "white",
        backgroundColor: `rgba(0, 177, 167, ${
          theme === "dark" ? "50%" : "75%"
        })`,
        border: "1px solid rgb(0, 177, 167)",
        backdropFilter: "blur(16px)",
      },
    },
    error: {
      iconTheme: { primary: "white", secondary: "rgb(254, 34, 100)" },
      style: {
        padding: "18px 22px 18px 16px",
        borderRadius: "6px",
        color: "white",
        backgroundColor: `rgba(254, 34, 100, ${
          theme === "dark" ? "50%" : "75%"
        })`,
        border: "1px solid rgb(254, 34, 100)",
        backdropFilter: "blur(16px)",
      },
    },
  };

  return <Toaster toastOptions={options} />;
};

export default ToastContainer;
