import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDiscussionPostBySectionID } from "./api";

export const useDiscussionPostBySectionID = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTopic) => fetchDiscussionPostBySectionID(newTopic),
    onMutate: async (newTopic) => {
      console.log("Optimistically updating:", newTopic);
      
      // Cancel outgoing queries for the same key to avoid overwriting optimistic updates
      await queryClient.cancelQueries("topicDetails");

      // Snapshot previous data for rollback if needed
      const previousData = queryClient.getQueryData("topicDetails");

      // Optimistically update the cache
      queryClient.setQueryData("topicDetails", (old) => [
        ...(old || []),
        { ...newTopic, id: "temp-id" }, // Add temporary ID or structure to match your API's data
      ]);

      // Return the snapshot for possible rollback
      return { previousData };
    },
    onError: (error, newTopic, context) => {
      console.error("Error adding discussion topic:", error);

      // Rollback to the previous snapshot
      if (context?.previousData) {
        queryClient.setQueryData("topicDetails", context.previousData);
      }
    },
    onSuccess: (data) => {
      console.log("Discussion topic added successfully:", data);

      // Invalidate queries to fetch the latest data
      queryClient.invalidateQueries("topicDetails");
    },
    onSettled: () => {
      // Re-fetch the data to ensure consistency
      queryClient.invalidateQueries("topicDetails");
    },
  });
};