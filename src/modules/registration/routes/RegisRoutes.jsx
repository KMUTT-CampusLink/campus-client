import ActivationPage from "../pages/ActivationPage";
import CourseRegisPage from "../pages/CourseRegisPage";
import GradePage from "../pages/GradePage";
import LoginPage from "../pages/LoginPage";
import TranscriptPage from "../pages/TranscriptPage";
import AddCoursePage from "../pages/AddCoursePage";
import DropCoursePage from "../pages/DropCoursePage";
import LandingPage from "../pages/LandingPage";
import RegisDetailsPage from "../pages/RegisDetailsPage";

export default function RegisRoutes() {
  return [
    {
      path: "",
      element: <LandingPage />,
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
      children: [
        {
          path: "",
          element: <CourseRegisPage />,
        },
        {
          path: "add",
          element: <AddCoursePage />,
        },
        {
          path: "drop",
          element: <DropCoursePage />,
        },
        {
          path: "detail",
          element: <RegisDetailsPage />,
        },
      ],
    },
    {
      path: "grade",
      element: <GradePage />,
    },
    {
      path: "transcript",
      element: <TranscriptPage />,
    },
  ];
}
