import React from "react";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import MaintenanceRequestForm from "../../components/MaintenanceRequestForm";

export default function AdministratorMaintenanceRequest() {
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
