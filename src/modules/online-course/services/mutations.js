import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchDiscussionPostBySectionID,
  deleteDiscussionPost,
  editDiscussionPost,
  createAssignment,
  editAssignment,
  deleteAssignment,
  createDiscussionReply,
} from "./api";

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

export const useEditDiscussionPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ topicId, updatedPost }) =>
      editDiscussionPost(topicId, updatedPost),
    onSuccess: () => {
      queryClient.invalidateQueries("post"); // Invalidate to refresh posts
    },
  });
};

export const useDeleteDiscussionPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (topicId) => deleteDiscussionPost(topicId),
    onSuccess: () => {
      queryClient.invalidateQueries("post"); // Invalidate to refresh posts
    },
  });
};
export const useCreateDiscussionReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ topicId, newReply }) =>
      createDiscussionReply(topicId, newReply), // Pass topicId and newReply to the API call
    onSuccess: () => {
      // Invalidate the comment list query to refresh
      queryClient.invalidateQueries("allComment");
    },
    onError: (error) => {
      console.error("Error creating discussion reply:", error);
    },
  });
};

// Mutation to create a new assignment
// export const useCreateAssignment = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: createAssignment,
//     onSuccess: () => {
//       // Invalidate the assignments cache to refetch data
//       queryClient.invalidateQueries(["assignments"]);
//     },
//     onError: (error) => {
//       console.log(error);
//     },
//   });
// };

export const useCreateAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAssignment, // The updated API function
    onSuccess: () => {
      // Invalidate the assignments cache to refetch data
      queryClient.invalidateQueries(["assignments"]);
    },
    onError: (error) => {
      console.error("Error creating assignment:", error);
    },
  });
};



// Mutation to edit an existing assignment
export const useEditAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ assignmentID, body }) => editAssignment(assignmentID, body),
    onSuccess: () => {
      // Invalidate the assignments cache to refetch data
      queryClient.invalidateQueries(["assignments"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

// Mutation to delete an assignment
export const useDeleteAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAssignment,
    onSuccess: () => {
      // Invalidate the assignments cache to refetch data
      queryClient.invalidateQueries(["assignments"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
