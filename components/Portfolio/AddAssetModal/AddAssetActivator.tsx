type Props = {
  open: boolean;
  
  // eslint-disable-next-line
  setOpen: (status: boolean) => void;
};

const AddAssetActivator = ({ setOpen }: Props) => {
  return (
    <button
      className="rounded-lg px-5 py-3 bg-zinc-600/70 border border-zinc-800"
      onClick={() => setOpen(true)}
    >
      Add Asset
    </button>
  );
};

export default AddAssetActivator;
