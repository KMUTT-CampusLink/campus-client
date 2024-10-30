import React from "react";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import MaintenanceList from "../../components/MaintenanceList";

export default function AdministratorMaintenanceList() {
  return (
    <>
      <NavBar />
      <div className="container">
        <h1>My Maintenance List</h1>
        <p>Detailed information</p>
        <MaintenanceList />
      </div>
    </>
  );
}
