import BangmodBackgroud from "/map/interbackgroundBangmod.png";
import S15 from "/map/bangmodAssets/S15.png";
import S14 from "/map/bangmodAssets/S14.png";
import S13 from "/map/bangmodAssets/S13.png";
import S12 from "/map/bangmodAssets/S12.png";
import S11 from "/map/bangmodAssets/S11.png";
import S10 from "/map/bangmodAssets/S10.png";
import S9 from "/map/bangmodAssets/S9.png";
import S8 from "/map/bangmodAssets/S8.png";
import S7 from "/map/bangmodAssets/S7.png";
import S6 from "/map/bangmodAssets/S6.png";
import S5 from "/map/bangmodAssets/S5.png";
import S4 from "/map/bangmodAssets/S4.png";
import S3 from "/map/bangmodAssets/S3.png";
import S2 from "/map/bangmodAssets/S2.png";
import S1 from "/map/bangmodAssets/S1.png";

import N20 from "/map/bangmodAssets/N20.png";
import N19 from "/map/bangmodAssets/N19.png";
import N18 from "/map/bangmodAssets/N18.png";
import N17 from "/map/bangmodAssets/N17.png";
import N16 from "/map/bangmodAssets/N16.png";
import N15 from "/map/bangmodAssets/N15.png";
import N14 from "/map/bangmodAssets/N14.png";
import N13 from "/map/bangmodAssets/N13.png";
import N12 from "/map/bangmodAssets/N12.png";
import N11 from "/map/bangmodAssets/N11.png";
import N10 from "/map/bangmodAssets/N10.png";
import N9 from "/map/bangmodAssets/N9.png";
import N8 from "/map/bangmodAssets/N8.png";
import N7 from "/map/bangmodAssets/N7.png";
import N6 from "/map/bangmodAssets/N6.png";
import N5 from "/map/bangmodAssets/N5.png";
import N4 from "/map/bangmodAssets/N4.png";
import N3 from "/map/bangmodAssets/N3.png";
import N2 from "/map/bangmodAssets/N2.png";
import N1 from "/map/bangmodAssets/N1.png";

import BangkunteinBackgroud from "/map/interbackgroundBangkuntien.png";


import RatchaburiBackgroud from "/map/interbackgroundRatchaburi.png";

import { useParams } from "react-router-dom";

