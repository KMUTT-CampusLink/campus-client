import { useState } from "react";
import DriverPage from "./DriverPage";
import StudentPage from "./StudentPage";
import NotSignedInPage from "./NotSignedInPage";

const RedirectPage = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  if (userRole === null) return null;
  return (
    (userRole === "Student" && <StudentPage />) ||
    (userRole === "Driver" && <DriverPage />) || <NotSignedInPage />
  );
};

export default RedirectPage;
