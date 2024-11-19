import { useQuery } from "@tanstack/react-query";

import {
  fetchAllCourses,
  fetchAllCoursesByStudentID,
  fetchCoursesByStudentID,
  fetchAllCoursesByProfessorID,
  fetchCourseHeaderBySectionID,
<<<<<<< HEAD
=======
  fetchAllVideos,
>>>>>>> 5c86225bafc317df03bc3c7aa9e8eb47f0def564
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
    queryKey: ["courses", studentID],
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
<<<<<<< HEAD
      console.log(error)
    }
  })
}

=======
      console.log(error);
    },
  });
};
>>>>>>> 5c86225bafc317df03bc3c7aa9e8eb47f0def564
