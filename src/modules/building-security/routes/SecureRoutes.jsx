//Student
import StudentMainPage from "../pages/student/StudentMainPage";
import StudentMaintenanceRequest from "../pages/student/StudentMaintenanceRequest";
import StudentMaintenanceList from "../pages/student/StudentMaintenanceList";
import StudentLostAndFound from "../pages/student/StudentLostAndFound";
import StudentMyItemList from "../pages/student/StudentMyItemList";

//Administrator
import AdministratorLostAndFoundList from "../pages/administrator/AdministratorLostAndFoundList";
import AdministratorMainPage from "../pages/administrator/AdministratorMainPage";
import AdministratorMaintenanceList from "../pages/administrator/AdministratorMaintenanceList";
import AdministratorMaintenanceRequest from "../pages/administrator/AdministratorMaintenanceRequest";
import AdministratorMyBookingList from "../pages/administrator/AdministratorMyBookingList";
import AdministratorMyBookingSubmit from "../pages/administrator/AdministratorMyBookingSubmit";
import AdministratorLostAndFoundForm from "../pages/administrator/AdministratorLostAndFoundForm";
import AuthRoute from "../../registration/middleware/AuthRoute";

// redirect page
import RedirectPage from "../pages/RedirectPage";

export default function SecureRoutes() {
  return [
    {
      path: "",
      element: <RedirectPage />,
    },
    {
      //student
      path: "student",
      children: [
        {
          path: "",
          element: (
            <AuthRoute allowed_roles={["Student"]}>
              <StudentMainPage />
            </AuthRoute>
          ),
        },
        {
          path: "request",
          element: (
            <AuthRoute allowed_roles={["Student"]}>
              <StudentMaintenanceRequest />
            </AuthRoute>
          ),
        },
        {
          path: "list",
          element: (
            <AuthRoute allowed_roles={["Student"]}>
              <StudentMaintenanceList />
            </AuthRoute>
          ),
        },
        {
          path: "lostandfound",
          element: (
            <AuthRoute allowed_roles={["Student"]}>
              <StudentLostAndFound />
            </AuthRoute>
          ),
        },
        {
          path: "myitemlist",
          element: (
            <AuthRoute allowed_roles={["Student"]}>
              <StudentMyItemList />
            </AuthRoute>
          ),
        },
      ],
    },

    {
      //administrator
      path: "administrator",
      children: [
        {
          path: "",
          element: (
            <AuthRoute allowed_roles={["Professor", "Staff"]}>
              <AdministratorMainPage />
            </AuthRoute>
          ),
        },
        {
          path: "request",
          element: (
            <AuthRoute allowed_roles={["Professor", "Staff"]}>
              <AdministratorMaintenanceRequest />
            </AuthRoute>
          ),
        },
        {
          path: "list",
          element: (
            <AuthRoute allowed_roles={["Professor", "Staff"]}>
              <AdministratorMaintenanceList />
            </AuthRoute>
          ),
        },
        {
          path: "lostandfoundlist",
          element: (
            <AuthRoute allowed_roles={["Professor", "Staff"]}>
              <AdministratorLostAndFoundList />
            </AuthRoute>
          ),
        },
        {
          path: "mybooking",
          element: (
            <AuthRoute allowed_roles={["Professor", "Staff"]}>
              <AdministratorMyBookingSubmit />
            </AuthRoute>
          ),
        },
        {
          path: "mybookinglist",
          element: (
            <AuthRoute allowed_roles={["Professor", "Staff"]}>
              <AdministratorMyBookingList />
            </AuthRoute>
          ),
        },
        {
          path: "lostandfoundform",
          element: (
            <AuthRoute allowed_roles={["Professor", "Staff"]}>
              <AdministratorLostAndFoundForm />
            </AuthRoute>
          ),
        },
      ],
    },
  ];
}
