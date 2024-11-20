import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const RedirectPage = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(() => localStorage.getItem("userRole"));
  }, []);

  if (!role) return null;
  return (
    (role === "Student" && <Navigate to="student" />) || (
      <Navigate to="administrator" />
    )
  );
};

export default RedirectPage;
