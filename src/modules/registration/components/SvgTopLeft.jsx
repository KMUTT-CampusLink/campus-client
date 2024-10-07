const SvgTopLeft = () => {
  return (
    <svg
      viewBox="0 0 903 885"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="z-0 absolute left-[-100px] top-[-50px] md:left-[-100px] md:top-[-100px] lg:left-[-200px] lg:top-[-50px] w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[500px] lg:h-[500px]" // Responsive sizes
    >
      <g filter="url(#filter0_d_1544_8993)">
        <path
          d="M89.1357 361.815C86.127 181.615 -112.589 31.6824 108.001 27.9992C328.591 24.3161 1076.15 -63.3684 860.304 93.1605C491.402 360.678 976.128 742.352 699.134 864.816C415.135 948.315 128.136 555.314 89.1357 361.815Z"
          fill="url(#paint0_linear_1544_8993)"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1544_8993"
          x="0.0864258"
          y="0.216309"
          width="902.915"
          height="884.077"
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
            result="effect1_dropShadow_1544_8993"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1544_8993"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1544_8993"
          x1="721.695"
          y1="541.508"
          x2="415.08"
          y2="118.967"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ED5A52" />
          <stop offset="1" stopColor="#F79800" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SvgTopLeft;
