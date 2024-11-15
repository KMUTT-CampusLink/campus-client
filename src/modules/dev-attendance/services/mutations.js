import { useMutation } from "@tanstack/react-query";
import popToast from "../../../utils/popToast";
import { updateSetting, createRecords } from "./apis";

export const useUpdateSetting = (queryClient) => {
  return useMutation({
    mutationFn: (data) => updateSetting(data),
    onError: (error) => {
      popToast(error.message, "error");
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["setting", "default"]);
      popToast("Setting updated", "success");
    },
  });
};

export const useCreateRecords = () => {
  return useMutation({
    mutationFn: (data) => createRecords(data),
    onError: (error) => {
      console.log(error);
      popToast(error.message, "error");
    },
    onSuccess: (data, variables) => {
      console.log(data);
      popToast("Records created", "success");
    },
  });
};
