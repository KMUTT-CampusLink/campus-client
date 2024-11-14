import { axiosInstance } from "../../../utils/axiosInstance";

export const getSetting = async (section_id) => {
  return axiosInstance
    .get(`/dev-attend/setting/${section_id}`)
    .then((res) => res.data);
};

export const updateSetting = async (data, section_id) => {
  return axiosInstance
    .post(`/dev-attend/setting/${section_id}`, data)
    .then((res) => res.data);
};
