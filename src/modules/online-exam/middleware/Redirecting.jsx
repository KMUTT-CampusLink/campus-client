import { useEffect, useState } from "react";
import { axiosInstance } from '../../../utils/axiosInstance';
import { Navigate, useLocation } from "react-router-dom";

export default function Redirecting(Component) {
  return (props) => {
    const { pathname } = useLocation();
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const verifyAuth = async () => {
      try {
        const response = await axiosInstance.get("/exams/validateRoles");
        setRole(response.data);
      } catch (error) {
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      verifyAuth();
    }, []);

    if (loading) {
      return null;
    }
    
    if (role === "Professor" && !pathname.includes("professor")) {
      const newPath = pathname.replace("student", "professor");
      return <Navigate to={`${newPath}`} replace />;
    }
    if (role === "Student" && !pathname.includes("student")) {
      const newPath = pathname.replace("professor", "student");
      return <Navigate to={`${newPath}`} replace />;
    }
    return <Component {...props} />;
  };
}