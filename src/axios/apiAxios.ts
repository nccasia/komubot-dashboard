import axios from "axios";
import { getAccessToken, removeAccessToken } from "../utils/localStorerage";

export const apiAxios = axios.create({
  baseURL: "http://10.10.20.18:3001/",
  headers: {
    "Content-Type": "application/json",
  },
});

apiAxios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

apiAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response.status === 401) {
      removeAccessToken();
      window.location.pathname = "/login";
    }
  }
);
export const channelLink = "channel";
export const meetingLink = "meeting";
export const dailyLink = "daily";
export const penaltyLink = "penalty";
export const amountLink = "penalty/amount";
export const messageLink = "message";
export const userLink = "user";
export const reportLink = "dashboard"
export const reportMsgLink = "dashboard/reportMsg"
