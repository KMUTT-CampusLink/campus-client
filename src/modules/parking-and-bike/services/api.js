import { axiosInstance } from "../../../utils/axiosInstance";

export const getParkingData = async () => {
  const response = await axiosInstance.get("/parking/getParking");
  return response.data;
};

export const getBuildingById = async (id) => {
  const response = await axiosInstance.get(`/parking/getBuildingById/${id}`);
  return response.data;
};

export const getHistoryData = async () => {
  const response = await axiosInstance.get("/parking/getHistory");
  return response.data;
};

export const getCheckingData = async () => {
  const response = await axiosInstance.get("/parking/getChecking");
  return response.data;
};

export const postCheckin = async (requestData) => {
  const response = await axiosInstance.post(
    "/parking/postCheckin",
    requestData
  );
  return response.data;
};

export const postReservation = async (requestData) => {
  const response = await axiosInstance.post(
    "/parking/postReservation",
    requestData
  );
  return response.data;
};

export const postRegisterCar = async (requestData) => {
  const response = await axiosInstance.post(
    "/parking/postRegisterCar",
    requestData
  );
  return response.data;
};

export const postCheckout = async (requestData) => {
  const response = await axiosInstance.post(
    "/parking/postCheckout",
    requestData
  );
  return response.data;
};
