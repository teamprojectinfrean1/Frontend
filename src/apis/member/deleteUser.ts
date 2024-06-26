import { authorizedAxios } from "../domainSettings";
import { memberPath } from "./memberSettings";

export const deleteUser = async (memberId: string) => {
  try {
    const response = await authorizedAxios.delete(
      `${memberPath}?memberId=${memberId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
