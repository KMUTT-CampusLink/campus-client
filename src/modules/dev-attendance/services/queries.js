import { useQuery } from "@tanstack/react-query";
import { getSetting } from "./apis";

export const useGetSetting = (section_id) => {
  return useQuery({
    queryKey: ["setting", `${section_id}`],
    queryFn: () => getSetting(section_id),
    refetchOnWindowFocus: false,
  });
};
