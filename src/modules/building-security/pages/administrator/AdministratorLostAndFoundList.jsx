import React from "react";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import LostAndFoundList from "../../components/LostAndFoundList"

export default function AdministratorLostAndFoundList() {
  return (
    <>
      <NavBar />
      <div className="container">
        <h1>Lost And Found List</h1>
        <p>Detailed information</p>
        <LostAndFoundList />
      </div>
    </>
  );
}
