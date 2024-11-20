import AttendancePage from "../page/AttendancePage";
import QrPage from "../page/QrPage";
import StAttendancePage from "../page/StAttendancePage";
import StQrPage from "../page/StQrPage";
import FaceAttendancePage from "../page/faceAttendacePage";  // Import your new page
import QrScannerComponent from "../components/ScannerComponent";
import AuthRoute from "../../registration/middleware/AuthRoute";  // Import the AuthRoute component

export default function AttendRoutes() {
  return [
    {
      path: "",
      element: (
        <AuthRoute>
          <AttendancePage />
        </AuthRoute>
      ),
    },
    {
      path: "qr",
      element: (
        <AuthRoute>
          <QrPage />
        </AuthRoute>
      ),
    },
    {
      path: "stQr",
      element: (
        <AuthRoute>
          <StQrPage />
        </AuthRoute>
      ),
    },
    {
      path: "statt",
      element: (
        <AuthRoute>
          <StAttendancePage />
        </AuthRoute>
      ),
    },
    {
      path: "faceAttendance",  
      element: (
        <AuthRoute>
          <FaceAttendancePage />
        </AuthRoute>
      ),
    },
  ];
}