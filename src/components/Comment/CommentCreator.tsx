import useFeedbackHandler from "@/hooks/useFeedbackHandler";
import { useMutation } from "react-query";
import { createComment } from "@/apis/commentApi";
import PrimaryButton from "@/components/PrimaryButton";
import { Box, Skeleton } from "@mui/material";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { issueIdToShowInModalState } from "@/stores/issueStore";
import Spinner from "@/components/Spinner";
import { userInfoState } from "@/stores/userStore";
import UserAvatar from "@/components/UserAvatar";
import { CommentInputControl } from "./CommentInputControl";

const SkeletonCommentCreator = (
  <Box display="flex" gap={4} sx={{ mb: 5 }}>
    <Skeleton variant="circular" width={50} height={50} />
    <Skeleton
      variant="rectangular"
      height={80}
      sx={{ flexGrow: 1, borderRadius: "4px" }}
    />
  </Box>
);

type CommentCreatorProps = {
  issueDetailsIsLoading: boolean;
};
const CommentCreator = ({ issueDetailsIsLoading }: CommentCreatorProps) => {
  const { userId } = useRecoilValue(userInfoState);
  const issueId = useRecoilValue(issueIdToShowInModalState);

  const [commentBody, setCommentBody] = useState<string>("");

  const {
    mutate: executeCreateComment,
    data,
    isLoading,
    isSuccess,
    isError,
  } = useMutation(() =>
    createComment({
      comment: {
        writerId: userId,
        issueId: issueId!,
        body: commentBody,
      },
    })
  );

  useFeedbackHandler({
    isError,
    errorMessage:
      "댓글을 추가하는 중 문제가 발생했습니다. 나중에 다시 시도해 주십시오.",
    isSuccess,
    successMessage: "댓글이 추가되었습니다.",
  });

  if(issueDetailsIsLoading) {
    return SkeletonCommentCreator;
  }

  return (
    <Box sx={{ mb: 5 }}>
      {isLoading ? (
        <Spinner />
      ) : (
        <Box display="flex" gap={4}>
          <UserAvatar sx={{ width: 50, height: 50 }} />
          <CommentInputControl
            commentBody={commentBody}
            setCommentBody={setCommentBody}
            renderButton={
              <PrimaryButton
                disabled={isLoading}
                onClick={() => executeCreateComment()}
              >
                추가
              </PrimaryButton>
            }
          />
        </Box>
      )}
    </Box>
  );
};

export default CommentCreator;
