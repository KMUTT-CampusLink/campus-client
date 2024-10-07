import SInfoCard from "./SInfoCard";

function GPAXCard() {
  return (
    <div className="bg-gray-200 p-4 rounded shadow">
      <h2 className="font-bold text-2xl mb-2">Cumulative GPA</h2>
      <div className="divider"></div>
      <SInfoCard />
      <div className="divider"></div>
      <div className="text-sm">
        <p>Credits Prescribed: 134</p>
        <p>Credits Earned: 47</p>
        <p>Grade Point Average: 3.65</p>
      </div>
      <button className="w-full mt-6 bg-[#A45C40] hover:bg-[#8A4832] text-white py-3 rounded-lg font-semibold transition duration-300">
        Back
      </button>
    </div>
  );
}

export default GPAXCard;
