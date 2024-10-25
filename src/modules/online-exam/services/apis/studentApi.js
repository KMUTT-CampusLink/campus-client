import axios from "axios";

export const getStudentExams = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/exams/student/getAllExam`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getHistoryStudentExams = async () => {};

export const verifyExamPassword = async (examId, password) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/exams/student/verifyPassword`,
      { examId, password }
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};
