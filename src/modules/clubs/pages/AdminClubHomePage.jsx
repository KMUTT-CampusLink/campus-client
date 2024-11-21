import React from "react";
import ClubHomeMemLis from "../components/ClubHomeMemLis";
import ClubHomePost from "../components/AdminClubHomePost";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const ClubHomePage = () => {
  const { clubId } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [isViewMembersActive, setIsViewMembersActive] = useState(false);

  const toggleVisiblity = () => {
    setIsVisible(!isVisible);
    setIsViewMembersActive(!isViewMembersActive);
  };

  return (
    <div className="grid md:h-screen overflow-hidden">
      <main className="bg-white h-full rounded-t-[35px] w-screen">
        <div className="bottom-section-wrapper m-8 md:m-16 lg:m-20 h-3/5  ">
          <div className="flex md:flex-wrap justify-evenly md:justify-end mb-4">
            {/*flex flex-wrap justify-evenly md:justify-end mb-4 mx-auto */}
            <Link
              to={`/clubs/admin/${clubId}/view-requests`}
              className="bg-[#EC5A51] text-white text-center px-3 mx-2 pt-2 md:px-10 mt-4 md:mt-0 py-1 md:py-2 rounded-lg text-base hover:bg-orange-600 md:mr-8 flex"
            >
              View Request
            </Link>
            <Link
              to={`/clubs/admin/create-post/${clubId}`}
              className="bg-[#EC5A51] text-white text-center px-3 mx-2 md:px-10 py-1 mt-4 md:mt-0 md:py-2 rounded-lg text-base hover:bg-orange-600 md:mr-8 flex"
            >
              Create Post
            </Link>
            <Link
              to={`/clubs/admin/create-announcement/${clubId}`}
              className="bg-[#EC5A51] text-white text-center px-3 mx-2 md:px-10 py-1 mt-4 md:mt-0 md:py-2 rounded-lg text-base hover:bg-orange-600 flex"
            >
              Create Event
            </Link>
          </div>
          <button
            onClick={toggleVisiblity}
            className={`flex ml-auto mt-6 md:hidden underlined px-3 py-1 rounded-lg mb-4 ${
              isViewMembersActive ? "bg-orange-600 text-white" : "bg-[#864E41] text-white"
            }`}
          >
            View Members
          </button>
          <div className="grid grid-cols-1 overflow-scroll md:grid-cols-[75%_25%] w-full rounded-lg">
            <ClubHomePost toggleLeft={!isVisible} />
            <ClubHomeMemLis toggleRight={isVisible} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClubHomePage;
