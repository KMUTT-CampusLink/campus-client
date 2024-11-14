import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  expire: z
    .number()
    .int()
    .positive()
    .min(1, "1 to 60 mins")
    .max(60, "1 to 60 mins"),
  late: z
    .number()
    .int()
    .positive()
    .min(1, "1 to 60 mins")
    .max(60, "1 to 60 mins"),
  absent: z
    .number()
    .int()
    .positive()
    .min(1, "1 to 60 mins")
    .max(60, "1 to 60 mins"),
  location: z.boolean(),
});

const labelStyle = "font-geologica text-sm font-semibold";
const inputStyle =
  "w-[100%] h-[2rem] border-2 px-2 text-white text-base outline-none col-span-2";

const Setting = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
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
          type="text"
        />
        <label
          className={`font-geologica text-sm font-semibold`}
          htmlFor="expire"
        >
          m(s)
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
          m(s)
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
          m(s)
        </label>

        {/* Geolocation */}
        <label className={`${labelStyle}`} htmlFor="location">
          Geolocation
        </label>
        <input
          {...register("location")}
          type="checkbox"
          className="toggle"
          id="location"
        />
        <button
          onClick={(e) => e.preventDefault()}
          className="font-geologica text-sm font-semibold p-1 bg-gray-200 rounded-md col-span-2 w-[80%] hover:bg-gray-300"
        >
          Locate
        </button>

        <div className="col-span-4 w-full flex items-center justify-center">
          <button
            onClick={(e) => {
              e.preventDefault();
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
