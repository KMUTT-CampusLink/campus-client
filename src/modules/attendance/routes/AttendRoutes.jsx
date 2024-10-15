import AttendancePage from "../page/AttendancePage";
import DashboardPage from "../page/DashboardPage";
import QrPage from "../page/QrPage";


export default function AttendRoutes() {
  return [
    {
      path: "",
      element: <AttendancePage />,
    },
    {
      path: "dashboard",
      element: <DashboardPage />,
    },
    {
      path: "qr",
      element: <QrPage />,
    },
    {
      path: "attendance",
      element: <AttendancePage />,
    },
  ];
}