import React from "react";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import LostAndFoundForm from "../../components/LostAndFoundForm"

export default function AdministratorLostAndFoundForm() {
  return (
    <>
      <NavBar />
      <div className="container">
        <h1>Lost And Found Form</h1>
        <p>Detailed information</p>
        <LostAndFoundForm />
      </div>
    </>
  );
}
