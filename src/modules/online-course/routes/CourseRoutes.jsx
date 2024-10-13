import TrDashboard from "../Teacher/TrDashboard";


export default function CourseRoutes() {
  return [
    {
      path: "",
      element: <TrDashboard />,
    },
  ];
}
