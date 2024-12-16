import AttendancePage from "../page/AttendancePage";
import StAttendancePage from "../page/StAttendancePage";
import StQrPage from "../page/StQrPage";
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
        }
      ],
    },
  ];
}
