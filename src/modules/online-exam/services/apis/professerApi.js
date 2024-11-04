import { axiosInstance } from "../../../../utils/axiosInstance";

export const createNewExam = async (exam) => {
  try {
    const response = await axiosInstance.post(
      "/exams/professor/createExam",
      { exam: exam }
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getExams = async () => {
  try {
    const response = await axiosInstance.get(
      "/exams/professor/getExams"
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getExamById = async (examId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/professor/getExamById?examId=${examId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteExamById = async (examId) => {
  try {
    const response = await axiosInstance.delete(
      `/exams/professor/deleteExamById?examId=${examId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getExamDataById = async (examId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/professor/getExamDataById?examId=${examId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const updateExam = async (exam) => {
  try {
    const response = await axiosInstance.put(
      "/exams/professor/updateExam",
      exam
    );
    return response;
  } catch (error) {
    return error.response?.data;
  }
};

export const getFullMark = async (examId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/professor/getFullMark?examId=${examId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const updateExamSettings = async (examId, exam) => {
  try {
    const response = await axiosInstance.put(
      `/exams/professor/updateExamSettings`,
      { examId: examId, exam: exam }
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getExamParticipants = async (examId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/professor/getExamParticipants?examId=${examId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export const getStudentAnswers = async (examId, studentId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/professor/getStudentAnswers?examId=${examId}&studentId=${studentId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export const getStudentScore = async (studentExamId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/professor/getStudentScore?id=${studentExamId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export const getStudentExam = async (studentExamId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/professor/getStudentData?id=${studentExamId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
}