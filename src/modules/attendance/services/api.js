import axios from "axios";

export const generateNewQr = async (sectionId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/attend/qrGen/${sectionId}`
      );
      return response;
    } catch (error) {
      return error.response.data;
    }
  };
// export const generateNewQr = async (sectionId) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:3000/api/attend/qrGen/${sectionId}`
//       );
//       return response;
//     } catch (error) {
//       return error.response.data;
//     }
//   };