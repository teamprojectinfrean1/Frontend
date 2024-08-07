import theme from "@/theme/theme";
import { checkAuthInputValidity } from "@/utils/authCheck";
import { Grid, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { checkIdExistence } from "@/apis/userApi";

type IdInputProps = {
  id: string;
  setId(id: string): void;
  isIdValid: boolean;
  setIsIdValid(value: boolean): void;
  isIdDuplicate: boolean;
  setIsIdDuplicate(value: boolean): void;
};

const IdInput = ({
  id,
  setId,
  isIdValid,
  setIsIdValid,
  isIdDuplicate,
  setIsIdDuplicate,
}: IdInputProps) => {
  const [errorState, setErrorState] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState("");

  const validState = !!(id && !isIdValid);
  const disabledState = !!(!isIdValid || isIdDuplicate);

  const { data, isLoading, error, refetch } = useQuery(
    "checkId",
    () => checkIdExistence(id),
    {
      enabled: false,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    if (data !== undefined) {
      setIsIdDuplicate(!!data);
      if (!!!data) {
        setShowErrorMessage(
          "이미 가입된 아이디입니다. 다른 아이디를 입력해주세요."
        );
        setErrorState(true);
      } else {
        setShowErrorMessage("");
        setErrorState(false);
      }
    }
  });

  useEffect(() => {
    if (validState) {
      setShowErrorMessage("아이디는 5~20자의 영문 소문자, 숫자만 사용 가능합니다.");
      setErrorState(true);
    } else {
      setShowErrorMessage("");
      setErrorState(false);
    }
  }, [id]);

  useEffect(() => {
    if (isLoading) {
      setShowErrorMessage("요청 중입니다. 잠시만 기다려주세요...");
      setErrorState(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (error) {
      setShowErrorMessage(
        "네트워크 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
      setErrorState(true);
    }
  }, [error]);

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={9}>
          <TextField
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
            type="text"
            fullWidth
            size="small"
            placeholder={"아이디"}
            value={id}
            error={errorState}
            helperText={showErrorMessage}
            disabled={isIdDuplicate}
            onChange={(e) => {
              setId(e.target.value);
              setIsIdValid(
                checkAuthInputValidity({
                  type: "id",
                  authValue: e.target.value,
                })
              );
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: `${theme.palette.secondary.main}`,
              height: "41px",
              borderRadius: "7px",
            }}
            disabled={disabledState}
            onClick={() => {
              refetch();
            }}
          >
            {isIdDuplicate ? "확인 완료" : "중복 확인"}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default IdInput;
