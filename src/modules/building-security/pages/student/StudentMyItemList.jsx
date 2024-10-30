import React from "react";
import MyItemList from "../../components/MyItemList";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";

export default function StudentMyItemList() {
  return (
    <>
      <NavBar />
      <div className="container">
        <h1>My Item List</h1>
        <p>Detailed information</p>
        <MyItemList/>
      </div>
    </>
  );
}