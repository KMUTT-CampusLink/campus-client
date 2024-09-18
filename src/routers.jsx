import App from "./App";

// feature routes
import AttendRoutes from "./modules/attendance/routes/AttendRoutes";
import SecureRoutes from "./modules/building-security/routes/SecureRoutes";
import BotRoutes from "./modules/chatbot/routes/BotRoutes";
import ClubRoutes from "./modules/clubs/routes/ClubRoutes";
import EmployRoutes from "./modules/employment/routes/EmployRoutes";
import LibRoutes from "./modules/library/routes/LibRoutes";
import MapRoutes from "./modules/map/routes/MapRoutes";
import CourseRoutes from "./modules/online-course/routes/CourseRoutes";
import ExamRoutes from "./modules/online-exam/routes/ExamRoutes";
import ParkRoutes from "./modules/parking-and-bike/routes/ParkRoutes";
import PaymentRoutes from "./modules/payment/routes/PaymentRoutes";
import RegisRoutes from "./modules/registration/routes/RegisRoutes";
import TransRoutes from "./modules/transportation/routes/TransRoutes";

const main_router = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "attendance",
        children: AttendRoutes(),
      },
      {
        path: "security",
        children: SecureRoutes(),
      },
      {
        path: "botastra",
        children: BotRoutes(),
      },
      {
        path: "clubs",
        children: ClubRoutes(),
      },
      {
        path: "employ",
        children: EmployRoutes(),
      },
      {
        path: "library",
        children: LibRoutes(),
      },
      {
        path: "map",
        children: MapRoutes(),
      },
      {
        path: "courses",
        children: CourseRoutes(),
      },
      {
        path: "exams",
        children: ExamRoutes(),
      },
      {
        path: "parking",
        children: ParkRoutes(),
      },
      {
        path: "payment",
        children: PaymentRoutes(),
      },
      {
        path: "regis",
        children: RegisRoutes(),
      },
      {
        path: "transport",
        children: TransRoutes(),
      },
    ],
  },
];

export default main_router;
