import { useMutation } from "@tanstack/react-query";
import popToast from "../../../utils/popToast";
import { updateSetting } from "./apis";

export const useUpdateSetting = (queryClient) => {
  return useMutation({
    mutationFn: (data, section_id) => updateSetting(data, section_id),
    onError: (error) => {
      popToast(error.message, "error");
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["setting", "default"]);
      popToast("Setting updated", "success");
    },
  });
};
