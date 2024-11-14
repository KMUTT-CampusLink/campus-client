import { zodResolver } from "@hookform/resolvers/zod";
import popToast from "../../../../utils/popToast";
import geoLocation from "../../utils/geoLocation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  expire: z.string().regex(/^([1-9]|[1-5][0-9]|60|all)$/),
  late: z.string().regex(/^([1-9]|[1-5][0-9]|60|all)$/),
  absent: z.string().regex(/^([1-9]|[1-5][0-9]|60|all)$/),
  location: z.boolean(),
});

const labelStyle = "font-geologica text-sm font-semibold";
const inputStyle =
  "w-[100%] h-[2rem] border-2 px-2 text-black font-geologica text-sm outline-none col-span-2";

const Setting = () => {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const getLocation = () => {
    const obj = geoLocation();
    if (obj.error.length > 0) {
      console.log(obj.error);
    } else {
      setLat(() => obj.data[0]);
      setLong(() => obj.data[1]);
      console.log(obj);
    }
  };

  const handleSave = handleSubmit((data) => {
    if (Object.keys(errors).length > 0) {
      popToast("Form not complete", "error");
      console.log(errors);
    } else if (data.location && (lat === null || long === null)) {
      popToast("Location required", "error");
    } else {
      console.log(data);
    }
  });

  return (
    <div className="w-full h-fit flex items-center justify-center p-[1rem] mt-2">
      <form
        noValidate
        autoComplete="off"
        method="post"
        className="w-fit h-fit grid grid-cols-4 grid-rows-4 p-[1rem] rounded-md border-[2px] border-gray-200 gap-x-2 gap-y-4 items-center"
      >
        {/* Expired At */}
        <label className={`${labelStyle}`} htmlFor="expire">
          Expired
        </label>
        <input
          className={`${inputStyle}`}
          {...register("expire")}
          id="expire"
          type="number"
        />
        <label
          className={`font-geologica text-sm font-semibold`}
          htmlFor="expire"
        >
          min(s)
        </label>

        {/* Late */}
        <label className={`${labelStyle}`} htmlFor="late">
          Late
        </label>
        <input
          className={`${inputStyle}`}
          {...register("late")}
          id="late"
          type="number"
        />
        <label
          className={`font-geologica text-sm font-semibold`}
          htmlFor="late"
        >
          min(s)
        </label>

        {/* Absent */}
        <label className={`${labelStyle}`} htmlFor="absent">
          Absent
        </label>
        <input
          className={`${inputStyle}`}
          {...register("absent")}
          id="absent"
          type="number"
        />
        <label
          className={`font-geologica text-sm font-semibold`}
          htmlFor="absent"
        >
          min(s)
        </label>

        {/* Geolocation */}
        <label className={`${labelStyle}`} htmlFor="location">
          Location
        </label>
        <input
          {...register("location")}
          type="checkbox"
          className="toggle"
          id="location"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            getLocation();
          }}
          disabled={!watch("location")}
          className="font-geologica text-sm font-semibold p-1 bg-gray-200 rounded-md col-span-2 w-[80%] hover:bg-gray-300 disabled:text-gray-400"
        >
          Locate
        </button>

        {/* Latitude & Longitude */}

        <div className="col-span-4 w-full flex items-center justify-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSave();
            }}
            style={{
              boxShadow: "rgba(0, 0, 0, .1) 0 2px 4px 0",
            }}
            className="font-geologica text-sm font-semibold tracking-widest bg-[#13aa52] rounded-none border-[1px] border-solid border-[#13aa52] text-white cursor-pointer outline-none text-center py-[10px] px-[25px]"
          >
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
