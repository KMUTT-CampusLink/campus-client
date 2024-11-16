import axiosInstance from "../../../utils/axiosInstance";

export const getParkingData = async () => {
  const response = await axiosInstance.get("/parking/getParking");
  return response.data;
};

export const getBuildingById = async (id) => {
  const response = await axiosInstance.get(`/parking/getBuildingById/${id}`);
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
