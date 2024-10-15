import { useMutation } from "@tanstack/react-query";
import { addEnrollmentDetail, deleteEnrollmentDetail } from "./api";

export const useAddEnrollmentDetail = () => {
  return useMutation({
    mutationFn: (enrollmentData) => addEnrollmentDetail(enrollmentData),
    onMutate: (enrollmentData) => {
      console.log("Enrolling:", enrollmentData);
    },
    onError: (error) => {
      console.error("Error adding enrollment:", error);
    },
    onSuccess: (data) => {
      console.log("Enrollment added successfully:", data);
    },
  });
};

export const useDeleteEnrollmentDetail = () => {
  return useMutation({
    mutationFn: (enrollmentData) => deleteEnrollmentDetail(enrollmentData),
    onMutate: (enrollmentData) => {
      console.log("Deleting:", enrollmentData);
    },
    onError: (error) => {
      console.error("Error deleting enrollment:", error);
    },
    onSuccess: (data) => {
      console.log("Enrollment deleted successfully:", data);
    },
  });
};
