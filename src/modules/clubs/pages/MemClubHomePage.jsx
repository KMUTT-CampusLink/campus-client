import React from "react";
import ClubHomeMemLis from "../components/ClubHomeMemLis";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import MemClubHomePost from "../components/MemClubHomePost";

const MemClubHomePage = () => {
  const { clubId } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [isViewMembersActive, setIsViewMembersActive] = useState(false);

  const toggleVisiblity = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="grid md:h-screen overflow-hidden">
      <main className="bg-white h-full rounded-t-[35px] w-screen">
        <div className="bottom-section-wrapper m-8 md:m-16 lg:m-20 h-3/5  ">
          <button
            onClick={toggleVisiblity}
           className={`flex ml-auto mt-6 md:hidden underlined px-3 py-1 rounded-lg mb-4 ${
              isViewMembersActive ? "bg-orange-600 text-white" : "bg-[#864E41] text-white"
            }`}
          >
            View Members
          </button>
          <div className="grid grid-cols-1 overflow-scroll md:grid-cols-[75%_25%] w-full rounded-lg">
            <MemClubHomePost toggleLeft={!isVisible} />
            <ClubHomeMemLis toggleRight={isVisible} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MemClubHomePage;
