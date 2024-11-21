import BuildingImage from "/map/buldingImage.jpg";

function ModalDetailOption({ subData }) {
  return (
    <div className="flex my-10">
      <img
        src={BuildingImage}
        alt="building image"
        className="w-[50%] aspect-5/3 rounded-xl"
      />
      <div className="form-control grid px-4 w-full">
        <div className="label">
          <span className="label-text font-semibold text-xl">
            Location Details:
          </span>
        </div>
        <div className="bg-gray-100 p-2 rounded-md">
          {subData.location || "Location details not available"}
        </div>

        <div className="label mt-4">
          <span className="label-text font-semibold text-xl">Phone:</span>
        </div>
        <div className="bg-gray-100 p-2 rounded-md">
          {subData.phone || "Phone details not available"}
        </div>

        <div className="label mt-4">
          <span className="label-text font-semibold text-xl">Fax:</span>
        </div>
        <div className="bg-gray-100 p-2 rounded-md mb-4">
          {subData.fax || "Fax details not available"}
        </div>

        <a
          href="https://www.google.com/maps"
          className="flex p-2 mx-auto w-max border-2 border-red-400 rounded-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#FF0000"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>

          <span>Navigate Now!</span>
        </a>
      </div>
    </div>
  );
}

export default ModalDetailOption;
