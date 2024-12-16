import React from "react";
import { Link } from "react-router-dom";

function ClubCard({ clubs }) {
  return (
    <div className="p-4 my-4 bg-gray-100 rounded-lg shadow-sm">
      <h3 className="mb-4 text-xl font-bold">Joined Clubs</h3>
      <div className="">
        {clubs && clubs.length > 0 ? (
          clubs.map((club, index) => (
            <Link key={index} to={`/clubs/${club.id}`}>
              <div className="p-4 my-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <img
                  className="w-10 h-10 rounded-full mx-auto"
                  src={`${
                    import.meta.env.VITE_MINIO_URL +
                    import.meta.env.VITE_MINIO_BUCKET_NAME
                  }/${club.club_img}`}
                  alt={`${club.name} logo`}
                />
                <h4 className="text-center md:text-lg font-semibold mt-2">
                  {club.name}
                </h4>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-600">No clubs joined yet.</p>
        )}
      </div>
    </div>
  );
}

export default ClubCard;
