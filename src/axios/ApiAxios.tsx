import axios from "axios";
import { getAccessToken } from "../utils/localStorerage";

export const apiAxios = axios.create({
  baseURL: "http://10.10.20.18:3001/",
  headers: {
    "Content-Type": "application/json",
    "accept": "text/plain",
    "Authorization":`Bearer ${getAccessToken()}`,
  },
});
apiAxios.interceptors.response.use(
  response => {
      return response;
  }, error => {
      if (error.response.status === 401) {

          localStorage.removeItem("token");
          window.location.pathname = '/login'
      }})
export const channelLink = "channel";
export const meetingLink = "meeting";
export const dailyLink = "daily";
