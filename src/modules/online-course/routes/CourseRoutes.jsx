import { Children } from "react";
import TrDashboard from "../pages/Teacher/TrDashboard";
import TrCourseDescription from "../pages/Teacher/TrCourseDescription";
import TrCourseMaterials from "../pages/Teacher/TrCourseMaterials";
import TrTasks from "../pages/Teacher/TrTasks";
import TrDiscussion from "../pages/Teacher/TrDiscussion";
import StDashboard from "../pages/Students/StDashboard";
import StAllCourses from "../pages/Students/StAllCourses"
import StCourseDescription from "../pages/Students/StCourseDescription";
import StCourseMaterials from "../pages/Students/StCourseMaterials";
import StTasks from "../pages/Students/StTasks";
import StDiscussion from "../pages/Students/StDiscussion";
import TrTaskSubmission from "../pages/Teacher/TrTaskSubmission";

export default function CourseRoutes() {
  return [
    {
      path: "Tr",
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
      path: "St",
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
              element: <StAllCourses/>
            }
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
          element: <StDiscussion />,
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
