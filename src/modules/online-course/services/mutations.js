import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDiscussionPostBySectionID } from "./api";

export const useDiscussionPostBySectionID = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTopic) => fetchDiscussionPostBySectionID(newTopic),
    onMutate: (newTopic) => {
      console.log("Enrolling:", newTopic);
      // Optimistically update the cache
      queryClient.setQueryData("topicDetails", (old) => [
        ...(old || []),
        newTopic,
      ]);
    },
    onError: (error, newTopic, context) => {
      console.error("Error adding enrollment:", error);
      // Rollback on error if needed
      queryClient.setQueryData("topicDetails", context.previousData);
    },
    onSuccess: (data) => {
      console.log("Enrollment added successfully:", data);
      // Invalidate and refetch
      queryClient.invalidateQueries("topicDetails");
    },
  });
};
