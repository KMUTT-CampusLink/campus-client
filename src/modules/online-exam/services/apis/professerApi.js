import { axiosInstance } from "../../../../utils/axiosInstance";

export const createNewExam = async (exam, sectionId) => {
  try {
    const response = await axiosInstance.post("/exams/professor/createExam", {
      exam: exam,
      sectionId: sectionId,
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getExams = async (sectionid) => {
  try {
    const response = await axiosInstance.get(`/exams/professor/getExams?sectionid=${sectionid}`);
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

export const dashboard = async (examId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/professor/getDashboardData?examId=${examId}`
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
};

export const getStudentAnswers = async (examId, studentId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/professor/getStudentAnswers?examId=${examId}&studentId=${studentId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getStudentScore = async (studentExamId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/professor/getStudentScore?id=${studentExamId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getStudentExam = async (studentExamId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/professor/getStudentData?id=${studentExamId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getQuestionScore = async (questionId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/professor/getQuestionScore?id=${questionId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getStudentScoreById = async (questionId, studentId) => {
  try {
    const response = await axiosInstance.get(
      `/exams/professor/getStudentScoreById?id=${questionId}&studentId=${studentId}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const updateStudentScore = async (finalEssayScore, finalComment, studentExamId, studentId) => {
  try {
    const response = await axiosInstance.put(
      "/exams/professor/updateStudentScore",
      {
        studentId: studentId,
        studentExamId: studentExamId,
        finalEssayScore: finalEssayScore,
        finalComment: finalComment,
      }
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

 export const updateExamAnnouncement = async (examId, isAnnounced) => {
  try {
    const response = await axiosInstance.put(
      "/exams/professor/updateExamAnnouncement",
      {
        examId: examId,
        publicScoreStatus: isAnnounced,
      }
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axiosInstance.post("/exams/professor/uploadFile", file);
    return response;
  } catch (error) {
    return error.response.data;
  }
}