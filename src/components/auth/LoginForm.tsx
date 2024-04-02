import theme from "@/theme/theme";
import { useState } from "react";
import SocialIcons from "./SocialIcons";
import AuthMenuOptions from "./AuthMenuOptions";
import { fetchLogin } from "@/apis/auth";
import { Box, Button, Divider, OutlinedInput, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { data, refetch } = useQuery(
    "login",
    () => fetchLogin({ email, password }),
    {
      enabled: false,
      cacheTime: 0,
      onSuccess: (data) => {
        if (data) {
          navigate("/");
        }
      },
    }
  );

  return (
    <Box className="base-layout">
      <Typography variant="h5" sx={{ fontWeight: "bold", mt: 8 }}>
        로그인
      </Typography>
      <Typography sx={{ mt: 5, ml: 0.5 }}>Email</Typography>
      <OutlinedInput
        type="email"
        fullWidth
        size="small"
        placeholder={"example@email.com"}
        sx={{ mt: 1 }}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Typography sx={{ mt: 3, ml: 0.5 }}>Password</Typography>
      <OutlinedInput
        type="password"
        fullWidth
        size="small"
        placeholder={"비밀번호"}
        sx={{ mt: 1 }}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      {data !== undefined && !data && (
        <Box
          sx={{
            mt: 2,
            color: `${theme.palette.error.main}`,
            textAlign: "center",
          }}
        >
          <Typography fontSize="11px">
            아이디 또는 비밀번호를 잘못 입력했습니다.
          </Typography>
          <Typography fontSize="11px">
            입력하신 내용을 다시 확인해주세요.
          </Typography>
        </Box>
      )}

      <Button
        variant="contained"
        fullWidth
        size="large"
        sx={{
          mt: 3,
          bgcolor: `${theme.palette.secondary.main}`,
          borderRadius: "7px",
        }}
        onClick={() => {
          refetch();
        }}
      >
        로그인
      </Button>

      <Box sx={{ mt: 2 }}>
        <AuthMenuOptions />
      </Box>
      <Divider sx={{ mt: 3 }}>간편 로그인</Divider>
      <SocialIcons authPage="login" />
    </Box>
  );
};

export default LoginForm;
