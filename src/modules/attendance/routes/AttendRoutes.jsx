import AttendancePage from "../page/AttendancePage";
import QrPage from "../page/QrPage";
import StAttendancePage from "../page/StAttendancePage";
import StQrPage from "../page/StQrPage";
import FaceAttendancePage from "../page/faceAttendacePage";
import QrScannerComponent from "../components/ScannerComponent";
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
      path: "statt",
      element: <StAttendancePage/>,
    },
    {
      path: "faceAttendance",
      element: <FaceAttendancePage/>
    }

  ];
}