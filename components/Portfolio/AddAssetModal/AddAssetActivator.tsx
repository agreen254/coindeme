import { useAddAssetActions } from "@/hooks/useAddAsset";

const AddAssetActivator = () => {
  const { setModalIsOpen } = useAddAssetActions();

  return (
    <button
      className="rounded-lg px-5 py-3 bg-zinc-600/70 border border-zinc-800"
      onClick={() => setModalIsOpen(true)}
    >
      Add Asset
    </button>
  );
};

export default AddAssetActivator;
