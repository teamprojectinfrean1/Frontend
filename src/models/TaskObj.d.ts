import { Dayjs } from "dayjs";
import { RawDraftContentState } from "draft-js";

type TaskObj = {
    taskId: string,
    taskName: string,
    taskExplanation: RawDraftContentState | null;
    taskAssignee: string[] | null,
    taskTags: string[] | null,
    taskStartDate: Dayjs | null,
    taskEndDate: Dayjs | null,
    taskSubIssues: string[] | null,
    taskAuthorityType: string
}

export default TaskObj;