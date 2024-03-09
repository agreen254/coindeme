"use client";

import { toast, type Toast, useToasterStore } from "react-hot-toast";

import { AlertCircle as XCircleIcon } from "lucide-react";
import ProgressInterval from "./ProgressInterval";

type Props = {
  t: Toast;
  message: string;
};

// not quite sure why but there is a lag between the progress bar and overall toast duration
const toastDuration = 8 * 1000; 
const progressDuration = 7.1 * 1000; 
const leaveAnimDuration = 0.3 * 1000;

const ErrorToast = ({ t, message }: Props) => {
  const { pausedAt } = useToasterStore();

  const handleDismiss = () => {
    toast.dismiss(t.id);
    setTimeout(() => toast.remove(t.id), leaveAnimDuration);
  };

  return (
    <div
      className={`${
        t.visible ? "opacity-100" : "opacity-0"
      } flex-col bg-zinc-700 border border-zinc-400 hover:border-red-500 shadow-lg rounded-lg transition animate-slide-in-left ease-out duration-300 group`}
    >
      <div className="flex items-center">
        <div className="py-4 pl-4">
          <XCircleIcon className="w-6 h-6 mr-3 -translate-y-[1px] inline text-red-400" />
        </div>
        <div className="py-4 pr-4">{message}</div>
        <div className="flex border-l border-zinc-500">
          <button
            onClick={handleDismiss}
            className="w-full border-l-[0.5px] group-hover:border-red-500 p-4 flex items-center justify-center text-sm font-medium transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
      <ProgressInterval duration={progressDuration} isPaused={!!pausedAt} />
    </div>
  );
};

export function renderErrorToast(message: string) {
  toast.custom((t) => <ErrorToast t={t} message={message} />, {
    duration: toastDuration,
    position: "bottom-right",
  });
}
