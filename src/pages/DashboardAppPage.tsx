import { Helmet } from "react-helmet-async";
// @mui
import { Container, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// components
// sections
import { useEffect } from "react";
import { useNavigate } from "react-router";
import {
  AppConversionRates,
  AppCurrentVisits,
  AppWidgetSummary
} from "../sections/@dashboard/app";
import { useFetchDashboard } from "./../hooks/useFetchDashboard";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme: any = useTheme();
  const navigate = useNavigate();
  const { report, reportMsgMonthly, reportMsgToday } = useFetchDashboard();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
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
                { label: "H?? N???i", value: reportMsgToday.HANOI },
                { label: "H?? N???i 2", value: reportMsgToday.HANOI2 },
                { label: "H?? N???i 3", value: reportMsgToday.HANOI3 },
                { label: "Vinh", value: reportMsgToday.VINH },
                { label: "???? N???ng", value: reportMsgToday.DANANG },
                { label: "Quy Nh??n", value: reportMsgToday.QUYNHON },
                { label: "S??i G??n", value: reportMsgToday.SAIGON },
                { label: "S??i G??n 2", value: reportMsgToday.SAIGON2 },
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
                { label: "Vinh", value: reportMsgMonthly.VINH },
                { label: "???? N???ng", value: reportMsgMonthly.DANANG },
                { label: "H?? N???i", value: reportMsgMonthly.HANOI },
                { label: "H?? N???i 2", value: reportMsgMonthly.HANOI2 },
                { label: "H?? N???i 3", value: reportMsgMonthly.HANOI3 },
                { label: "Quy Nh??n", value: reportMsgMonthly.QUYNHON },
                { label: "S??i G??n", value: reportMsgMonthly.SAIGON },
                { label: "S??i G??n 2", value: reportMsgMonthly.SAIGON2 },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
