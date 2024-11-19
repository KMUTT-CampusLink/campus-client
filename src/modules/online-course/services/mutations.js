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
