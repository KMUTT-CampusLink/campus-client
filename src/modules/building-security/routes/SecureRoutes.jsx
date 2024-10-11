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

export default function SecureRoutes() {
  return [
    {
      //student
      path: "student",
      children: [
        {
          path: "",
          element: <StudentMainPage />,
        },
        {
          path: "request",
          element: <StudentMaintenanceRequest />,
        },
        {
          path: "list",
          element: <StudentMaintenanceList />,
        },
        {
          path: "lostandfound",
          element: <StudentLostAndFound />,
        },
        {
          path: "myitemlist",
          element: <StudentMyItemList />,
        },
      ],
    },

    {
      //administrator
      path: "administrator",
      children: [
        {
          path: "",
          element: <AdministratorMainPage />,
        },
        {
          path: "request",
          element: <AdministratorMaintenanceRequest />,
        },
        {
          path: "list",
          element: <AdministratorMaintenanceList />,
        },
        {
          path: "lostandfoundlist",
          element: <AdministratorLostAndFoundList />,
        },
        {
          path: "mybooking",
          element: <AdministratorMyBookingSubmit />,
        },
        {
          path: "mybookinglist",
          element: <AdministratorMyBookingList />,
        },
      ],
    },
  ];
}
