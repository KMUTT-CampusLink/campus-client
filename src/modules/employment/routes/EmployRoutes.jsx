import EmployeeAdd from "../pages/EmployeeAdd";
import EmployeeDetail from "../pages/EmployeeDetail";
import EmployeeGrid from "../pages/EmployeeGrid"
import EmployeeUpdate from "../pages/EmployeeUpdate";
import LandingPage from "../pages/LandingPage"
import StudentAdd from "../pages/StudentAdd"
import StudentDetail from "../pages/StudentDetail"
import StudentUpdate from "../pages/StudentUpdate"
import StudentGrid from "../pages/StudentGrid"


export default function EmployRoutes() {
  return [
    {
      path: "",
      element: <LandingPage/>
    },

    {
      path: "employee",
      element: <EmployeeGrid />,
    },
    {
      path: "employeeDetail/:id",
      element: <EmployeeDetail />
    },
    {
      path: "employeeAdd",
      element: <EmployeeAdd />
    },
    {
      path: "employeeUpdate/:id",
      element: <EmployeeUpdate />
    },
    
    {
      path: "student",
      element: <StudentGrid />,
    },
    {
      path: "studentDetail/:id",
      element: <StudentDetail />
    },
    {
      path: "studentAdd",
      element: <StudentAdd />
    },
    {
      path: "studentUpdate/:id",
      element: <StudentUpdate />
    }
  ];
}
