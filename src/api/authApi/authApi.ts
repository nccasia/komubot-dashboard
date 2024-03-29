import axios, { AxiosError } from "axios";
import { Author } from "../../interface/interface";
import { setAccessToken } from "../../utils/localStorerage";
import { notyf } from "../../utils/notif";

interface ErrorResponse {
  error: {
    message: string;
  };
}
export const Login = async (values: Author): Promise<string> => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}auth/login`, {
      ...values,
    });
    const token = res.data.accessToken;
    setAccessToken(token);
    notyf.success("Login successfully");
    return token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      notyf.error(error.response?.data.message);
      const axiosError: AxiosError<ErrorResponse> = error;
      // Axios error - handle as appropriate
      if (axiosError.response) {
        // Server responded with an error status code
        throw new Error(axiosError.response.data.error.message);
      } else {
        // No response from the server - network error
        throw new Error("Network error");
      }
    } else {
      // Non-Axios error - re-throw
      throw error;
    }
  }
};
export const loginWithGoogle = async (tokenId: string): Promise<string> => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}auth/google`, {
     tokenId
    });
    const token = res.data.accessToken;
    setAccessToken(token);
    notyf.success("Login successfully");
    return token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError<ErrorResponse> = error;
      notyf.error(error.response?.data.message);

      
      // Axios error - handle as appropriate
      if (axiosError.response) {
        
        
        // Server responded with an error status code
        throw new Error(axiosError.response.data.error.message);
      } else {
        // No response from the server - network error
        throw new Error("Network error");
      }
    } else {
      // Non-Axios error - re-throw
      throw error;
    }
  }
};
