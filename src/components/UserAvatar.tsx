import { Avatar } from "@mui/material";
import { SxProps } from "@mui/material/styles";

type UserAvatarProps = {
  sx?: SxProps;
};

const UserAvatar = ({ sx }: UserAvatarProps) => {
  return (
    <Avatar
      alt="user avatar"
      /* src="" 나중에 추가 */
      sizes="140px"
      sx={{
        width: 50,
        height: 50,
        ...sx,
      }}
    />
  );
};

export default UserAvatar;
