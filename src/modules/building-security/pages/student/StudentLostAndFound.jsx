import React from "react";
import LostAndFoundForm from "../../components/LostAndFoundForm";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";

export default function StudentLostAndFound() {
  return (
    <>
      <NavBar />
      <div className="container">
        <h1>My Maintenance Requests</h1>
        <p>Detailed information</p>
        <LostAndFoundForm />
      </div>
    </>
  );
}
