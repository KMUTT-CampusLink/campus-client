import EmployeeAdd from "../pages/EmployeeAdd";
import EmployeeDetail from "../pages/EmployeeDetail";
import EmployeeGrid from "../pages/EmployeeGrid"
import EmployeeUpdate from "../pages/EmployeeUpdate";


export default function EmployRoutes() {
  return [
    {
      path: "",
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
    }
  ];
}
