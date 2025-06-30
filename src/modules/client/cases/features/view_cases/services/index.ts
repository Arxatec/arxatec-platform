import type { PersonalCasesDto } from "../dto";
import type { Response } from "~/types/services";
import { axiosInstance } from "~/interceptors";
import type { CaseModel } from "../models";

export const getPersonalCases = async (): Promise<CaseModel> => {
  const response = await axiosInstance.get<Response<PersonalCasesDto>>(
    "/cases/me"
  );
  return {
    cases: response.data?.data?.cases ?? [],
  };
};
