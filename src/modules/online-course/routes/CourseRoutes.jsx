import { Navigate } from "react-router-dom";
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

// const role = "Professor";
const role = localStorage.getItem("userRole");

export default function CourseRoutes() {
  // return [
  //   {
  //     path: "",
  //     element: <RedirectPage />,
  //   },
  //   {
  //     path: "st",
  //     element: <StDashboard />,
  //   },
  //   {
  //     path: "tr",
  //     element: <TrDashboard/>
  //   }
  // ];

  
  return [
    {
      path: "",
      element:
        role === "Student" ? (
          <Navigate to="/courses/st" />
        ) : (
          <Navigate to="/courses/tr" />
        ),
    },
    {
      path: "/courses/tr",
      element: role === "Professor" ? null : <Navigate to="/courses/st" />,
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
      element: role === "Student" ? null : <Navigate to="/courses/tr" />,
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