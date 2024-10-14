import TrDashboard from '../pages/Teacher/TrDashboard'
import StDashboard from '../pages/Students/StDashboard';

export default function CourseRoutes() {
  return [
    {
      path: "TrDashboard",
      element: <TrDashboard/>
    },
    {
      path: "StDashboard",
      element: <StDashboard />,
    }
  ];
}
