import {axiosInstance} from "../../../utils/axiosInstance"

export const generateNewQr = async (sectionId) => {
  try {
    const response = await axiosInstance.post(`attend/qrGen/${sectionId}`);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const generateFaceAttendance = async (sectionId) => {
  try{
    const response = await axiosInstance.post(`attend/faceGen/${sectionId}`);
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export const markAttendance = async(attendanceid,studentid) => {
  try{
    const response = await axiosInstance.post(`attend/markattendance`,{
      attendanceid,
      studentid,
    });
    return response;
  } catch(error){
    return error.response.data;
  }
}

export const verifyFaceRecognition  = async(imageData) => {
  try{
    const response = await axiosInstance.post(`attend/verify-face`,{
      imagePath: imageData,
    });
    return response;
  } catch(error){
    return error.response.data;
  }
}