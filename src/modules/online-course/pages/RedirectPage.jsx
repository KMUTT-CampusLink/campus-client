import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectPage = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole");
  useEffect(() => {
    if (role === "Student") {
      navigate("/courses/st");
    } else {
      navigate("/courses/tr");
    }
  }, []);
  return <div>RedirectPage</div>;
};

export default RedirectPage;
