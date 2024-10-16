import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchAuth,
  activateAccount,
  fetchCourseBySearchTerm,
  fetchSectionByCourseCode,
  fetchStudentById,
  fetchSemestersByStudentId,
  fetchTranscriptBySemesterId,
  fetchGPAXBySemesterId,
  fetchGPAXByStudentId,
  fetchTranscriptByStudentId,
  fetchActiveCoursesByStudentId,
} from "./api";

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: fetchAuth,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useActivation = () => {
  return useMutation({
    mutationFn: activateAccount,
  });
};

export const useStudentData = (userId) => {
  return useQuery({
    queryKey: ["student", userId],
    queryFn: () => fetchStudentById(userId),
    // staleTime: 1000 * 60 * 5, // Optional: Cache the data for 5 minutes
  });
};

export const useCourseBySearch = (searchTerm) => {
  return useQuery({
    queryKey: ["courses", searchTerm],
    queryFn: () => fetchCourseBySearchTerm(searchTerm),
    enabled: !!searchTerm,
  });
};

export const useSectionByCourseCode = (courseCode) => {
  return useQuery({
    queryKey: ["sections", courseCode],
    queryFn: () => fetchSectionByCourseCode(courseCode),
    enabled: !!courseCode,
  });
};

export const useSemestersByStudentId = (studentId) => {
  return useQuery({
    queryKey: ["semesters", studentId],
    queryFn: () => fetchSemestersByStudentId(studentId),
    enabled: !!studentId,
  });
};

export const useTranscriptBySemesterId = (studentId, semesterId) => {
  return useQuery({
    queryKey: ["transcripts", studentId, semesterId],
    queryFn: () => fetchTranscriptBySemesterId(studentId, semesterId),
    enabled: !!studentId && !!semesterId,
  });
};
export const useTranscriptByStudentId = (studentId) => {
  return useQuery({
    queryKey: ["transcripts", studentId],
    queryFn: () => fetchTranscriptByStudentId(studentId),
    enabled: !!studentId,
  });
};

export const useGPAXBySemesterId = (studentId, semesterId) => {
  return useQuery({
    queryKey: ["grades", studentId, semesterId],
    queryFn: () => fetchGPAXBySemesterId(studentId, semesterId),
    enabled: !!studentId && !!semesterId,
  });
};

export const useGPAXByStudentId = (studentId) => {
  return useQuery({
    queryKey: ["grades", studentId],
    queryFn: () => fetchGPAXByStudentId(studentId),
    enabled: !!studentId,
  });
};

export const useActiveCoursesByStudentId = (studentId) => {
  return useQuery({
    queryKey: ["grades", studentId],
    queryFn: () => fetchActiveCoursesByStudentId(studentId),
    enabled: !!studentId,
  });
};
