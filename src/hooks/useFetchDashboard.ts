import { useEffect, useState } from "react";
import { Report, reportMsgToday } from "../interface/interface";
import {
  getReport,
  getReportMsgMonthly,
  getReportMsgToday,
} from "./../api/appApi/appApi";

export const useFetchDashboard = () => {
  const [report, setReport] = useState<Report>({
    totalUserActive: 0,
    totalDailyOfToday: 0,
    totalMsgOfToday: 0,
    totalMeeting: 0,
    totalChannel: 0,
  });
  const [reportMsgToday, setReportMsgToday] = useState<reportMsgToday>({
    VINH: 0,
    HANOI: 0,
    HANOI2: 0,
    HANOI3: 0,
    DANANG: 0,
    QUYNHON: 0,
    SAIGON: 0,
    SAIGON2: 0,
  });
  const [reportMsgMonthly, setReportMsgMonthly] = useState<reportMsgToday>({
    VINH: 0,
    HANOI: 0,
    HANOI2: 0,
    HANOI3: 0,
    DANANG: 0,
    QUYNHON: 0,
    SAIGON: 0,
    SAIGON2: 0,
  });

  useEffect(() => {
    const fetch = async () => {
      const data = await getReport();
      data && setReport(data.result);
    };
    fetch();
  }, []);
  useEffect(() => {
    const fetch = async () => {
      const dataMonthly = await getReportMsgMonthly();
      dataMonthly && setReportMsgMonthly(dataMonthly.result);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const dataToday = await getReportMsgToday();
      dataToday && setReportMsgToday(dataToday.result);
    };
    fetch();
  }, []);

  return { report, reportMsgToday, reportMsgMonthly };
};
