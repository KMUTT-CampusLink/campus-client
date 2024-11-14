import ProfessorDashBoard from "../pages/professor/DashBoard";

export default function DevAttendRoutes() {
  return [
    {
      path: "professor",
      children: [
        {
          path: "",
          element: <ProfessorDashBoard />,
        },
      ],
    },
  ];
}
