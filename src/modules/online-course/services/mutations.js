<<<<<<< HEAD
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
=======
// import { useMutation } from "@tanstack/react-query";
// import { uploadFiles } from "./api";
// import popToast from "../../../utils/popToast";

// export const useUploadFilesMutation = (queryClient, reset) => {
//   return useMutation({
//     mutationFn: (form_data) => uploadFiles(form_data),
//     onSuccess: (data, variables) => {
//       popToast("Upload Complete", "success");
//       queryClient.invalidateQueries({
//         queryKey: ["files-data"],
//       });
//       reset();
//     },
//     onError: (errors) => {
//       console.log(errors);
//       popToast(errors.message, "error");
//       reset();
//     },
//   });
// };
>>>>>>> 5c86225bafc317df03bc3c7aa9e8eb47f0def564
