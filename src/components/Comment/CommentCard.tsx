import UserAvatar from "@/components/UserAvatar";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useCallback, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { commentIdSelectedToDeleteState } from "@/stores/commentStore";
import { PrimaryButton, Spinner } from "@/components";
import { userInfoState } from "@/stores/userStore";
import { CommentInputControl } from "@/components/Comment";
import useFeedbackHandler from "@/hooks/useFeedbackHandler";
import { useMutation, useQueryClient } from "react-query";
import { updateComment } from "@/apis/commentApi";
import { issueIdToShowInModalState } from "@/stores/issueStore";
import { updateItemInCache } from "@/utils/reactQueryCacheUpdaters";

type CommentCardProps = {
  comment: ExistingComment;
};

const CommentCard = ({ comment }: CommentCardProps) => {
  const queryClient = useQueryClient();
  const { memberId: loggedInMemberId } = useRecoilValue(userInfoState);
  const issueId = useRecoilValue(issueIdToShowInModalState);
  const setCommentIdSelectedToDelete = useSetRecoilState(
    commentIdSelectedToDeleteState
  );
  const {
    commentId,
    commentBody,
    updatedAt,
    userId: commentWriterId,
    userNickname,
    userProfileImage,
  } = comment;

  const [editMode, setEditMode] = useState<boolean>(false);
  const [updatedCommentBody, setUpdatedCommentBody] =
    useState<string>(commentBody);

  const isLoggedInUserCommentWriter = loggedInMemberId === commentWriterId;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSettingsDropdown = () => {
    setAnchorEl(null);
  };

  const handleCommentEdit = () => {
    handleCloseSettingsDropdown();
    setEditMode(true);
  };

  const handleCommentDelete = () => {
    handleCloseSettingsDropdown();
    setCommentIdSelectedToDelete(commentId);
  };

  const {
    mutate: executeUpdateComment,
    data: updatedComment,
    isLoading: isUpdatingComment,
    isSuccess,
    isError,
  } = useMutation(() => {
    return updateComment({
      commentId,
      comment: {
        writerId: loggedInMemberId,
        issueId: issueId!,
        commentBody: updatedCommentBody,
      },
    });
  });

  const successAction = useCallback(() => {
    setEditMode(false);
    updateItemInCache<ExistingComment>({
      idPropertyName: "commentId",
      moveToFront: false,
      queryClient,
      queryKey: ["commentList", issueId!],
      updatedItem: updatedComment!,
    });
  }, [queryClient, issueId, updatedComment]);

  useFeedbackHandler({
    isError,
    errorMessage:
      "댓글을 수정하는 중 문제가 발생했습니다. 나중에 다시 시도해 주십시오.",
    isSuccess,
    successMessage: "댓글이 수정되었습니다.",
    successAction,
  });

  if (isUpdatingComment) {
    return <Spinner />;
  }

  return (
    <Box display="flex" gap={4}>
      <UserAvatar imageUrl={userProfileImage} />
      {editMode ? (
        <CommentInputControl
          commentBody={updatedCommentBody}
          setCommentBody={setUpdatedCommentBody}
          renderButton={
            <PrimaryButton
              disabled={isUpdatingComment}
              onClick={() => executeUpdateComment()}
            >
              저장
            </PrimaryButton>
          }
          handleCancel={() => {
            setUpdatedCommentBody(commentBody);
            setEditMode(false);
          }}
        />
      ) : (
        <Stack
          sx={{
            width: "100%",
            py: 2,
            px: 3,
            border: `1px solid ${grey[400]}`,
            borderRadius: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              {userNickname}
            </Typography>
            {isLoggedInUserCommentWriter && (
              <>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="comment-settings"
                  onClick={handleSettingsClick}
                  sx={{ p: 0.5 }}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleCloseSettingsDropdown}
                  sx={{
                    "& .MuiButtonBase-root": {
                      px: 2,
                    },
                    "& .MuiSvgIcon-root": {
                      mr: 1,
                    },
                  }}
                >
                  <MenuItem onClick={handleCommentEdit}>
                    <EditOutlinedIcon fontSize="small" /> 수정
                  </MenuItem>
                  <MenuItem onClick={handleCommentDelete}>
                    <DeleteOutlineOutlinedIcon fontSize="small" /> 삭제
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
          <Typography variant="caption">{commentBody}</Typography>
          <Typography
            textAlign="right"
            sx={{ color: grey[600], fontSize: ".7rem" }}
          >
            {updatedAt.split("T")[0]}
          </Typography>
        </Stack>
      )}
    </Box>
  );
};

export default CommentCard;
