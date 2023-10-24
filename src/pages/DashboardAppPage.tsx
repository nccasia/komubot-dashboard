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

export default function DashboardAppPage() {
  const theme: any = useTheme();
  const navigate = useNavigate();
  const { report, reportMsgMonthly, reportMsgToday, reportRoleType, reportRoomType } = useFetchDashboard();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Komu Dashboard </title>
      </Helmet>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <p 
          style={{ 
            margin: "15px 0 15px 10px",
            fontWeight: 600,
            textDecoration: "underline",
          }}
        >
          Dashboard
        </p>
        <Grid container spacing={3}>
          <Grid
            onClick={() =>
              navigate("/dashboard/users", { replace: true })
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
        </Grid>

        <p 
          style={{ 
            margin: "15px 0 15px 10px",
            fontWeight: 600,
            textDecoration: "underline",
          }}
        > 
          Role
        </p>
        <Grid container spacing={3}>
            {reportRoomType ? reportRoomType.map((item: any, index: number) => {
              return(
                <Grid item xs={12} sm={6} md={3} lg={4} key={index}>
                  <AppWidgetSummary
                    sx={{ cursor: "pointer" }}
                    title={item?.name}
                    total={item?.total}
                    color={item?.name ==="PM" ? "error" : item?.name === "STAFF" ?"warning" : "info"}
                    icon={"mdi:account-circle"}
                  />
                </Grid >
              )
            }): null}
        </Grid>

        <p 
          style={{ 
            margin: "15px 0 15px 10px",
            fontWeight: 600,
            textDecoration: "underline",
          }}
        > 
          Room
        </p>
        <Grid container spacing={4}>
            {reportRoleType ? reportRoleType.map((item: any, index: number) => {
              return(
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <AppWidgetSummary
                    sx={{ cursor: "pointer" }}
                    title={item?.name}
                    total={item?.total}
                    color={ index% 3 ===0  ? "warning" : index % 3 === 1? "error" : "info"}
                    icon={"mdi:bank"}
                  />
                </Grid >
              )
            }): null}
        </Grid>

        <p  
          style={{ 
            margin: "15px 0 15px 10px",
            fontWeight: 600,
            textDecoration: "underline",
          }}
        >
          Active
        </p>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
          {reportMsgToday && (
              <AppCurrentVisits
              title="Total message today"
              chartData={[
                { label: "Hà Nội", value: reportMsgToday.HANOI || 0  },
                {  label: "Hà Nội 2", value: reportMsgToday["HANOI2"] || 0  },
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
            )}
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
          {reportMsgMonthly && (
              <AppConversionRates
              title="Total message of monthly"
              chartData={[
                { label: "Vinh", value: reportMsgMonthly.VINH || 0 },
                { label: "Đà Nẵng", value: reportMsgMonthly.DANANG },
                { label: "Hà Nội", value: reportMsgMonthly.HANOI },
                { label: "Hà Nội 2", value: reportMsgMonthly.HANOI2 },
                { label: "Hà Nội 3", value: reportMsgMonthly.HANOI3 },
                { label: "Quy Nhơn", value: reportMsgMonthly.QUYNHON },
                { label: "Sài Gòn", value: reportMsgMonthly.SAIGON },
                { label: "Sài Gòn 2", value: reportMsgMonthly.SAIGON2 },
              ]}
            />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
