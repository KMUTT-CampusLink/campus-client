import ActivationPage from "../pages/ActivationPage";
import CourseRegisPage from "../pages/CourseRegisPage";
import GradePage from "../pages/GradePage";
import LoginPage from "../pages/LoginPage";
import TranscriptPage from "../pages/TranscriptPage";
import AddCoursePage from "../pages/AddCoursePage";
import DropCoursePage from "../pages/DropCoursePage";
import LandingPage from "../pages/LandingPage";
import RegisDetailsPage from "../pages/RegisDetailsPage";
import AuthRoute from "../middleware/AuthRoute";
import PeriodPage from "../pages/PeriodPage";
import ProfilePage from "../pages/ProfilePage";
import AdminPage from "../pages/AdminPage";

export default function RegisRoutes() {
  return [
    {
      path: "",
      element: <LandingPage />,
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
      path: "period",
      element: <PeriodPage />,
    },
    {
      path: "course",
      element: (
        <AuthRoute>
          <CourseRegisPage />
        </AuthRoute>
      ),
    },
    {
      path: "course/add",
      element: (
        <AuthRoute>
          <AddCoursePage />
        </AuthRoute>
      ),
    },
    {
      path: "course/drop",
      element: (
        <AuthRoute>
          <DropCoursePage />
        </AuthRoute>
      ),
    },
    {
      path: "course/detail",
      element: (
        <AuthRoute>
          <RegisDetailsPage />
        </AuthRoute>
      ),
    },
    {
      path: "grade",
      element: (
        <AuthRoute>
          <GradePage />
        </AuthRoute>
      ),
    },
    {
      path: "transcript",
      element: (
        <AuthRoute>
          <TranscriptPage />
        </AuthRoute>
      ),
    },
    {
      path: "profile",
      element: (
        <AuthRoute>
          <ProfilePage />
        </AuthRoute>
      ),
    },
  ];
}
