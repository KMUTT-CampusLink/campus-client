import StDashboard from "../pages/Students/StDashboard";
import TrDashboard from "../pages/Teacher/TrDashboard";

export default function CourseRoutes() {
  return [
    {
      path: "Tr",
      element: <TrDashboard />,
    },
    {
      path: "St",
      element: <StDashboard/>,
    },
  ];
}
