import { SVGProps } from "react";

const CaretIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 4" {...props}>
      <path d="M4 .333.668 3.666h6.667L4.001.333Z" />
    </svg>
  );
};

export default CaretIcon;
