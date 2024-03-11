import { renderErrorToast } from "./ErrorToast";

const SampleErrorToast = () => {
  return (
    <button
      className="px-5 py-3 bg-teal-800 rounded-lg"
      onClick={() => renderErrorToast("An error has occurred: 404 Not Found")}
    >
      Make me some toast!
    </button>
  );
};

export default SampleErrorToast;
