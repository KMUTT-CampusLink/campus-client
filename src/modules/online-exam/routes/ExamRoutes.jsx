//Student Imports
import StudentHomePage from "../pages/student/StudentHomePage";
import StudentExamPasswordPage from "../pages/student/StudentExamPasswordPage";
import StudentExamPage from "../pages/student/StudentExamPage";
import StudentReviewExamPage from "../pages/student/StudentReviewExamPage";

//Professor Imports
import ProfessorHomePage from "../pages/professor/ProfessorHomePage";
import ProfessorCreateExamPage from "../pages/professor/ProfessorCreateExamPage";
import ProfessorEditExamPage from "../pages/professor/ProfessorEditExamPage";
import ProfessorExamSettingPage from "../pages/professor/ProfessorExamSettingPage";
import ProfessorDashboardPage from "../pages/professor/ProfessorDashboardPage";
import ProfessorScoringPage from "../pages/professor/ProfessorScoringPage";
import ProfessorOverallScoringPage from "../pages/professor/ProfessorOverallScoringPage";
import Redirecting from "../services/Redirecting";

export default function ExamRoutes() {
  return [
    //Student Routes
    {
      path: "",
      element: <Redirecting />,
    },
    {
      path: "student/",
      children: [
        {
          path: ":id",
          element: <StudentHomePage />,
        },
        {
          path: "examPassword/:examId",
          element: <StudentExamPasswordPage />,
        },
        {
          path: "exam/:examId",
          element: <StudentExamPage />,
        },
        {
          path: "review/:examId",
          element: <StudentReviewExamPage />,
        },
      ],
    },

    //Professor Routes
    {
      path: "professor/",
      children: [
        {
          path: ":id",
          element: <ProfessorHomePage />,
        },
        {
          path: "create/:courseId",
          element: <ProfessorCreateExamPage />,
        },
        {
          path: "edit/:examId",
          element: <ProfessorEditExamPage />,
        },
        {
          path: "setting/:examId",
          element: <ProfessorExamSettingPage />,
        },
        {
          path: "dashboard/:examId",
          element: <ProfessorDashboardPage />,
        },
        {
          path: "scoring/:studentExamId",
          element: <ProfessorScoringPage />,
        },
        {
          path: "overallScoring/:examId",
          element: <ProfessorOverallScoringPage />,
        },
      ],
    },
  ];
}
