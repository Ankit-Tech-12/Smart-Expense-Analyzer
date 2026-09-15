import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getExpenses } from "../api/expense.api";
import { setExpenses } from "../features/expenses/expensesSlice";

const ExpenseCheck = () => {
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(
        (state) => state.auth.isAuthenticated
    );

    useEffect(() => {
        if (!isAuthenticated) return;

        const loadExpenses = async () => {
            try {
                const response = await getExpenses();

                dispatch(setExpenses(response.data));
            } catch (error) {
                console.log(error);
            }
        };

        loadExpenses();
    }, [isAuthenticated, dispatch]);

    return null;
};

export default ExpenseCheck;