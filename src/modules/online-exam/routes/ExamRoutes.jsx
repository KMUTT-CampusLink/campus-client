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

export default function ExamRoutes() {
  return [
    //Student Routes
    {
      path: "student/",
      children: [
        {
          path: "",
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
        }
      ],
    },

    //Professor Routes
    {
      path: "professor/",
      children: [
        {
          path: "",
          element: <ProfessorHomePage />,
        },
        {
          path: "create",
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
          path: "dashboard:examId",
          element: <ProfessorDashboardPage />,
        },
        {
          path: "scoring/:examId",
          element: <ProfessorScoringPage />,
        },
        {
          path: "overallScoring",
          element: <ProfessorOverallScoringPage />,
        },
      ],
    },
  ];
}
