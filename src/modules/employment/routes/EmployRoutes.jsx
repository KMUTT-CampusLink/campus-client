import EmployeeAdd from "../pages/EmployeeAdd";
import EmployeeDetail from "../pages/EmployeeDetail";
import EmployeeGrid from "../pages/EmployeeGrid"


export default function EmployRoutes() {
  return [
    {
      path: "",
      element: <EmployeeGrid />,
    },
    {
      path: "employee/:id",
      element: <EmployeeDetail />
    },
    {
      path: "employadd",
      element: <EmployeeAdd />
    }
  ];
}
