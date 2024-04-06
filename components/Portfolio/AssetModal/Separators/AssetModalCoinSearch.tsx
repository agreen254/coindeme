import { ForwardedRef, forwardRef, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const AssetModalCoinSearch = (
  { children, ...props }: Props,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
};

export default forwardRef(AssetModalCoinSearch);

