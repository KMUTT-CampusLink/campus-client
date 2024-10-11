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
      path: "employee/:id",
      element: <EmployeeDetail />
    },
    {
      path: "employadd",
      element: <EmployeeAdd />
    },
    {
      path: "employupdate",
      element: <EmployeeUpdate />
    }
  ];
}
