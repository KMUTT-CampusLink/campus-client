import NavBar from "../../registration/components/NavBarComponents/NavBar";
import { useNavigate } from "react-router-dom";
import dummydata from "./employee.json";
import { useParams } from "react-router-dom";

const EmployeeUpdate = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  // Dummy data fetch - replace with actual API call
  useEffect(() => {
    const fetchEmployee = async () => {
      const data = dummydata;

      const emp = data.find((emp) => emp.id == id);
      setEmployee(emp);
    };
    fetchEmployee();
  }, [id]);

  if (!employee) return <p>Loading...</p>;

  return (
    <div>
        
    </div>
  )
}

export default EmployeeUpdate