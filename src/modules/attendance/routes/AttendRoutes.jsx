import AttendancePage from "../page/AttendancePage";
import QrPage from "../page/QrPage";
import StAttendancePage from "../page/StAttendancePage";
import StQrPage from "../page/StQrPage";
import FaceAttendancePage from "../page/faceAttendacePage";
import AuthRoute from "../../registration/middleware/AuthRoute";
export default function AttendRoutes() {
  return [
    
    {
      path: "",
      element: (<AuthRoute allowed_roles={["Professor"]}><AttendancePage /></AuthRoute>),
    },
    
    {
      path: "qr",
      element: (<AuthRoute allowed_roles={["Professor"]}><QrPage /></AuthRoute>),
    },
    {
      path: "stQr",
      element: (<AuthRoute allowed_roles={["Student"]}><StQrPage /></AuthRoute>),
    },
    {
      path: "statt",
      element: (<AuthRoute allowed_roles={["Student"]}><StAttendancePage /></AuthRoute>),
    },
    {
      path: "faceAttendance",
      element: (<AuthRoute allowed_roles={["Professor"]}><FaceAttendancePage /></AuthRoute>)
    }

  ];
}