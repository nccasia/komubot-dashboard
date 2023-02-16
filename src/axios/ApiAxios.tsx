import axios from "axios";

export const apiAxios = axios.create({
  baseURL: "http://10.10.20.18:3001/",
  headers: {
    "Content-Type": "application/json",
    //"accept": "text/plain",
    //"Authorization":`Bearer ${localStorage.getItem('accessToken')}`,
  },
});

export const channelLink = "channel";
export const meetingLink = "meeting";
export const dailyLink = "daily";
