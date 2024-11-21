import { axiosInstance } from "../../../utils/axiosInstance";

export const getBuilding = async () => {
  try {
    const response = await axiosInstance.get(
      `/security/buildings`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getFloor = async () => {
  try {
    const response = await axiosInstance.get(
      `/security/floor/:buildingId`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getRoom = async () => {
  try {
    const response = await axiosInstance.get(
      `/security/room/:floorId`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getLostAndFoundList = async () => {
  try {
    const response = await axiosInstance.get(
      `/security/LostAndFoundList`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
}
export const getMaintenanceList = async () => {
  try {
    const response = await axiosInstance.get(
      `/security/MaintenanceList`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export const addMaintenanceList = async () => {
  try {
    const response = await axiosInstance.post(
      `/security/addMaintenanceList`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
}
export const addLostAndFoundList = async () => {
  try {
    const response = await axiosInstance.get(
      `/security/addLostAndFoundList`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
}

