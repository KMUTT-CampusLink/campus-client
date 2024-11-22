import ActivationPage from "../pages/ActivationPage";
import CourseRegisPage from "../pages/CourseRegisPage";
import GradePage from "../pages/GradePage";
import LoginPage from "../pages/LoginPage";
import TranscriptPage from "../pages/TranscriptPage";
import AddCoursePage from "../pages/AddCoursePage";
import DropCoursePage from "../pages/DropCoursePage";
import RegisDetailsPage from "../pages/RegisDetailsPage";
import AuthRoute from "../middleware/AuthRoute";
import PeriodPage from "../pages/PeriodPage";
import ProfilePage from "../pages/ProfilePage";
import AdminPage from "../pages/AdminPage";
import WithdrawPage from "../pages/WithdrawPage";

export default function RegisRoutes() {
  return [
    {
      path: "",
      element: (
        <AuthRoute>
          <PeriodPage />
        </AuthRoute>
      ),
    },
    {
      path: "admin",
      element: <AdminPage />,
    },
    {
      path: "activation",
      element: <ActivationPage />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "course",
      element: (
        <AuthRoute allowed_roles={["Student"]}>
          <CourseRegisPage />
        </AuthRoute>
      ),
    },
    {
      path: "course/add",
      element: (
        <AuthRoute allowed_roles={["Student"]}>
          <AddCoursePage />
        </AuthRoute>
      ),
    },
    {
      path: "course/drop",
      element: (
        <AuthRoute allowed_roles={["Student"]}>
          <DropCoursePage />
        </AuthRoute>
      ),
    },
    {
      path: "course/withdraw",
      element: (
        <AuthRoute allowed_roles={["Student"]}>
          <WithdrawPage />
        </AuthRoute>
      ),
    },
    {
      path: "course/detail",
      element: (
        <AuthRoute allowed_roles={["Student"]}>
          <RegisDetailsPage />
        </AuthRoute>
      ),
    },
    {
      path: "grade",
      element: (
        <AuthRoute allowed_roles={["Student"]}>
          <GradePage />
        </AuthRoute>
      ),
    },
    {
      path: "transcript",
      element: (
        <AuthRoute allowed_roles={["Student"]}>
          <TranscriptPage />
        </AuthRoute>
      ),
    },
    {
      path: "profile",
      element: (
        <AuthRoute allowed_roles={["Student"]}>
          <ProfilePage />
        </AuthRoute>
      ),
    },
  ];
}
