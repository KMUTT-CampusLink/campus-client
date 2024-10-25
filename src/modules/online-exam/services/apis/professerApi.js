import axios from "axios";

export const createNewExam = async (exam) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/exams/professor/createExam`,
      { exam: exam }
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getExams = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/exams/professor/getExams`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getExamById = async (examId) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/exams/professor/getExamById?examId=${examId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteExamById = async (examId) => {
  try {
    const response = await axios.delete(
      `${
        import.meta.env.VITE_API_URL
      }/exams/professor/deleteExamById?examId=${examId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getExamDataById = async (examId) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/exams/professor/getExamDataById?examId=${examId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};
