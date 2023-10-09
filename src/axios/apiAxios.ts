import axios from "axios";
import { getAccessToken, removeAccessToken } from "../utils/localStorerage";
import { notyf } from "../utils/notif";

export const apiAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
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
    notyf.error(String(error.message));
    if (error.response.status === 401) {
      removeAccessToken();
      window.location.pathname = "/login";
    }
  }
);
export const channelLink = "channel";
export const channelMemberLink = "channel/viewMember";
export const channelRemoteMemberLink = "channel/remoteMember";
export const channelSearchLink = "channel/searchMember";
export const channelAddMemberLink = "channel/addMember";
export const meetingLink = "meeting";
export const mentionLink = "mention";
export const dailyLink = "daily";
export const penaltyLink = "penalty";
export const amountLink = "penalty/amount";
export const messageLink = "message";
export const userLink = "user";
export const userEditLink = "user/edit";
export const userDeactiveLink = "user/deactive";
export const reportLink = "dashboard"
export const reportMsgLink = "dashboard/reportMsg"
export const reportMsgMonthlyLink = "dashboard/reportMsgMonthly";
export const reportRoleTypeLink = "dashboard/reportRoleType"
