import { Helmet } from "react-helmet-async";
// @mui
import { Container, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// components
// sections
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getReport, getReportMsgToday } from "../api/appApi/appApi";
import { Report } from "../interface/interface";
import { AppConversionRates, AppCurrentVisits, AppWidgetSummary } from "../sections/@dashboard/app";
import { getReportMsgMonthly } from './../api/appApi/appApi';
import { reportMsgToday } from "./../interface/interface";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme: any = useTheme();
  const navigate = useNavigate();
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
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
    const fetch = async () => {
      const data = await getReport();
      const dataToday = await getReportMsgToday();
      const dataMonthly = await getReportMsgMonthly()
      if (data && data.result && dataToday && dataToday.result) {
        setReport(data.result);
        setReportMsgMonthly(dataMonthly.result)
        setReportMsgToday(dataToday.result);
      }
    };
    fetch();
  }, []);

  return (
    <>
      <Helmet>
        <title>Komu Dashboard </title>
      </Helmet>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid
            onClick={() =>
              navigate("/dashboard/userdiscord", { replace: true })
            }
            item
            xs={12}
            sm={6}
            md={3}
          >
            <AppWidgetSummary
              sx={{ cursor: "pointer" }}
              title="Active Users"
              total={report?.totalUserActive}
              color="info"
              icon={"mdi:users-group"}
            />
          </Grid>

          <Grid
            onClick={() => navigate("/dashboard/Message", { replace: true })}
            item
            xs={12}
            sm={6}
            md={3}
          >
            <AppWidgetSummary
              sx={{ cursor: "pointer" }}
              title="Messages Today"
              total={report?.totalMsgOfToday}
              color="info"
              icon={"jam:messages-alt-f"}
            />
          </Grid>

          <Grid
            onClick={() => navigate("/dashboard/meeting", { replace: true })}
            item
            xs={12}
            sm={6}
            md={3}
          >
            <AppWidgetSummary
              sx={{ cursor: "pointer" }}
              title="Meeting"
              total={report?.totalMeeting}
              color="warning"
              icon={"material-symbols:hangout-meeting"}
            />
          </Grid>

          <Grid
            onClick={() => navigate("/dashboard/channel", { replace: true })}
            item
            xs={12}
            sm={6}
            md={3}
          >
            <AppWidgetSummary
              sx={{ cursor: "pointer" }}
              title="Channel"
              total={report?.totalChannel}
              color="error"
              icon={"fluent:channel-alert-16-filled"}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Total message today"
              chartData={[
                { label: "Hà Nội", value: reportMsgToday.HANOI },
                { label: "Hà Nội 2", value: reportMsgToday.HANOI2 },
                { label: "Hà Nội 3", value: reportMsgToday.HANOI3 },
                { label: "Vinh", value: reportMsgToday.VINH },
                { label: "Đà Nẵng", value: reportMsgToday.DANANG },
                { label: "Quy Nhơn", value: reportMsgToday.QUYNHON },
                { label: "Sài Gòn", value: reportMsgToday.SAIGON },
                { label: "Sài Gòn 2", value: reportMsgToday.SAIGON2 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Total message of monthly"
              chartData={[
                { label: 'Vinh', value: reportMsgMonthly.VINH },
                { label: 'Đà Nẵng', value: reportMsgMonthly.DANANG },
                { label: 'Hà Nội', value: reportMsgMonthly.HANOI },
                { label: 'Hà Nội 2', value: reportMsgMonthly.HANOI2 },
                { label: 'Hà Nội 3', value: reportMsgMonthly.HANOI3 },
                { label: 'Quy Nhơn', value: reportMsgMonthly.QUYNHON },
                { label: 'Sài Gòn', value: reportMsgMonthly.SAIGON },
                { label: 'Sài Gòn 2', value: reportMsgMonthly.SAIGON2 },
             
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