const InteractiveMap = ({allBuildingData, openModalProp}) => {
  const bangmodBuildings = [
    {
        id: "S15",
        className: "relative ml-1 hover:scale-125 row-start-[37] row-span-10 col-start-[33] col-span-7", // Tailwind utilities for grid positioning
        imgSrc: S15,
        altText: "S15",
        imageClassName: "w-full h-full object-cover p-2 -rotate-1",
        h1Text: "S15",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm"
      },      
      {
        id: "S14",
        className: "relative hover:scale-125 row-start-[13] row-span-7 col-start-[38] col-span-11",
        imgSrc: S14,
        altText: "S14",
        imageClassName: "w-full h-full object-cover p-2 relative rotate-2",
        h1Text: "S14",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm"
      },
      {
        id: "S13",
        className: "relative hover:scale-125 md:ml-1 lg:ml-2 row-start-[13] row-span-10 col-start-[28] col-span-7",
        imgSrc: S13,
        altText: "S13",
        imageClassName: "w-full h-full object-cover m-2",
        h1Text: "S13",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm ml-6"
      },
      {
        id: "S12",
        className: "relative hover:scale-125 row-start-[24] row-span-12 col-start-[26] col-span-6",
        imgSrc: S12,
        altText: "S12",
        imageClassName: "w-full h-full object-cover p-2",
        h1Text: "S12",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm"
      },
      {
        id: "S11",
        className: "relative scale-90 hover:scale-[120%] lg:ml-1 row-start-[36] row-span-12 col-start-[27] col-span-6",
        imgSrc: S11,
        altText: "S11",
        imageClassName: "w-full h-full object-cover",
        h1Text: "S11",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm"
      },
      {
        id: "S10",
        className: "relative hover:scale-125 lg:ml-1 row-start-[45] row-span-3 col-start-[26] col-span-3",
        imgSrc: S10,
        altText: "S10",
        imageClassName: "w-full h-full object-cover",
        h1Text: "S10",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm"
      },
      {
        id: "S9",
        className: "relative scale-110 hover:scale-125 lg:ml-1 row-start-[37] row-span-8 col-start-[18] col-span-5",
        imgSrc: S9,
        altText: "S9",
        imageClassName: "w-full h-full object-cover",
        h1Text: "S9",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm"
      },
      {
        id: "S8",
        className: "relative hover:scale-125 lg:ml-1 row-start-[47] row-span-4 col-start-[19] col-span-3",
        imgSrc: S8,
        altText: "S8",
        imageClassName: "w-full h-full object-cover",
        h1Text: "S8",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm"
      },
      {
        id: "S7",
        className: "relative hover:scale-125 lg:ml-1 row-start-[55] row-span-3 col-start-[21] col-span-3",
        imgSrc: S7,
        altText: "S7",
        imageClassName: "w-full h-full object-cover",
        h1Text: "S7",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm"
      },
      {
        id: "S6",
        className: "relative hover:scale-125 md:ml-1 lg:ml-2 -rotate-3 row-start-[57] row-span-11 col-start-[16] col-span-7",
        imgSrc: S6,
        altText: "S6",
        imageClassName: "w-full h-full object-cover",
        h1Text: "S6",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm"
      },
      {
        id: "S4",
        className: "relative hover:scale-110 lg:ml-1 row-[50_/_span_15] col-[26_/_span_13]",
        imgSrc: S4,
        altText: "S4",
        imageClassName: "w-full h-full object-cover",
        h1Text: "S4",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm"
      },      
      {
        id: "S5",
        className: "relative scale-110 hover:scale-125 lg:ml-1 rotate-2 row-start-[57] row-span-6 col-start-[24] col-span-4",
        imgSrc: S5,
        altText: "S5",
        imageClassName: "w-full h-full object-cover",
        h1Text: "S5",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm"
      },
      {
        id: "S3",
        className: "relative scale-110 hover:scale-125 lg:ml-1 row-start-[67] row-span-8 col-start-[29] col-span-6",
        imgSrc: S3,
        altText: "S3",
        imageClassName: "w-full h-full object-cover",
        h1Text: "S3",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm"
      },
      {
        id: "S2",
        className: "relative scale-110 hover:scale-125 lg:mr-1 row-start-[74] row-span-8 col-start-[33] col-span-7",
        imgSrc: S2,
        altText: "S2",
        imageClassName: "w-full h-full object-cover",
        h1Text: "S2",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm"
      },
      {
        id: "S1",
        className: "relative hover:scale-125 lg:mr-2 row-start-[68] row-span-3 col-start-[37] col-span-3",
        imgSrc: S1,
        altText: "S1",
        imageClassName: "w-full h-full object-cover",
        h1Text: "S1",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm"
      },
      {
        id: "N1",
        className: "relative scale-90 hover:scale-110 row-start-[66] row-span-8 col-start-[46] col-span-4",
        imgSrc: N1,
        altText: "N1",
        imageClassName: "w-full h-full object-cover",
        h1Text: "N1",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm lg:ml-4"
      },
      {
        id: "N2",
        className: "relative scale-90 hover:scale-110 mr-2 row-start-[63] row-span-10 col-start-[51] col-span-6",
        imgSrc: N2,
        altText: "N2",
        imageClassName: "w-full h-full object-cover",
        h1Text: "N2",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm lg:ml-4"
      },
      {
        id: "N3",
        className: "relative hover:scale-110 row-start-[65] row-span-8 col-start-[59] col-span-5",
        imgSrc: N3,
        altText: "N3",
        imageClassName: "w-full h-full object-cover",
        h1Text: "N3",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm lg:ml-4"
      },
      {
        id: "N4",
        className: "relative hover:scale-110 row-start-[57] row-span-8 col-start-[60] col-span-6",
        imgSrc: N4,
        altText: "N4",
        imageClassName: "w-full h-full object-cover",
        h1Text: "N4",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm lg:ml-4"
      },
      {
        id: "N5",
        className: "relative z-10 hover:scale-125 hover:z-20 -mt-2 row-start-[57] row-span-5 col-start-[67] col-span-4",
        imgSrc: N5,
        altText: "N5",
        imageClassName: "w-full h-full object-cover",
        h1Text: "N5",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm lg:ml-4"
      },
      {
        id: "N6",
        className: "relative z-10 hover:scale-125 mr-2 row-start-[60] row-span-6 col-start-[71] col-span-4",
        imgSrc: N6,
        altText: "N6",
        imageClassName: "w-full h-full object-cover",
        h1Text: "N6",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm lg:ml-4"
      },
      {
        id: "N7",
        className: "relative scale-[105%] hover:scale-110 row-[56_/_span_22] col-[68_/span_10]",
        imgSrc: N7,
        altText: "N7",
        imageClassName: "w-full h-full object-cover",
        h1Text: "N7",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm lg:mt-12",
        gaurdClassName: "left-[85%] top-[50%]"
      },
      {
        id: "N8",
        className: "relative scale-110 hover:scale-125 lg:mt-2 z-10 row-start-[75] row-span-2 col-start-[74] col-span-2",
        imgSrc: N8,
        altText: "N8",
        imageClassName: "w-full h-full object-cover",
        h1Text: "N8",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm"
      },
      {
        id: "N9",
        className: "relative scale-110 hover:scale-125 md:mr-2 lg:mr-4 lg:mt-2 row-start-[54] row-span-9 col-start-[83] col-span-5",
        imgSrc: N9,
        altText: "N9",
        imageClassName: "w-full h-full object-cover",
        h1Text: "N9",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm",
        gaurdClassName: "w-full absolute h-full m-auto flex",
      },
      {
        id: "N10",
        className: "relative hover:scale-125 hover:z-20 mr-2 row-start-[47] row-span-9 col-start-[62] col-span-11",
        imgSrc: N10,
        altText: "N10",
        imageClassName: "w-full h-full object-cover",
        h1Text: "N10",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm"
      },
      {
        id: "N11",
        className: "relative scale-90 hover:scale-125 hover:z-20 row-start-[44] row-span-8 col-start-[60] col-span-5",
        imgSrc: N11,
        altText: "N11",
        imageClassName: "w-full h-full object-cover",
        h1Text: "N11",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center ml-4 text-sm"
      },
      {
        id: "N12",
        className: "relative scale-90 hover:scale-125 hover:z-20 rotate-2 row-start-[34] row-span-5 col-start-[56] col-span-4",
        imgSrc: N12,
        altText: "N12",
        imageClassName: "w-full h-full object-cover",
        h1Text: "N12",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm"
      },
      {
        id: "N13",
        className: "relative scale-90 hover:scale-125 hover:z-20 rotate-2 row-start-[31] row-span-3 col-start-[55] col-span-2",
        imgSrc: N13,
        altText: "N13",
        imageClassName: "w-full h-full object-cover",
        h1Text: "N13",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm"
      },
      {
        id: "N14",
        className: "relative scale-90 hover:scale-125 hover:z-20 rotate-2 row-start-[28] row-span-4 col-start-[53] col-span-3",
        imgSrc: N14,
        altText: "N14",
        imageClassName: "w-full h-full object-cover",
        h1Text: "N14",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm"
      },
      {
        id: "N15",
        className: "relative hover:scale-125 hover:z-20 lg:ml-2 row-start-[37] row-span-9 col-start-[53] col-span-4",
        imgSrc: N15,
        altText: "N15",
        imageClassName: "w-full h-full object-cover",
        h1Text: "N15",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm"
      },
      {
        id: "N16",
        className: "relative hover:scale-125 hover:z-20 lg:ml-2 row-[48/span_12] col-start-[52] col-span-6",
        imgSrc: N16,
        altText: "N16",
        imageClassName: "w-full h-full object-cover",
        h1Text: "N16",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm"
      },
      {
        id: "N17",
        className: "relative hover:scale-125 lg:ml-1 row-[45/span_12] col-[45/span_9]",
        imgSrc: N17,
        altText: "N17",
        imageClassName: "w-full h-full object-cover",
        h1Text: "N17",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm"
      },
      {
        id: "N18",
        className: "relative z-10 hover:scale-110 hover:z-20 lg:mr-1 row-start-[43] row-span-9 col-start-[46] col-span-3",
        imgSrc: N18,
        altText: "N18",
        imageClassName: "w-full h-full object-cover",
        h1Text: "N18",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm"
      },
      {
        id: "N19",
        className: "relative z-10 hover:scale-125 hover:z-20 row-start-[39] row-span-4 col-start-[45] col-span-3",
        imgSrc: N19,
        altText: "N19",
        imageClassName: "w-full h-full object-cover",
        h1Text: "N19",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold mr-2 text-center text-sm"
      },
      {
        id: "N20",
        className: "relative scale-80 z-10 hover:scale-125 hover:z-20 row-start-[38] row-span-6 col-start-[49] col-span-3",
        imgSrc: N20,
        altText: "N20",
        imageClassName: "w-full h-full object-cover",
        h1Text: "N20",
        h1ClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm",
        gaurdClassName: "absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm",
      }
  ];

  function checkIsGuarded(itemId) {
    // Find the building object with the matching zone
    const matchingBuilding = allBuildingData.find(
      (building) => building.zone === itemId
    );
  
    // Return the isGuarded value or false if not found
    return matchingBuilding ? matchingBuilding.isGuarded : false;
  }
  

  const handleBuildingClick = (buildingId) => {
    // Find the building that matches the clicked component's ID
    const building = allBuildingData.find((item) => item.zone === buildingId);

    if (building) {
      openModalProp(building); 
    }
  };

  const { campusName } = useParams();

  const buildings = 
    campusName.toLowerCase() === "bangmod" 
      ? bangmodBuildings 
      : campusName.toLowerCase() === "bangkuntein" 
        ? bangkunteinBuildings
        : ratchaburiBuildings;

    const backgroundImage = 
        campusName.toLowerCase() === "bangmod" 
        ? BangmodBackgroud 
        : campusName.toLowerCase() === "bangkuntein" 
            ? BangkunteinBackgroud
            : RatchaburiBackgroud;


  return (
    <div
      className="border-2 border-black w-auto rounded-xl h-auto aspect-[7/5] mx-auto h-[80vh] overflow-hidden grid grid-cols-[repeat(100,minmax(0,1fr))] grid-rows-[repeat(100,minmax(0,1fr))]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {buildings.map((item) => (
  <div
    key={item.id}
    id={item.id}
    className={item.className}
    onClick={() => handleBuildingClick(item.id)}
  >
    <img
      src={item.imgSrc}
      alt={item.altText}
      className={item.imageClassName}
    />
    {/* Guard Icon Positioned Above the H1 */}
    {checkIsGuarded(item.id) &&  <svg className={`${item.gaurdClassName} w-2 h-2 md:w-10 md:h-10 absolute top-0 left-0 z-30 left-1/2 transform -translate-x-1/2`} height="8px" width="8px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve">
      <style type="text/css">
        {`
          .st0{fill:#000000;}
        `}
      </style>
      <g>
        <path className="st0" d="M222.36,497.612c0.865,8.18,7.758,14.388,15.986,14.388h23.059h23.059c8.228,0,15.121-6.208,15.986-14.388 l10.788-102.54h-99.667L222.36,497.612z"/>
        <path className="st0" d="M262.131,194.111c33.55,0,60.748-27.204,60.748-60.748V60.748C322.879,27.197,295.682,0,262.131,0 c-33.55,0-60.747,27.197-60.747,60.748v72.616C201.384,166.906,228.582,194.111,262.131,194.111z M218.74,134.671 c0-6.796,5.508-12.304,12.297-12.304h62.187c6.789,0,12.298,5.508,12.298,12.304v2.159c0,23.924-19.467,43.391-43.391,43.391 c-23.923,0-43.391-19.467-43.391-43.391V134.671z"/>
        <path className="st0" d="M295.031,199.17l-33.626,12.657l-33.626-12.657c0,0-11.135,4.595-22.879,14.436l-3.212-18.326 c-0.886-5.031-4.553-8.768-8.892-9.682l-7.944-45.294l2.823-0.491l-4.713-26.852l-15.896,2.775l4.713,26.858l2.824-0.492 l7.945,45.294c-3.786,2.332-5.959,7.094-5.073,12.132l6.962,39.682c-3.938,8.096-6.56,17.46-6.56,28.304v92.124l31.827,17.716 h103.405l31.827-17.716v-92.124C344.934,219.488,295.031,199.17,295.031,199.17z M261.405,338.381c-4.817,0-8.72-3.917-8.72-8.726 c0-4.824,3.903-8.727,8.72-8.727c4.824,0,8.726,3.903,8.726,8.727C270.131,334.464,266.228,338.381,261.405,338.381z M261.405,298.741c-4.817,0-8.72-3.917-8.72-8.727c0-4.824,3.903-8.726,8.72-8.726c4.824,0,8.726,3.902,8.726,8.726 C270.131,294.824,266.228,298.741,261.405,298.741z M261.405,260.138c-4.817,0-8.72-3.903-8.72-8.733c0-4.824,3.903-8.72,8.72-8.72 c4.824,0,8.726,3.896,8.726,8.72C270.131,256.235,266.228,260.138,261.405,260.138z"/>
      </g>
    </svg>}

    {/* h1 text */}
    <h1 className={`${item.h1ClassName} text-xs md:text-base z-40`}>
      {item.h1Text}
    </h1>
  </div>
))}

    </div>
  );
};

export default InteractiveMap;
