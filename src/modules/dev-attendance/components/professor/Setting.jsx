import { useUpdateSetting } from "../../services/mutations";
import SmallLoading from "../../../dev/pages/SmallLoading";
import { zodResolver } from "@hookform/resolvers/zod";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useQueryClient } from "@tanstack/react-query";
import { useGetSetting } from "../../services/queries";
import popToast from "../../../../utils/popToast";
import geoLocation from "../../utils/geoLocation";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { z } from "zod";

const schema = z.object({
  expire: z.string().regex(/^([1-9]|[1-5][0-9]|60|all)$/),
  late: z.string().regex(/^([1-9]|[1-5][0-9]|60|all)$/),
  absent: z.string().regex(/^([1-9]|[1-5][0-9]|60|all)$/),
  location: z.boolean(),
});

const labelStyle = "font-geologica text-sm font-semibold";
const inputStyle =
  "w-[100%] h-[2rem] border-2 px-2 text-black font-geologica text-sm font-semibold outline-none col-span-2";

const Setting = ({ section_id }) => {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [error, setError] = useState(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const { data, isLoading, error: settingError } = useGetSetting(section_id);
  const { mutate, isPending } = useUpdateSetting(queryClient);

  useEffect(() => {
    setLat(data?.data?.latitude);
    setLong(data?.data?.longitude);
    setValue("expire", data?.data?.expired_at + "");
    setValue("late", data?.data?.late_after + "");
    setValue("absent", data?.data?.absent_after + "");
    setValue("location", data?.data?.use_location);
  }, [data]);

  const handleSave = handleSubmit((form_data) => {
    if (Object.keys(errors).length > 0) {
      popToast("Form not complete", "error");
      console.log(errors);
    } else if (form_data.location && (lat + "" === "0" || long + "" === "0")) {
      popToast("Location required", "error");
    } else if (error) {
      popToast(error, "error");
    } else {
      form_data = {
        ...form_data,
        location: form_data.location,
        lat: lat,
        long: long,
        id: data?.data?.id,
      };
      mutate(form_data);
    }
  });

  if (isLoading) {
    return <SmallLoading message="fetching" />;
  }
  if (settingError) console.error(settingError.message);

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
          type="text"
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
          type="text"
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
          type="text"
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
          onClick={async (e) => {
            e.preventDefault();
            setGeoLoading(true);
            await geoLocation(setLat, setLong, setError).then((res) => {
              if (res) {
                setGeoLoading(false);
              }
            });
          }}
          disabled={!watch("location")}
          className="font-geologica text-sm font-semibold p-1 bg-gray-200 rounded-md col-span-2 w-[80%] hover:bg-gray-300 disabled:text-gray-400 h-[2rem]"
        >
          {geoLoading ? (
            <ScaleLoader
              height={20}
              width={4}
              color={`#fff`}
              speedMultiplier={1.2}
              loading={geoLoading}
            />
          ) : (
            "Locate"
          )}
        </button>

        {/* Latitude & Longitude */}
        {watch("location") && (
          <div className="col-span-4 flex items-center justify-start w-full gap-4 font-geologica text-sm font-semibold tracking-wide">
            <div className="flex items-center justify-start w-[50%] gap-1">
              <p>Lat :</p>
              <p className="flex-1 border-2 text-center p-1">
                {lat || "0.0000000"}
              </p>
            </div>
            <div className="flex items-center justify-start w-[50%] gap-1">
              <p>Long :</p>
              <p
                className="flex-1 border-2 text-center p-1
              "
              >
                {long || "0.0000000"}
              </p>
            </div>
          </div>
        )}

        <div className="col-span-4 w-full flex items-center justify-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSave();
            }}
            style={{
              boxShadow: "rgba(0, 0, 0, .1) 0 2px 4px 0",
            }}
            className="font-geologica text-sm font-semibold tracking-widest bg-[#13aa52] rounded-none border-[1px] border-solid border-[#13aa52] text-white cursor-pointer outline-none text-center py-[8px] px-[35px]"
          >
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
