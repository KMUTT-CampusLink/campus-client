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
  fetchEnrollmentHead,
  fetchPaymentStatus,
} from "./api";

// Custom hook for authentication
export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: fetchAuth,
    refetchOnWindowFocus: false,
    retry: 1,
    onError: (error) => {
      console.error("Error fetching auth:", error);
    },
  });
};

// Custom hook for account activation
export const useActivation = () => {
  return useMutation({
    mutationFn: activateAccount,
    onSuccess: (data) => {
      console.log("Account activated successfully:", data);
    },
    onError: (error) => {
      console.error("Error activating account:", error);
    },
  });
};

// Custom hook for fetching student data
export const useStudentData = (studentId) => {
  return useQuery({
    queryKey: ["student", studentId],
    queryFn: () => fetchStudentById(studentId),
    enabled: !!studentId,
    onError: (error) => {
      console.error("Error fetching student data:", error);
    },
  });
};

// Custom hook for searching courses
export const useCourseBySearch = (searchTerm) => {
  return useQuery({
    queryKey: ["courses", searchTerm],
    queryFn: () => fetchCourseBySearchTerm(searchTerm),
    enabled: !!searchTerm,
    onError: (error) => {
      console.error("Error fetching courses:", error);
    },
  });
};

// Custom hook for fetching sections by course code
export const useSectionByCourseCode = (courseCode) => {
  return useQuery({
    queryKey: ["sections", courseCode],
    queryFn: () => fetchSectionByCourseCode(courseCode),
    enabled: !!courseCode,
    onError: (error) => {
      console.error("Error fetching sections:", error);
    },
  });
};

// Custom hook for fetching semesters by student ID
export const useSemestersByStudentId = (studentId) => {
  return useQuery({
    queryKey: ["semesters", studentId],
    queryFn: () => fetchSemestersByStudentId(studentId),
    enabled: !!studentId,
    onError: (error) => {
      console.error("Error fetching semesters:", error);
    },
  });
};

// Custom hook for fetching transcript by semester ID
export const useTranscriptBySemesterId = (studentId, semesterId) => {
  return useQuery({
    queryKey: ["transcripts", studentId, semesterId],
    queryFn: () => fetchTranscriptBySemesterId(studentId, semesterId),
    enabled: !!studentId && !!semesterId,
    onError: (error) => {
      console.error("Error fetching transcript:", error);
    },
  });
};

// Custom hook for fetching transcript by student ID
export const useTranscriptByStudentId = (studentId) => {
  return useQuery({
    queryKey: ["transcripts", studentId],
    queryFn: () => fetchTranscriptByStudentId(studentId),
    enabled: !!studentId,
    onError: (error) => {
      console.error("Error fetching transcript:", error);
    },
  });
};

// Custom hook for fetching GPAX by semester ID
export const useGPAXBySemesterId = (studentId, semesterId) => {
  return useQuery({
    queryKey: ["grades", studentId, semesterId],
    queryFn: () => fetchGPAXBySemesterId(studentId, semesterId),
    enabled: !!studentId && !!semesterId,
    onError: (error) => {
      console.error("Error fetching GPAX:", error);
    },
  });
};

// Custom hook for fetching GPAX by student ID
export const useGPAXByStudentId = (studentId) => {
  return useQuery({
    queryKey: ["grades", studentId],
    queryFn: () => fetchGPAXByStudentId(studentId),
    enabled: !!studentId,
    onError: (error) => {
      console.error("Error fetching GPAX:", error);
    },
  });
};

// Custom hook for fetching active courses by student ID
export const useActiveCoursesByStudentId = (studentId) => {
  return useQuery({
    queryKey: ["activeCourses", studentId],
    queryFn: () => fetchActiveCoursesByStudentId(studentId),
    enabled: !!studentId,
    onError: (error) => {
      console.error("Error fetching active courses:", error);
    },
  });
};

// Custom hook for fetching payment status
export const usePaymentStatus = (headId) => {
  return useQuery({
    queryKey: ["status", headId],
    queryFn: () => fetchPaymentStatus(headId),
    enabled: !!headId,
    onError: (error) => {
      console.error("Error fetching payment status:", error);
    },
  });
};

// Custom hook for getting enrollment head
export const useGetEnrollmentHead = ({ studentId, currentSemesterId }) => {
  return useQuery({
    queryKey: ["enrollmentHead", studentId, currentSemesterId],
    queryFn: () => fetchEnrollmentHead({ studentId, currentSemesterId }),
    enabled: !!studentId && !!currentSemesterId,
    onError: (error) => {
      console.error("Error fetching enrollment head:", error);
    },
  });
};
