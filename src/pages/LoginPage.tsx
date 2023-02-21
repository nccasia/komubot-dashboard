// @mui
import { Button, Container, Divider, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
// hooks
import { useNavigate } from "react-router-dom";
import useResponsive from "../hooks/useResponsive";
// components
import Iconify from "../components/iconify";
import Logo from "../components/logo";
// sections
import { gapi } from "gapi-script";
import { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { loginWithGoogle } from "../api/authApi/authApi";
import { LoginForm } from "../sections/auth/login";
// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }: any) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------
const clientId =
  "498168811060-ii509rnksf25l04drpgka1kjh0jgs14f.apps.googleusercontent.com";

export default function LoginPage() {
  const navigate = useNavigate();
  const handleGoogleLoginSuccess = async (response: any) => {
    const tokenId: string = await response.tokenId;
    const res = await loginWithGoogle(tokenId);
    if (res) {
      navigate("/dashboard", { replace: true });
    }
  };

  const handleGoogleLoginFailure = (response: any) => {
    console.log("Google login failed:", response);
    // handle the error
  };

  const mdUp = useResponsive("up", "md", "sm");
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  return (
    <>
      {/* <Helmet>
        <title> Login | Komubot </title>
      </Helmet> */}

      <StyledRoot>
        <Logo
          sx={{
            position: "fixed",
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img
              src="/assets/illustrations/illustration_login.png"
              alt="login"
            />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" marginBottom={'20px'} gutterBottom>
              Sign in to Komubot
            </Typography>
            <LoginForm />
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                OR
              </Typography>
            </Divider>
            <Stack direction="row" spacing={2}>
              <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={handleGoogleLoginSuccess}
                onFailure={handleGoogleLoginFailure}
                cookiePolicy={"single_host_origin"}
                render={(renderProps) => (
                  <Button
                    onClick={renderProps.onClick}
                    fullWidth
                    size="large"
                    color="inherit"
                    variant="outlined"
                  >
                    <Iconify
                      icon="eva:google-fill"
                      color="#DF3E30"
                      width={22}
                      height={22}
                    />
                  </Button>
                )}
              />
            </Stack>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
