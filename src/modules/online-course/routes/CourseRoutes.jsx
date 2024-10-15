import { Children } from "react";
import StDashboard from "../pages/Students/StDashboard";
import TrDashboard from "../pages/Teacher/TrDashboard";
import TrCourseDescription from "../pages/Teacher/TrCourseDescription";

export default function CourseRoutes() {
  return [
    {
      path: "",
      element: <TrDashboard />,
    },
  ];
}
