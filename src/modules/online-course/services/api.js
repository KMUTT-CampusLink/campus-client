import { axiosInstance } from "../../../utils/axiosInstance.js";

const get = async (url) => {
  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchAllCourses = () => get("/courses/all");
export const fetchCoursesByStudentID = (studentID) =>
  get(`/courses/${studentID}`);
export const fetchAllCoursesByStudentID = (studentID) =>
  get(`/courses/${studentID}/all`);
export const fetchAllCoursesByProfessorID = (professorID) =>
  get(`/courses/${professorID}/teach`);
