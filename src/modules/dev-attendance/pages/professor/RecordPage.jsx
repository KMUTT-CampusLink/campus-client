import SmallLoading from "../../../dev/pages/SmallLoading";
import { useGetRecordCode } from "../../services/queries";
import { useParams } from "react-router-dom";

const RecordPage = () => {
  const { section_id } = useParams();
  const { data, isLoading, error: codeError } = useGetRecordCode(section_id);
  if (isLoading) return <SmallLoading message="fetching" />;
  return (
    <div className="font-geologica w-full h-fit flex items-center justify-center p-[1rem] mt-2">
      <div className="w-fit h-fit flex flex-col items-center justify-center">
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
          className="disabled:pointer-events-none text-base font-semibold tracking-widest bg-[#13aa52] hover:bg-[#128341] transition-colors rounded-none text-white cursor-pointer outline-none text-center py-[0.5rem] px-[1.5rem]"
        >
          Create Records
        </button>
      </div>
    </div>
  );
};

export default RecordPage;
