import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBarComponents/NavBar";

const NavigationPage = () => {
  return (
    <div>
      <NavBar />

      <div className="mx-auto max-w-7xl pt-20 pb-6 w-4/5">
        <h1>Navigation Page</h1>
        <ul>
          <li>
            <Link to="./home">Seach for routes</Link>
          </li>
          <li>
            <Link to="/page2"></Link>
          </li>
          <li>
            <Link to="/page3">Page 3</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavigationPage;
