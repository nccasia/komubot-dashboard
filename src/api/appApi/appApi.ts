import { apiAxios, reportLink,reportMsgLink, reportMsgMonthlyLink } from "../../axios/apiAxios";

export const getReport = async () => {
  try {
    const res = await apiAxios.get(reportLink);
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getReportMsgToday = async () => {
  try {
    const res = await apiAxios.get(reportMsgLink);
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const getReportMsgMonthly = async () => {
  try {
    const res = await apiAxios.get(reportMsgMonthlyLink);
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
