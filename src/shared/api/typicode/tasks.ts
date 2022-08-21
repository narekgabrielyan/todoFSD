import { AxiosPromise } from "axios";
import { apiInstance } from "./base";
import { Task } from "./models";

const BASE_URL = "/todos";

export type GetTasksListParams = {
  userId?: number;
  completed?: boolean;
};

export const getTasksList = (
  params?: GetTasksListParams
): AxiosPromise<Task[]> => {
  return apiInstance.get(BASE_URL, { params });
};

export type GetTaskByIdParams = {
  id?: number;
  [x: string]: any;
};

export const getTaskById = ({
  id,
  ...params
}: GetTaskByIdParams): AxiosPromise<Task> => {
  return apiInstance.get(`${BASE_URL}/${id}`, { params });
};
