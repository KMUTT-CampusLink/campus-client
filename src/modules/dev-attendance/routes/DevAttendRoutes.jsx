// Professor Routes
import ProfessorDashBoard from "../pages/professor/ProfessorDashBoard";
import SettingPage from "../pages/professor/SettingPage";
import RecordPage from "../pages/professor/RecordPage";
import ManagePage from "../pages/professor/ManagePage";

export default function DevAttendRoutes() {
  return [
    {
      path: "professor/:section_id",
      element: <ProfessorDashBoard />,
      children: [
        {
          path: "",
          element: <RecordPage />,
        },
        {
          path: "manage",
          element: <ManagePage />,
        },
        {
          path: "setting",
          element: <SettingPage />,
        },
      ],
    },
  ];
}
