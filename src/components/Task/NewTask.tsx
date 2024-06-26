import { Card, IconButton, Typography } from "@mui/material";
import theme from "@/theme/theme";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

type NewTaskProps = {
  onShowTaskModal(isModalOpen: boolean): void;
  onClick(task: Task | null): void;
};

const NewTask = ({ onClick, onShowTaskModal }: NewTaskProps) => {
  return (
    <Card
      onClick={() => {
        onClick(null);
        onShowTaskModal(true);
      }}
      sx={{
        height: "200px",
        borderRadius: 4,
        boxShadow: 3,
        p: 1,
        background: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        "&:hover": {
          backgroundColor: "#C2C6D6",
          cursor: "pointer",
        },
      }}
      variant="elevation"
      square={false}
    >
      <AddCircleRoundedIcon fontSize="large" />
      <Typography
        variant="subtitle1"
        sx={{ textAlign: "center", fontWeight: "bold" }}
      >
        테스크 추가
      </Typography>
    </Card>
  );
};

export default NewTask;
