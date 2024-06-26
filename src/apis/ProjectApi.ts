import { authorizedAxios, unauthorizedAxios } from "./domainSettings";
import { ProjectSummary } from "@/models/Project";

const projectPath = "project";

type LastUpdateDetailType = {
  memeberUuid: string;
  userNickname: string;
  updatedDate: string;
};

type ProjectLeaderType = {
  leaderUUID: string;
  nickname: string;
  profileImage: string | null;
};

export type PrjectListResponse = {
  mainProject: ProjectSummary[];
  noMainProject: ProjectSummary[];
};

type ProjectDetailReponse = {
  projectId: string;
  projectName: string;
  projectContent: string;
  projectImage: string | null;
  startDate: string;
  endDate: string;
  lastUpdateDetail: LastUpdateDetailType;
  projectTags: string | null;
  projectLeader: ProjectLeaderType;
};

export type CreateProjectRequest = {
  projectName: string;
  writerUuid: string | null;
  projectContent: string | null;
  projectImageFile: File | null;
  projectTagList: string[] | null;
  memberUuidList: string[] | null;
  startDate: string | null;
  endDate: string | null;
  createDate: string | null;
};

export type ReplaceProjectRequest = {
  projectId: string;
  projectName: string | null;
  projectContent: string | null;
  projectImageFile: File | null;
  updaterUuid: string;
  projectTagList: string[] | null;
  startDate: string | null;
  endDate: string | null;
  memberUuidList: string[] | null;
};

export type ChangeMainProjectResponse = {
  changedProjectId: string;
  isSuccess: boolean;
};

export type CreateProjectResponse = {
  createdProjectId: string;
  isSuccess: boolean;
};

// 프로젝트 리스트 조회
export const getProjectList = async (
  userUuid: string
): Promise<PrjectListResponse> => {
  try {
    const response = await authorizedAxios.get(
      `${projectPath}/list/${userUuid}`
    );
    return response.data.data;
  } catch (error) {
    throw new Error("프로젝트 목록을 가져오는 중 오류가 발생했습니다.");
  }
};

// 프로젝트 상세조회
export const getProjectDetail = async (
  projectId: string | null
): Promise<ProjectDetailReponse | null> => {
  if (projectId) {
    try {
      const response = await authorizedAxios.get(`${projectPath}/${projectId}`);
      return response.data.data;
    } catch (error) {
      throw new Error("프로젝트 상세 정보를 가져오는 중 오류가 발생했습니다.");
    }
  } else {
    return null;
  }
};

//프로젝트 생성
export const createOneProject = async ({
  projectName,
  writerUuid,
  projectContent,
  projectImageFile,
  projectTagList,
  memberUuidList,
  startDate,
  endDate,
  createDate,
}: CreateProjectRequest): Promise<CreateProjectResponse> => {
  try {
    const formData = new FormData();
    formData.append(
      "project",
      new Blob(
        [
          JSON.stringify({
            projectName,
            writerUuid,
            projectContent,
            projectTagList,
            memberUuidList,
            startDate,
            endDate,
            createDate,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );
    if (projectImageFile) {
      formData.append("multipartFile", projectImageFile);
    }
    const response = await authorizedAxios.post(`${projectPath}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return {
      createdProjectId: response.data.data,
      isSuccess: response.data.isSuccess,
    };
  } catch (error) {
    throw new Error("프로젝트를 생성하는 중 오류가 발생했습니다.");
  }
};

//프로젝트 수정
export const replaceOneProject = async ({
  projectId,
  projectName,
  updaterUuid,
  projectContent,
  projectImageFile,
  projectTagList,
  memberUuidList,
  startDate,
  endDate,
}: ReplaceProjectRequest): Promise<boolean> => {
  try {
    const formData = new FormData();
    formData.append(
      "project",
      new Blob(
        [
          JSON.stringify({
            projectName,
            updaterUuid,
            projectContent,
            projectTagList,
            memberUuidList,
            startDate,
            endDate,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );
    if (projectImageFile) {
      formData.append("multipartFile", projectImageFile);
    }
    const response = await authorizedAxios.put(
      `${projectPath}/${projectId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.isSuccess;
  } catch (error) {
    throw new Error(
      "프로젝트 상세 정보를 업데이트하는 중 오류가 발생했습니다."
    );
  }
};

//프로젝트 삭제
export const deleteOneProject = async (projectId: string): Promise<boolean> => {
  try {
    const response = await authorizedAxios.delete(
      `${projectPath}/${projectId}`
    );
    return response.data.isSuccess; //추후 변경 필요
  } catch (error) {
    throw new Error("프로젝트를 삭제하는 중 오류가 발생했습니다.");
  }
};

// 메인 프로젝트 변경
export const changeMainProject = async (
  projectId: string | null
): Promise<ChangeMainProjectResponse> => {
  try {
    const response = await authorizedAxios.put(
      `${projectPath}/main-project/${projectId}`
    );
    return {
      changedProjectId: response.data.data,
      isSuccess: response.data.isSuccess,
    };
  } catch (error) {
    throw new Error("메인 프로젝트를 변경하는 중 오류가 발생했습니다.");
  }
};
