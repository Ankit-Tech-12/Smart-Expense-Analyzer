import api from "../utils/axios.js";

export const getFinancialSummary = async () => {
  const response = await api.get("/expense/summary");
  return response.data;
};

export const getFinancialAnalytics = async () => {
  const response = await api.get("/expense/analytics");
  return response.data;
};

export const getMonthlyAnalytics = async () => {
  const response = await api.get("/expense/monthly");
  return response.data;
};