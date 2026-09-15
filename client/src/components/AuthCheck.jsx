import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getCurrentUser } from "../api/auth.api.js";
import {
  login,
  finishLoading,
} from "../features/auth/authSlice.js";

const AuthCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await getCurrentUser();

        dispatch(login(response.data));
      } catch (error) {
        dispatch(finishLoading());
      }
    };

    checkUser();
  }, [dispatch]);

  return null;
};

export default AuthCheck;