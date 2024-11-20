import { useQuery } from "@tanstack/react-query";

import {
  fetchAllCourses,
  fetchAllCoursesByStudentID,
  fetchCoursesByStudentID,
  fetchAllCoursesByProfessorID,
  fetchCourseHeaderBySectionID,
  fetchAllVideos,
  fetchAllDiscussionPostsBySectionID,
} from "./api";
export const useAllCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: fetchAllCourses,
  });
};

export const useAllVideos = () => {
  return useQuery({
    queryKey: ["videos"],
    queryFn: fetchAllVideos,
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
      console.log(error)
    }
  })
}

export const useAllDiscussionPostsBySectionID = (sectionID) => {
  return useQuery({
    queryKey: ["post", sectionID],
    queryFn: () => fetchAllDiscussionPostsBySectionID(sectionID),
    enabled: !!sectionID,
    onError: (error) => {
      console.log(error);
    },
  });
}