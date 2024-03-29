import theme from "@/theme/theme";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SocialIcons from "./SocialIcons";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import PasswordDoubleInput from "./PasswordConfirmationInput";
import { Box, Button, Divider, Typography, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IdInput from "./IdInput";
import { useRecoilValue } from "recoil";
import { signupInfoState } from "@/stores/AuthStore";
import { useChangeSignupInfo } from "@/hooks/useChangeSignupInfo";

type SignupInfoFlagTypes = {
  key: string;
  value: boolean;
};

const SignupFormRequired = () => {
  const navigate = useNavigate();

  const signupInfo = useRecoilValue(signupInfoState);

  const { changeSignupInfo, resetSignupInfo } = useChangeSignupInfo();

  const [signupValidityFlag, setSignupValidityFlag] = useState({
    emailValidityFlag: false,
    idValidityFlag: false,
    passwordValidityFlag: false,
    passwordDoubleValidityFlag: false,
  });

  const [signupDuplicateFlag, setSignupDuplicateFlag] = useState({
    emailDuplicateFlag: false,
    idDuplicateFlag: false,
  });

  const requiredSignupField = {
    emailField: !!(
      signupValidityFlag.emailValidityFlag &&
      signupDuplicateFlag.emailDuplicateFlag
    ),
    idField: !!(
      signupValidityFlag.idValidityFlag && signupDuplicateFlag.idDuplicateFlag
    ),
    passwordField: !!signupValidityFlag.passwordValidityFlag,
    passwordDoubleField: !!signupValidityFlag.passwordDoubleValidityFlag,
  };

  const changeSignupValidityFlag = ({ key, value }: SignupInfoFlagTypes) => {
    setSignupValidityFlag({
      ...signupValidityFlag,
      [key]: value,
    });
  };

  const [totalRequiredInputFlag, setTotalRequiredInputFlag] = useState(false);

  useEffect(() => {
    const requiredInputCheck = Object.values(requiredSignupField).every(
      (flag) => flag === true
    );
    setTotalRequiredInputFlag(requiredInputCheck);
  }, [requiredSignupField]);

  return (
    <>
      <Link to="/auth/login">
        <ArrowBackIcon
          fontSize="large"
          sx={{ m: 3, color: "#5F6368" }}
          onClick={resetSignupInfo}
        />
      </Link>
      <Box className="base-layout">
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          회원가입
        </Typography>
        <EmailInput
          email={signupInfo.email}
          setEmail={(value) => changeSignupInfo({ key: "email", value })}
          emailValidityFlag={signupValidityFlag.emailValidityFlag}
          setEmailValidityFlag={(value) =>
            changeSignupValidityFlag({ key: "emailValidityFlag", value })
          }
          emailDuplicateFlag={signupDuplicateFlag.emailDuplicateFlag}
          setEmailDuplicateFlag={(value) =>
            setSignupDuplicateFlag({
              ...signupDuplicateFlag,
              emailDuplicateFlag: value,
            })
          }
        />
        <IdInput
          id={signupInfo.id}
          setId={(value) => changeSignupInfo({ key: "id", value })}
          idValidityFlag={signupValidityFlag.idValidityFlag}
          setIdValidityFlag={(value) => {
            changeSignupValidityFlag({ key: "idValidityFlag", value });
          }}
          idDuplicateFlag={signupDuplicateFlag.idDuplicateFlag}
          setIdDuplicateFlag={(value) => {
            setSignupDuplicateFlag({
              ...signupDuplicateFlag,
              idDuplicateFlag: value,
            });
          }}
        />
        <PasswordInput
          password={signupInfo.password}
          setPassword={(value) => changeSignupInfo({ key: "password", value })}
          passwordValidityFlag={signupValidityFlag.passwordValidityFlag}
          setPasswordValidityFlag={(value) =>
            changeSignupValidityFlag({ key: "passwordValidityFlag", value })
          }
        />

        <PasswordDoubleInput
          password={signupInfo.password}
          passwordDoubleValidityFlag={signupValidityFlag.passwordDoubleValidityFlag}
          setPasswordDoubleValidityFlag={(value) =>
            changeSignupValidityFlag({ key: "passwordDoubleValidityFlag", value })
          }
        />
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{
              bgcolor: `${theme.palette.secondary.main}`,
              borderRadius: "7px",
            }}
            disabled={!totalRequiredInputFlag}
            onClick={() => {
              navigate("/auth/signup/optional");
            }}
          >
            계속
          </Button>
        </Box>
        <Divider sx={{ mt: 3 }}>간편 회원가입</Divider>
        <SocialIcons authPage="signup" />
      </Box>
    </>
  );
};

export default SignupFormRequired;
