import api from "../utils/axios.js";

export const createTransaction = async (transactionData) => {
    const response = await api.post(
        "/expense/create",
        transactionData
    );

    return response.data;
};

export const getTransactions = async () => {
    const response = await api.get(
        "/expense/getExpenseList"
    );

    return response.data;
};

export const deleteTransaction = async (id) => {
    const response = await api.delete(
        `/expense/delete/${id}`
    );

    return response.data;
};

export const updateTransaction = async (id, transactionData) => {
    const response = await api.put(
        `/expense/update/${id}`,
        transactionData
    );

    return response.data;
};