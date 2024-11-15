import { useQuery } from "@tanstack/react-query";
import { getSetting, getRecordCode } from "./apis";

export const useGetSetting = (section_id) => {
  return useQuery({
    queryKey: ["setting", `${section_id}`],
    queryFn: () => getSetting(section_id),
    refetchOnWindowFocus: false,
  });
};

export const useGetRecordCode = (section_id) => {
  return useQuery({
    queryFn: ["record", "code", `${section_id}`],
    queryFn: () => getRecordCode(section_id),
    refetchOnWindowFocus: false,
  });
};
