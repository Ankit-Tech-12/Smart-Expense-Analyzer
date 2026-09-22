import api from "../utils/axios.js";

export const createExpense = async (expenseData) => {
    const response = await api.post(
        "/expense/create",
        expenseData
    );

    return response.data;
};

export const getExpenses = async () => {
    const response = await api.get(
        "/expense/getExpenseList"
    );

    return response.data;
};

export const deleteExpense = async (id) => {
    const response = await api.delete(
        `/expense/delete/${id}`
    );

    return response.data;
};

export const updateExpense = async (id, expenseData) => {
    const response = await api.put(
        `/expense/update/${id}`,
        expenseData
    );

    return response.data;
};