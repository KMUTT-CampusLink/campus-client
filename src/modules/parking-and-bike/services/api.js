import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
    withCredentials: true,
});

export const getParkingData = async () => {
    const response = await axios.get('http://localhost:3000/api/parking/getParking');
    return response.data;
};

export const getBuildingById = async (id) => {
    const response = await axiosInstance.get(`http://localhost:3000/api/parking/getBuildingById/${id}`);
    return response.data;
};

export const postCheckin = async (requestData) => {
    const response = await axiosInstance.post('http://localhost:3000/api/parking/postCheckin', requestData);
    return response.data;
};

export const postReservation = async (requestData) => {
    const response = await axiosInstance.post('http://localhost:3000/api/parking/postReservation', requestData);
    return response.data;
};