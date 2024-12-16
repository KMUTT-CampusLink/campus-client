import EmployeeAdd from "../pages/EmployeeAdd";
import EmployeeDetail from "../pages/EmployeeDetail";
import EmployeeGrid from "../pages/EmployeeGrid";
import EmployeeUpdate from "../pages/EmployeeUpdate";
import LandingPage from "../pages/LandingPage";
import StudentAdd from "../pages/StudentAdd";
import StudentDetail from "../pages/StudentDetail";
import StudentUpdate from "../pages/StudentUpdate";
import StudentGrid from "../pages/StudentGrid";
import CourseGrid from "../pages/CourseGrid";
import CourseAdd from "../pages/CourseAdd";
import CourseUpdate from "../pages/CourseUpdate";
import CourseDetail from "../pages/CourseDetail";
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

    {
      path: "course",
      element: (
        <AuthRoute allowed_roles={["Management"]}>
          <CourseGrid />
        </AuthRoute>
      ),
    },
    {
      path: "courseDetail/:code",
      element: (
        <AuthRoute allowed_roles={["Management"]}>
          <CourseDetail />
        </AuthRoute>
      ),
    },
    {
      path: "courseAdd",
      element: (
        <AuthRoute allowed_roles={["Management"]}>
          <CourseAdd />
        </AuthRoute>
      ),
    },
    {
      path: "courseUpdate/:code",
      element: (
        <AuthRoute allowed_roles={["Management"]}>
          <CourseUpdate />
        </AuthRoute>
      ),
    },


  ];
}
