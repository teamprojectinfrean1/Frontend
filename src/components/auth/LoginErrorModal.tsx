import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Modal, Button, Box, Typography } from "@mui/material";

type LoginErrorModalProps = {
  showModal: boolean;
  isSuccess: boolean;
  handleClose(): void;
};

type successTypes = {
  isSuccess: boolean;
};

const AuthResultModal = ({
  showModal,
  isSuccess,
  handleClose,
}: LoginErrorModalProps) => {
  const handleIsSuccessText = ({ isSuccess }: successTypes) => {
    return (
      !isSuccess && (
        <>
          <Typography sx={{ fontWeight: "bold" }}>
            로그인에 실패했습니다.
          </Typography>
          <Typography sx={{ mt: 1 }}>
            이메일이나 비밀번호를 확인해 주세요.
          </Typography>
        </>
      )
    );
  };

  return (
    <Modal open={showModal}>
      <Box
        boxShadow={10}
        sx={{
          position: "absolute",
          top: "20%",
          left: "40%",
          width: "410px",
          p: 1,
          backgroundColor: "white",
        }}
      >
        <Box sx={{ position: "absolute", mt: 2, ml: 0.8 }}>
          <HighlightOffIcon
            sx={{
              color: "white",
              bgcolor: "#F30C0C",
              borderRadius: "50%",
              p: 0.2,
            }}
          />
        </Box>
        <Box className="base-layout">
          <Box sx={{ mt: 2 }}>{handleIsSuccessText({ isSuccess })}</Box>
          <Button
            variant="contained"
            fullWidth
            sx={{
              my: 2,
              bgcolor: "#CCCCCC",
              color: "#121923",
              ":hover": { bgcolor: "#CCCCCC" },
            }}
            onClick={() => {
              handleClose();
            }}
          >
            확인
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthResultModal;
