import { useQuery } from "@tanstack/react-query";

import {
  fetchAllCourses,
  fetchAllCoursesByStudentID,
  fetchCoursesByStudentID,
  fetchAllCoursesByProfessorID,
  fetchCourseHeaderBySectionID,
  fetchAllVideos,
  fetchCourseHeaderBySectionIDForStudent,
  fetchAllAssignmentsBySectionID
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
    queryKey: ["courses", professorID],
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

export const useCourseHeaderBySectionIDForStudent = (sectionID) => {
  return useQuery({
    queryKey: ["section", sectionID],
    queryFn: () => fetchCourseHeaderBySectionIDForStudent(sectionID),
    enabled: !!sectionID,
    onError: (error) => {
      console.log(error)
    }
  })
}

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
