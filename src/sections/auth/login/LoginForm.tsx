import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import FormControlLabel from "@mui/material/FormControlLabel";
// components
import Iconify from "../../../components/iconify";
import { Author } from "./../../../interface/interface";
import { Login } from "../../../Api/Auth/AuthApi";
import { setAccessToken } from './../../../utils/localStorerage';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [author, setAuthor] = useState<Author>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange =
    (prop: keyof Author) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setAuthor({ ...author, [prop]: event.target.value });
    };
  const handleClick = async () => {
    const res = await Login(author);
    if (res) {
      setAccessToken(res)
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          value={author.username}
          name="email"
          onChange={handleChange("username")}
          label="Email address"
        />

        <TextField
          value={author.password}
          name="password"
          label="Password"
          onChange={handleChange("password")}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <FormControlLabel
          control={<Checkbox name="remember" />}
          label="Remember me"
        />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );
}
