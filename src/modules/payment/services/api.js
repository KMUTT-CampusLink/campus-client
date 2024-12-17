import { axiosInstance } from "../../../utils/axiosInstance.js";

export const getInvoice = async () => {
    try {
      const response = await axiosInstance.get(`/payment/invoice`);
      return response;
    } catch (error) {
      return error.response.data;
    }
};

// arrow button in Recent and All transaction 
export const getTransactionDetails = async (transactionId) => {
  try {
      const response = await axiosInstance.get(`/payment/invoiceInfo/${transactionId}`);
      return response;
  } catch (error) {
      return error.response.data;
  }
};

export const viewInstallment = async (invoiceId) => {
    try {
      const response = await axiosInstance.get(`/payment/viewInstallment/${invoiceId}`);;
      return response;
    } catch (error) {
      return error.response.data;
    }
};

export const previewInstallment = async (invoiceId, numInstallments) => {
    try {
      const response = await axiosInstance.get(`/payment/installmentPreview/${invoiceId}/${numInstallments}`);;
      return response;
    } catch (error) {
      return error.response.data;
    }
};

export const createInstallment = async (invoiceId, numInstallments) => {
    try {
      const response = await axiosInstance.post(`/payment/installment/${invoiceId}/${numInstallments}`);;
      return response;
    } catch (error) {
      return error.response.data;
    }
};

export const getVerifyStripe = async (sessionId) => {
    try {
      const response = await axiosInstance.get(`/payment/verify-session?session_id=${sessionId}`);
      return response;
    } catch (error) {
      return error.response.data;
    }
};

export const payInvoice = async (data) => {
    try {
      const response = await axiosInstance.post(`/payment/pay`, data);
      return response;
    } catch (error) {
      return error.response.data;
    }
};

export const fetchUserWallet = async () => {
  try {
    const response = await axiosInstance.post("/payment/fetchUserWallet");
    return response.data; // Returns { wallet: 0 }
  } catch (error) {
    console.error("Error fetching wallet balance:", error);
    throw error; // Propagate the error
  }
};

export const useWalletPayment = async (data) => {
  try {
    const response = await axiosInstance.post("/payment/useWallet", { inv: data.invoiceId }); // Correct payload
    return response.data;
  } catch (error) {
    console.error("Error processing wallet payment:", error);
    throw error;
  }
};

