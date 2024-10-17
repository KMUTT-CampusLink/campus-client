import axios from "axios";

export const createNewExam = async (exam) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/exams/professor/createExam",
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
      "http://localhost:3000/api/exams/professor/getExams"
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getExamById = async (examId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/exams/professor/getExamById?examId=${examId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export const deleteExamById = async (examId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/exams/professor/deleteExamById?examId=${examId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export const getExamDataById = async (examId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/exams/professor/getExamDataById?examId=${examId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
}