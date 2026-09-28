import api from "../utils/axios.js";

export const getFinancialSummary = async () => {
  const response = await api.get("/transaction/summary");
  return response.data;
};

export const getFinancialAnalytics = async () => {
  const response = await api.get("/transaction/analytics");
  return response.data;
};

export const getMonthlyAnalytics = async () => {
  const response = await api.get("/transaction/monthly");
  return response.data;
};