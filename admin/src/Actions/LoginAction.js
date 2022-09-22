import axios from "axios";
import {
    CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../Constants/LoginConstant";

// LOGIN

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
    
        const config = { headers: { "Content-Type": "application/json" } };
    
        const { data } = await axios.post(
          `/api/auth/login`,
          { email, password },
          config
        );
        if (data.role === "admin") {
            dispatch({ type: LOGIN_SUCCESS, payload: data.user });
        }else {
            dispatch({
              type: LOGIN_FAIL,
              payload:  "You are not allowed!" ,
            });
            
          }
      } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
      }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
