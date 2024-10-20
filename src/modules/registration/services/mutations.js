import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEnrollmentDetail, deleteEnrollmentDetail } from "./api";

export const useAddEnrollmentDetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (enrollmentData) => addEnrollmentDetail(enrollmentData),
    onMutate: (enrollmentData) => {
      console.log("Enrolling:", enrollmentData);
      // Optimistically update the cache
      queryClient.setQueryData("enrollmentDetails", (old) => [
        ...(old || []),
        enrollmentData,
      ]);
    },
    onError: (error, enrollmentData, context) => {
      console.error("Error adding enrollment:", error);
      // Rollback on error if needed
      queryClient.setQueryData("enrollmentDetails", context.previousData);
    },
    onSuccess: (data) => {
      console.log("Enrollment added successfully:", data);
      // Invalidate and refetch
      queryClient.invalidateQueries("enrollmentDetails");
    },
  });
};

export const useDeleteEnrollmentDetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (enrollmentData) => deleteEnrollmentDetail(enrollmentData),
    onMutate: async (enrollmentData) => {
      console.log("Deleting:", enrollmentData);

      // Get the current enrollment details
      await queryClient.cancelQueries("enrollmentDetails");

      // Snapshot of the previous value
      const previousData = queryClient.getQueryData("enrollmentDetails");

      // Optimistically update the cache
      queryClient.setQueryData(
        "enrollmentDetails",
        (
          old = [] // Default to an empty array
        ) => old.filter((enrollment) => enrollment.id !== enrollmentData.id) // Ensure correct filtering
      );

      // Return context with previous data for rollback
      return { previousData };
    },
    onError: (error, enrollmentData, context) => {
      console.error("Error deleting enrollment:", error);
      // Rollback on error
      if (context.previousData) {
        queryClient.setQueryData("enrollmentDetails", context.previousData);
      }
    },
    onSuccess: (data) => {
      console.log("Enrollment deleted successfully:", data);
      // Invalidate and refetch
      queryClient.invalidateQueries("enrollmentDetails");
    },
  });
};
