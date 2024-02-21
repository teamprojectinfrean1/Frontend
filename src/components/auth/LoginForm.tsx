import theme from "@/theme/theme";
import { useState } from "react";
import SocialIcons from "../SocialIcons";
import AuthMenuOptions from "./AuthMenuOptions";
import LoginModal from "./LoginErrorModal";

import { Box, Button, Divider, OutlinedInput, Typography } from "@mui/material";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [showModal, setShowModal] = useState(false);

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
        value={passwd}
        onChange={(e) => {
          setPasswd(e.target.value);
        }}
      />
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
          setShowModal(true);
        }}
      >
        로그인
      </Button>
      <Box sx={{ mt: 2 }}>
        <AuthMenuOptions />
      </Box>
      <Divider sx={{ mt: 3 }}>간편 로그인</Divider>
      <SocialIcons authPage="login" />
      <LoginModal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
      />
    </Box>
  );
};

export default LoginForm;
