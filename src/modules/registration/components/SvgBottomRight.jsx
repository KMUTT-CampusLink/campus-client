const SvgBottomRight = () => {
  return (
    <svg
      viewBox="0 0 1329 1185"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="z-0 absolute right-[-50px] bottom-[-50px] md:right-[-100px] md:bottom-[-100px] lg:right-[-200px] lg:bottom-[-200px] w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[700px] lg:h-[700px]" // Responsive sizes
    >
      <g filter="url(#filter0_d_1544_8994)">
        <path
          d="M1099.66 10.3267C1099.66 282.603 1531.71 1148.73 1198.4 1148.73C865.099 1148.73 -266.342 1262.33 63.6583 1031.33C627.648 636.534 179.158 486.327 600.658 308.327C862.158 184.326 810.158 -52.1737 1099.66 10.3267Z"
          fill="url(#paint0_linear_1544_8994)"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1544_8994"
          x="0"
          y="-0.000976562"
          width="1028.66"
          height="1100"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1544_8994"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1544_8994"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1544_8994"
          x1="593.658"
          y1="371.327"
          x2="1046.16"
          y2="1017.33"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ED5A52" />
          <stop offset="1" stopColor="#F79800" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SvgBottomRight;
