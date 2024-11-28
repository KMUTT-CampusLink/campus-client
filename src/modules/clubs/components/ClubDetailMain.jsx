// import React from 'react'
// import ClubDetailCard from './ClubDetailCard'
// import ClubDetailInfo from './ClubDetailInfo'

// const ClubDetailMain = () => {
//   return (
//     <div className="m-12 md:m-16 lg:m-20">
//         <ClubDetailCard/>
//         <ClubDetailInfo/>
//     </div>
//   )
// }
// export default ClubDetailMain;

import React, { useState, useEffect } from "react";
import ClubDetailCard from "./ClubDetailCard";
import ClubDetailInfo from "./ClubDetailInfo";
import { axiosInstance } from "../../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { set } from "react-hook-form";

const ClubDetailMain = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [memberId, setMemberId] = useState(null);
  const { clubId } = useParams();

  useEffect(() => {
    const fetchMemberStatus = async () => {
      try {
        const response = await axiosInstance.get(`/clubs/membership/${clubId}`);
        const { isAdmin, isMember, memberId } = response.data;

        console.log("Admin status:", isAdmin); // Debug
        console.log("Membership status:", isMember); // Debug
        console.log("Member ID:", memberId); // Debug

        setIsAdmin(isAdmin);
        setIsMember(isMember);
        setMemberId(memberId);
      } catch (error) {
        console.error("Error fetching membership status:", error);
        setIsAdmin(false);
        setIsMember(false);
        setMemberId(null);
      }
    };

    fetchMemberStatus();
  }, [clubId]);

  return (
    <div className="m-12 md:m-16 lg:m-20">
      {/* Pass isAdmin and isMember to both components */}
      <ClubDetailCard isAdmin={isAdmin} isMember={isMember} memberId={memberId} />
      <ClubDetailInfo isAdmin={isAdmin} isMember={isMember} memberId={memberId}/>
    </div>
  );
};

export default ClubDetailMain;