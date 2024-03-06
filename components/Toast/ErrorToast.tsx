import { toast, type Toast } from "react-hot-toast";
import { AlertCircle as XCircleIcon } from "lucide-react";

type Props = {
  t: Toast;
  message: string;
};

const ErrorToast = ({ t, message }: Props) => {
  return (
    <div
      className={`${
        t.visible ? "opacity-100" : "opacity-0"
      } max-w-md flex items-center bg-zinc-700 border border-zinc-500 hover:border-red-500 shadow-lg rounded-lg transition animate-enter ease-out duration-300`}
    >
      <div className="p-4">
        <p>
          <span>
            <XCircleIcon className="w-6 h-6 mr-2 -translate-y-[1px] inline text-red-400" />
          </span>
          <span>{message}</span>
        </p>
      </div>
      <div className="flex border-l border-zinc-500">
        <button
          onClick={() => {
            toast.dismiss(t.id);
            setTimeout(() => toast.remove(t.id), 300);
          }}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export function renderErrorToast(message: string) {
  toast.custom((t) => <ErrorToast t={t} message={message} />, {
    duration: 6 * 1000,
  });
}
