import { Button } from "@mui/material";
import useFeedbackHandler from "@/hooks/useFeedbackHandler";
import { useMutation } from "react-query";
import { updateIssueDetails } from "@/apis/issueApi";
import EditIcon from "@mui/icons-material/Edit";
import Spinner from "@/components/Spinner";
import PrimaryButton from "@/components/PrimaryButton";

type MutateFunction = (issue: Issue) => void;

type IssueUpdateButtonProps = {
  issueId: string;
  handleFormSubmit: (mutationFunction: MutateFunction) => void;
};

const IssueUpdateButton = ({
  issueId,
  handleFormSubmit,
}: IssueUpdateButtonProps) => {
  const {
    mutate: executeUpdateIssueDetails,
    data,
    isLoading,
    isSuccess,
    isError,
  } = useMutation((issue: Issue) => updateIssueDetails({ issueId, issue }));

  useFeedbackHandler({
    isError,
    errorMessage:
      "이슈를 수정하는 중 문제가 발생했습니다. 나중에 다시 시도해 주십시오.",
    isSuccess,
    successMessage: "이슈가 수정되었습니다.",
  });

  return (
    <>
      {isLoading && <Spinner centerInViewport size={70} />}
      <PrimaryButton
        disabled={!issueId || isLoading}
        onClick={() => handleFormSubmit(executeUpdateIssueDetails)}
        startIcon={<EditIcon />}
      >
        수정
      </PrimaryButton>
    </>
  );
};

export default IssueUpdateButton;