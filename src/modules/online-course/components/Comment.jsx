import React from "react";
import profile from "../assets/profile-circle.png";


const Comment = () => {
  return (
    <div className="flex w-auto gap-2">
      <div className="flex flex-col gap-4">
        <img src={profile} className="rounded-lg" />
      </div>
      <div className="flex flex-col rounded-lg p-2">
        <h2>NAY CHI LIN LEI 66130500817</h2>
        <p>
          Advantages:
          <br />
          1. Simple to invert bits.
          <br />
          2. Symmetry in number representation.
        </p>
      </div>
    </div>
  );
};

export default Comment;