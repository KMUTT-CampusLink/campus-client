import AttendancePage from "../page/AttendancePage";
import QrPage from "../page/QrPage";
import StAttendancePage from "../page/StAttendancePage";
import StQrPage from "../page/StQrPage";

export default function AttendRoutes() {
  return [
    {
      path: "",
      element: <AttendancePage />,
    },
    {
      path: "qr",
      element: <QrPage />,
    },
    {
      path: "stQr",
      element: <StQrPage />,
    },
    {
      path: "stAttendance",
      element: <StAttendancePage />,
    },
  ];
}
