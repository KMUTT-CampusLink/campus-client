import { useEffect } from 'react'
import { axiosInstance } from '../../../utils/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';


export default function Redirecting() {
  const navigate = useNavigate();
  const { id } = useParams();
  const validateToken = async () => {
    try {
      const response = await axiosInstance.get("/exams/validateRoles");
      if (response.data === "Professor"){
        navigate(`/exams/professor/${id}`);
      }else{
        navigate(`/exams/student/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    validateToken();
  },[])

  return (
    <div>redirecting</div>
  )
}
