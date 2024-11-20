import { useEffect, useState } from "react";
import { axiosInstance } from '../../../utils/axiosInstance';
import { Navigate, useParams } from "react-router-dom";

export default function verifySection(Component) {
  return (props) => {
    const [loading, setLoading] = useState(true);
    const { sectionId } = useParams();
    const [status, setStatus] = useState(null);
    const section = async () => {
      try {
        const response = await axiosInstance.get(`/exams/validateSection?sectionId=${sectionId}`);
        setStatus(response.data.status);
      } catch (error) {
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
        section();
    }, []);

    if (loading) {
      return null;
    }
    
    if (!status) {
      return <Navigate to={`/`} replace />;
    }
    return <Component {...props} />;
  };
}