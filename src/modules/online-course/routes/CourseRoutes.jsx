import TrDashboard from "../pages/Teacher/TrDashboard";
import TrCourseDescription from "../pages/Teacher/TrCourseDescription";
import TrCourseMaterials from "../pages/Teacher/TrCourseMaterials";
import TrTasks from "../pages/Teacher/TrTasks";
import TrDiscussion from "../pages/Teacher/TrDiscussion";
import StDashboard from "../pages/Students/StDashboard";
import StAllCourses from "../pages/Students/StAllCourses";
import StCourseDescription from "../pages/Students/StCourseDescription";
import StCourseMaterials from "../pages/Students/StCourseMaterials";
import StTasks from "../pages/Students/StTasks";
import StDiscussion from "../pages/Students/StDiscussion";
import TrTaskSubmission from "../pages/Teacher/TrTaskSubmission";
import Comment from "../components/Comment";
import HR from "../pages/Teacher/HR";
import RedirectPage from "../pages/RedirectPage";

export default function CourseRoutes() {
  return [
    {
      path: "hr",
      element: <HR />,
    },
    {
      path: "",
      element: <RedirectPage />,
    },
    {
      path: "/courses/tr",
      children: [
        {
          path: "",
          element: <TrDashboard />,
        },
        {
          path: "course_description",
          element: <TrCourseDescription />,
        },
        {
          path: "course_material",
          element: <TrCourseMaterials />,
        },
        {
          path: "tasks",
          children: [
            {
              path: "",
              element: <TrTasks />,
            },
            {
              path: "submission",
              element: <TrTaskSubmission />,
            },
          ],
        },
        {
          path: "discussion",
          element: <TrDiscussion />,
        },
        // {
        //   path: "online_exam",
        //   element: <TrOnlineExam />,
        // },
        // {
        //   path: "attendance",
        //   element: <TrAttendance />,
        // },
      ],
    },
    {
      path: "/courses/st",
      children: [
        {
          path: "",
          children: [
            {
              path: "",
              element: <StDashboard />,
            },
            {
              path: "all_courses",
              element: <StAllCourses />,
            },
          ],
        },
        {
          path: "course_description",
          element: <StCourseDescription />,
        },

        {
          path: "course_material",
          element: <StCourseMaterials />,
        },
        {
          path: "tasks",
          element: <StTasks />,
        },
        {
          path: "discussion",
          children: [
            {
              path: "",
              element: <StDiscussion />,
            },
            {
              path: "comment",
              element: <Comment />,
            },
          ],
        },
        // {
        //   path: "online_exam",
        //   element: <StOnlineExam />,
        // },
        // {
        //   path: "attendance",
        //   element: <StAttendance />,
        // },
      ],
    },
  ];
}
