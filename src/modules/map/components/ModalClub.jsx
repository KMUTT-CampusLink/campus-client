import axios from "axios";
import { useState, useEffect } from "react";

const ModalClub = ({ buildingId }) => {
  const [clubData, setClubData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!buildingId) {
      setClubData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchClubData = async () => {
      setLoading(true);
      try {
        console.log("Fetching club data...");
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/map/getClubInfo?buildingId=${buildingId}`
        );
        console.log("Club data response:", response);
        setClubData(response.data);
      } catch (err) {
        console.error("Error fetching club data:", err);
        setError(err);
      } finally {
        console.log("Fetch complete.");
        setLoading(false);
      }
    };

    fetchClubData();
  }, [buildingId]);

  if (!buildingId) return null;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="lg:my-10 m-2 max-h-full overflow-auto relative text-xs md:text-base">
      <div className="sticky top-0 grid grid-cols-[50%_50%] bg-[#F2F2F2] text-center py-3 md:py-2 lg:py-4 text-[#864E41] rounded-md shadow-lg z-10">
        <div>Club Name</div>
        <div>Member Count</div>
      </div>
      <div className="h-max overflow-hidden my-2">
        {clubData && clubData.location?.length > 0 ? (
          clubData.location.map((item, index) => (
            <a
              href="/parking"
              key={index}
              className="grid grid-cols-[50%_40%_10%] items-center bg-[#FFF] text-center py-3 md:py-2 lg:py-4 text-[#333] rounded-md shadow-lg mb-3 text-xs lg:text-base border-2"
            >
              <div className="h-max">{item.name}</div>
              <div className="ml-[30%] h-max">{item._count["club_member"]}</div>
              <div> 
                {/* Correct SVG integration */}
                <svg
                  width="1.5rem"
                  height="1.5rem"
                  viewBox="0 0 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                >
                  <g
                    id="Page-1"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                    sketch:type="MSPage"
                  >
                    <g
                      id="Icon-Set-Filled"
                      sketch:type="MSLayerGroup"
                      transform="translate(-310.000000, -1089.000000)"
                      fill="#864E41"
                    >
                      <path
                        d="M332.535,1105.88 L326.879,1111.54 C326.488,1111.93 325.855,1111.93 325.465,1111.54 C325.074,1111.15 325.074,1110.51 325.465,1110.12 L329.586,1106 L319,1106 C318.447,1106 318,1105.55 318,1105 C318,1104.45 318.447,1104 319,1104 L329.586,1104 L325.465,1099.88 C325.074,1099.49 325.074,1098.86 325.465,1098.46 C325.855,1098.07 326.488,1098.07 326.879,1098.46 L332.535,1104.12 C332.775,1104.36 332.85,1104.69 332.795,1105 C332.85,1105.31 332.775,1105.64 332.535,1105.88 L332.535,1105.88 Z M326,1089 C317.163,1089 310,1096.16 310,1105 C310,1113.84 317.163,1121 326,1121 C334.837,1121 342,1113.84 342,1105 C342,1096.16 334.837,1089 326,1089 L326,1089 Z"
                        id="arrow-right-circle"
                        sketch:type="MSShapeGroup"
                      ></path>
                    </g>
                  </g>
                </svg>
              </div>
            </a>
          ))
        ) : (
          <p className="text-gray-500 text-center py-24 text-xl italic">
            {clubData ? "No Clubs Found." : "No Data Available."}
          </p>
        )}
      </div>
    </div>
  );
};

export default ModalClub;
