import theme from "@/theme/theme";
import { Grid, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { checkAuthInputValidity } from "@/utils/authCheck";
import { useMutation } from "react-query";
import EmailVerificationCodeInput from "./EmailVerificationCodeInput";
import { EmailCertificationRequest, requestEmailCertification } from "@/apis/userApi";

type EmailCertificationInputProps = {
  findUserInfo: "findId" | "findPassword";
};

const EmailCertificationInput = ({
  findUserInfo,
}: EmailCertificationInputProps) => {
  const [errorState, setErrorState] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const validState = !!(email && !isEmailValid);

  const mutateEmailCertification = useMutation(
    ({ findUserInfo, email }: EmailCertificationRequest) =>
      requestEmailCertification({ findUserInfo, email })
  );

  useEffect(() => {
    if (validState) {
      setShowErrorMessage("이메일 형식이 올바르지 않습니다.");
      setErrorState(true);
    } else {
      setShowErrorMessage("");
      setErrorState(false);
    }
  }, [email]);

  useEffect(() => {
    if (mutateEmailCertification.isLoading !== undefined) {
      if (mutateEmailCertification.isLoading) {
        setShowErrorMessage("요청 중입니다. 잠시만 기다려주세요...");
        setErrorState(true);
      }
    }
  }, [mutateEmailCertification.isLoading]);

  useEffect(() => {
    if (mutateEmailCertification.error === "Network Error") {
      setShowErrorMessage(
        "네트워크 에러가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
      setErrorState(true);
    }
  }, [mutateEmailCertification.error]);

  useEffect(() => {
    if (!!mutateEmailCertification.data) {
      setShowErrorMessage("인증 번호가 전송되었습니다.");
    }
  }, [mutateEmailCertification.data]);

  return (
    <>
      <Grid container spacing={3} sx={{ mt: 5 }}>
        <Grid item xs={8}>
          <TextField
            autoFocus
            sx={{
              "& .MuiFormHelperText-root": {
                position: "absolute",
                mt: 5,
                ml: 1,
                fontSize: "11px",
                fontWeight: "bold",
                color: theme.palette.error.main,
              },
            }}
            type="email"
            fullWidth
            size="small"
            placeholder={"example@email.com"}
            value={email}
            error={errorState}
            helperText={showErrorMessage}
            disabled={!!mutateEmailCertification.data}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailValid(
                checkAuthInputValidity({
                  type: "email",
                  authValue: e.target.value,
                })
              );
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: `${theme.palette.secondary.main}`,
              height: "41px",
              borderRadius: "7px",
            }}
            disabled={!isEmailValid}
            onClick={() =>
              mutateEmailCertification.mutate({
                findUserInfo,
                email,
              })
            }
          >
            {mutateEmailCertification.isLoading || mutateEmailCertification.data
              ? "재전송"
              : "인증요청"}
          </Button>
        </Grid>
      </Grid>
      <EmailVerificationCodeInput
        isSuccess={!!mutateEmailCertification.data}
        email={email}
        findUserInfo={findUserInfo}
      />
    </>
  );
};

export default EmailCertificationInput;
