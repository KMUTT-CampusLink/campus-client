import React from "react";
import { Link } from "react-router-dom";

function ClubDetailCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:mb-8">
      <div>
        <img
          src="https://i.imgur.com/iPUUzwh.jpg"
          className=" w-[90%] md:w-[70%] h-auto m-auto rounded-xl"
        />
      </div>

      <div className="grid m-[10%] md:m-auto justify-content-start font-semibold text-[1rem] md:text-[2rem] gap-x-20">
        <h1>Football Club</h1>
        <h1>Group Admin-5</h1>
        <h1>Group Members-100</h1>
        <Link to="/clubs/join-club">
          <button
            className="flex md:grid m-auto mt-3 md:mt-8 text-center p-3 md:p-3 w-max md:w-full rounded-2xl text-s md:text-xl shadow-lg text-white"
            style={{ backgroundColor: "#F69800" }}
          >
            Join Club Now!
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ClubDetailCard;
