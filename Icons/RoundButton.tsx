import { SVGProps } from "react";

const RoundButtonIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="81"
      height="80"
      viewBox="0 0 81 80"
      fill="none"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_bd_587_9796)">
        <circle
          cx="36.6523"
          cy="36"
          r="12"
          fill="#6161D6"
          style={{
            fill: "color(display-p3 0.3794 0.3794 0.8400)",
            fillOpacity: 0.5,
          }}
          shapeRendering="crispEdges"
        />
        <circle
          cx="36.6523"
          cy="36"
          r="11.5"
          stroke="url(#paint0_linear_587_9796)"
          shapeRendering="crispEdges"
        />
      </g>
      <path
        d="M32.6523 36H40.6523"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36.6523 40V32"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <filter
          id="filter0_bd_587_9796"
          x="0.652344"
          y="0"
          width="80"
          height="80"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_587_9796"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="8"
            operator="dilate"
            in="SourceAlpha"
            result="effect2_dropShadow_587_9796"
          />
          <feOffset dx="4" dy="4" />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.470588 0 0 0 0 0.470588 0 0 0 0 0.980392 0 0 0 0.15 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_backgroundBlur_587_9796"
            result="effect2_dropShadow_587_9796"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_587_9796"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_587_9796"
          x1="36.6523"
          y1="24"
          x2="36.6523"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            stopColor="#7878FA"
            style={{
              stopColor: "color(display-p3 0.4704 0.4704 0.9800)",
              stopOpacity: 1,
            }}
          />
          <stop
            offset="1"
            stopColor="#7878FA"
            stopOpacity="0"
            style={{ stopColor: "none", stopOpacity: 0 }}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default RoundButtonIcon;
