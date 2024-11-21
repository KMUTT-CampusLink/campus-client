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
      const data = await fetchAllAssignmentsBySectionID(sectionID);
      return data;
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
