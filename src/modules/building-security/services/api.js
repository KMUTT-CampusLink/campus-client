import axios from "axios";

export const getBuilding = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/security/building`
      );
      return response;
    } catch (error) {
      return error.response.data;
    }
  };

  export const getFloor = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/security/floor`
      );
      return response;
    } catch (error) {
      return error.response.data;
    }
  };

  export const getRoom = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/security/room`
      );
      return response;
    } catch (error) {
      return error.response.data;
    }
  };