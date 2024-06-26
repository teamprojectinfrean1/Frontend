import { Link, Outlet } from "react-router-dom";
import { Box, Typography, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const FindPasswordLayout = () => {
  return (
    <>
      <Link to="/auth/login">
        <ArrowBackIcon fontSize="large" sx={{ m: 3, color: "#5F6368" }} />
      </Link>
      <Box sx={{ m: "auto", width: "70%" }}>
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            비밀번호 재설정
          </Typography>
          <Divider sx={{ mt: 4, mb: 3 }} />
        </Box>
        <Outlet />
      </Box>
    </>
  );
};

export default FindPasswordLayout;
