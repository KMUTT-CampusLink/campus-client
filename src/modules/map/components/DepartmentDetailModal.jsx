import BuildingImage from "../assets/buldingImage.jpg";

const DepartmentDetailModel = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div
        className="modal-box relative p-10"
        style={{ width: "40vw", maxWidth: "none" }}
      >
        <div className="flex align">
          <h2 className="text-4xl font-extrabold">{data?.name}</h2>

          <button
            className="btn btn-md my-auto ml-auto"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="flex my-10">
          <img
            src={BuildingImage}
            alt="building image"
            className="w-[50%] aspect-5/3 rounded-xl"
          />
          <label className="form-control grid px-4 w-full">
            <div className="label">
              <span className="label-text font-semibold text-xl">
                Location Details:
              </span>
            </div>
            <input
              type="text"
              placeholder="Location details..."
              value={data.location}
              className="input input-bordered w-full max-w-xs border-transparent p-2"
            />

            <div className="label">
              <span className="label-text font-semibold text-xl">Phone:</span>
            </div>
            <input
              type="text"
              placeholder="Location details..."
              value={data.phone}
              className="input input-bordered w-full max-w-xs border-transparent p-2"
            />

            <div className="label">
              <span className="label-text font-semibold text-xl">Fax:</span>
            </div>
            <input
              type="text"
              placeholder="Location details..."
              value={data.fax}
              className="input input-bordered w-full max-w-xs border-transparent p-2 mb-4"
            />
            <a
              href="https://www.google.com/maps"
              className="flex p-2 mx-auto w-max border-2 border-red-400 rounded-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#FF0000"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>

              <span>Navigate Now!</span>
            </a>
          </label>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetailModel;
