import api from "../utils/axios.js";

export const createTransaction = async (transactionData) => {
    const response = await api.post(
        "/transaction/create",
        transactionData
    );

    return response.data;
};

export const getTransactions = async () => {
    const response = await api.get(
        "/transaction/getTransactionList"
    );

    return response.data;
};

export const deleteTransaction = async (id) => {
    const response = await api.delete(
        `/transaction/delete/${id}`
    );

    return response.data;
};

export const updateTransaction = async (id, transactionData) => {
    const response = await api.put(
        `/transaction/update/${id}`,
        transactionData
    );

    return response.data;
};