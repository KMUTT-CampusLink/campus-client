import { useQuery } from "@tanstack/react-query";

import {
  fetchAllCourses,
  fetchAllCoursesByStudentID,
  fetchCoursesByStudentID,
  fetchAllCoursesByProfessorID,
  fetchCourseHeaderBySectionID,
  fetchAllVideos,
  fetchAllDiscussionPostsBySectionID,
  fetchAllCommentsByPostID,
  fetchCourseHeaderBySectionIDForStudent,
  fetchAllAssignmentsBySectionID,
  fetchAssignmentSubmissionFilePath,
  fetchAllUpComingEvents,
  fetchUpComingEventsByTeacher,
  fetchStudentSubmission,
} from "./api";
export const useAllCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: fetchAllCourses,
  });
};

export const useAllVideos = (secId) => {
  return useQuery({
    queryKey: ["videos", secId],
    queryFn: () => fetchAllVideos(secId),
    enabled: !!secId,
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useCoursesByStudentID = (studentID) => {
  return useQuery({
    queryKey: ["courses", studentID],
    queryFn: () => fetchCoursesByStudentID(studentID),
    enabled: !!studentID,
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useAllCoursesByStudentID = (studentID) => {
  return useQuery({
    queryKey: ["allCourses", studentID],
    queryFn: () => fetchAllCoursesByStudentID(studentID),
    enabled: !!studentID,
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useAllCoursesByProfessorID = (professorID) => {
  return useQuery({
    queryKey: ["coursesP", professorID],
    queryFn: () => fetchAllCoursesByProfessorID(professorID),
    enabled: !!professorID,
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useCourseHeaderBySectionID = (sectionID) => {
  return useQuery({
    queryKey: ["section", sectionID],
    queryFn: () => fetchCourseHeaderBySectionID(sectionID),
    enabled: !!sectionID,
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useAllDiscussionPostsBySectionID = (sectionID) => {
  return useQuery({
    queryKey: ["post", sectionID],
    queryFn: () => fetchAllDiscussionPostsBySectionID(sectionID),
  });
};

export const useCourseHeaderBySectionIDForStudent = (sectionID) => {
  return useQuery({
    queryKey: ["section", sectionID],
    queryFn: () => fetchCourseHeaderBySectionIDForStudent(sectionID),
    enabled: !!sectionID,
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useAllAssignmentsBySectionID = (sectionID) => {
  return useQuery({
    queryKey: ["assignments", sectionID],
    queryFn: async () => {
      const { assignments } = await fetchAllAssignmentsBySectionID(sectionID);
      console.log("Fetched Assignments:", assignments); // Logs only the array
      return assignments; // Return the assignments array directly
    },
    enabled: !!sectionID,
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useAllCommentsByPostID = (postId) => {
  return useQuery({
    queryKey: ["allComment", postId],
    queryFn: () => fetchAllCommentsByPostID(postId),
    enabled: !!postId, // Ensure postId is valid
    onError: (error) => {
      console.error("Error fetching comments:", error);
    },
  });
};

export const useAssignmentSubmissionFilePath = (assignmentID, studentID) => {
  return useQuery({
    queryKey: ["submissionFilePath", assignmentID, studentID],
    queryFn: () => fetchAssignmentSubmissionFilePath(assignmentID, studentID),
    enabled: !!assignmentID && !!studentID,
    onError: (error) => {
      console.error("Error fetching assignment submission file path:", error);
    },
  });
};

export const useStudentSubmission = (sectionID, assignmentID) => {
  return useQuery({
    queryKey: ["submissionSectionID", sectionID,assignmentID],
    queryFn: () => fetchStudentSubmission(sectionID,assignmentID),
    enabled: !!sectionID && !!assignmentID,
    onError: (error) => {
      console.error("Error fetching student submission :", error);
    },
  });
};

export const useUpComingEvents = (studentID) => {
  return useQuery({
    queryKey: ["events", studentID],
    queryFn: () => fetchAllUpComingEvents(studentID),
    enabled: !!studentID,
    onError: (error) => {
      console.error("Error fetching up coming events:", error);
    },
  });
};

export const useUpComingEventsByTeacher = (empID, sectionID) => {
  return useQuery({
    queryKey: ["allevents", { empID, sectionID }],
    queryFn: () => fetchUpComingEventsByTeacher(empID, sectionID),
    enabled: !!empID && !!sectionID,
    onError: (error) => {
      console.error("Error fetching up coming events:", error);
    },
  });
};
