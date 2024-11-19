import EmployeeAdd from "../pages/EmployeeAdd";
import EmployeeDetail from "../pages/EmployeeDetail";
import EmployeeGrid from "../pages/EmployeeGrid";
import EmployeeUpdate from "../pages/EmployeeUpdate";
import LandingPage from "../pages/LandingPage";
import StudentAdd from "../pages/StudentAdd";
import StudentDetail from "../pages/StudentDetail";
import StudentUpdate from "../pages/StudentUpdate";
import StudentGrid from "../pages/StudentGrid";
import AuthRoute from "../../registration/middleware/AuthRoute";
export default function EmployRoutes() {
  return [
    {
      path: "",
      element: (
        <AuthRoute allowed_roles={["Management"]}>
          <LandingPage />
        </AuthRoute>
      ),
    },

    {
      path: "employee",
      element: (
        <AuthRoute allowed_roles={["Management"]}>
          <EmployeeGrid />
        </AuthRoute>
      ),
    },
    {
      path: "employeeDetail/:id",
      element: (
        <AuthRoute allowed_roles={["Management"]}>
          <EmployeeDetail />
        </AuthRoute>
      ),
    },
    {
      path: "employeeAdd",
      element: (
        <AuthRoute allowed_roles={["Management"]}>
          <EmployeeAdd />
        </AuthRoute>
      ),
    },
    {
      path: "employeeUpdate/:id",
      element: (
        <AuthRoute allowed_roles={["Management"]}>
          <EmployeeUpdate />
        </AuthRoute>
      ),
    },

    {
      path: "student",
      element: (
        <AuthRoute allowed_roles={["Management"]}>
          <StudentGrid />
        </AuthRoute>
      ),
    },
    {
      path: "studentDetail/:id",
      element: (
        <AuthRoute allowed_roles={["Management"]}>
          <StudentDetail />
        </AuthRoute>
      ),
    },
    {
      path: "studentAdd",
      element: (
        <AuthRoute allowed_roles={["Management"]}>
          <StudentAdd />
        </AuthRoute>
      ),
    },
    {
      path: "studentUpdate/:id",
      element: (
        <AuthRoute allowed_roles={["Management"]}>
          <StudentUpdate />
        </AuthRoute>
      ),
    },
  ];
}
