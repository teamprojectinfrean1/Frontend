import "./Auth.css";
import { Box, Typography } from "@mui/material";

const LogoAndName = () => {
  return (
    <Box sx={{ my: "auto" }}>
      <img src='favicon.ico' alt="..." width={100} />
      <Box display="flex" sx={{ my: 5 }}>
        <Typography
          variant="h1"
          sx={{ fontFamily: "Pattaya", color: "#173665" }}
        >
          tasks
        </Typography>
        <Typography
          variant="h1"
          sx={{ fontFamily: "Pattaya", color: "#3C4043" }}
        >
          tagram
        </Typography>
      </Box>

      <Box display="flex" sx={{ ml: 3 }}>
        <Box
          className="auth-main-first-circle"
          sx={{ bgcolor: "#dee1e6" }}
        ></Box>
        <Box
          className="auth-main-secondary-circle"
          sx={{ ml: 10, bgcolor: "#d7dadf" }}
        ></Box>
        <Box
          className="auth-main-secondary-circle"
          sx={{ ml: 20, bgcolor: "#d1d3d8" }}
        ></Box>
        <Box
          className="auth-main-secondary-circle"
          sx={{ ml: 30, bgcolor: "#cbcdd2" }}
        ></Box>
      </Box>
    </Box>
  );
};

export default LogoAndName;
