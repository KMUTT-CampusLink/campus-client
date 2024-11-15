import { axiosInstance } from "../../../utils/axiosInstance";

export const getSetting = async (section_id) => {
  return axiosInstance
    .get(`/dev-attend/setting/${section_id}`)
    .then((res) => res.data);
};

export const updateSetting = async (data) => {
  return axiosInstance
    .post(`/dev-attend/setting/${data.id}`, data)
    .then((res) => res.data);
};

export const getRecordCode = async (section_id) => {
  return axiosInstance
    .get(`/dev-attend/record/${section_id}`)
    .then((res) => res.data);
};

export const createRecords = async (data) => {
  return axiosInstance.post(`/dev-attend/record`, data).then((res) => res.data);
};
