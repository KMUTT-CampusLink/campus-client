import React from "react";
import MaintenanceRequestForm from "../../components/MaintenanceRequestForm";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";

export default function StudentMaintenanceRequest() {
  return (
    <>
      <NavBar />
      <div className="container">
        <h1>My Maintenance Requests</h1>
        <p>Detailed information</p>
        <MaintenanceRequestForm />
      </div>
    </>
  );
}
