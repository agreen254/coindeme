type Props = {
  open: boolean;
  
  // eslint-disable-next-line
  setOpen: (status: boolean) => void;
};

const AddAssetActivator = ({ setOpen }: Props) => {
  return (
    <button
      className="bg-zinc-900/70 rounded-lg border border-zinc-800"
      onClick={() => setOpen(true)}
    >
      Add Asset
    </button>
  );
};

export default AddAssetActivator;
