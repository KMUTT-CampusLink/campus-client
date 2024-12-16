import AttendancePage from "../page/AttendancePage";
import QrPage from "../page/QrPage";
import StAttendancePage from "../page/StAttendancePage";
import StQrPage from "../page/StQrPage";
import FaceAttendancePage from "../page/faceAttendacePage";
import AuthRoute from "../../registration/middleware/AuthRoute"; // Assuming AuthRoute is your auth protection component

export default function AttendRoutes() {
  return [
    {
      path: "student/", // Base path for student routes
      children: [
        {
          path: ":sectionId/", // Route for student attendance page
          element: <AuthRoute allowed_roles={["Student"]}><StAttendancePage /></AuthRoute>, // Wrap with AuthRoute for authentication
        },
        {
          path: ":sectionId/StQr", // Route for student QR page
          element: <AuthRoute allowed_roles={["Student"]}><StQrPage /></AuthRoute>,  // Wrap with AuthRoute for authentication
        },
      ],
    },
    {
      path: "professor/",  // Base path for professor routes
      children: [
        {
          path: ":sectionId/", // Route for professor attendance page
          element: <AuthRoute allowed_roles={["Professor"]}><AttendancePage /></AuthRoute>,  // Wrap with AuthRoute for authentication
        },
        {
          path: ":sectionId/profQr", // Route for professor QR page
          element: <AuthRoute allowed_roles={["Professor"]}><QrPage /></AuthRoute>,  // Wrap with AuthRoute for authentication
        },
        {
          path: ":sectionId/faceAttendance", // Route for professor face attendance page
          element: <AuthRoute allowed_roles={["Professor"]}><FaceAttendancePage /></AuthRoute>,  // Wrap with AuthRoute for authentication
        },
      ],
    },
  ];
}
