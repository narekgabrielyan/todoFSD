import { combine, createEffect, createStore } from "effector";
import { Task, typicodeApi } from "shared/api";
import { normalize, schema } from "normalizr";

const getTasksListFx = createEffect(
  (params?: typicodeApi.tasks.GetTasksListParams) => {
    return typicodeApi.tasks.getTasksList(params);
  }
);
const getTaskByIdFx = createEffect(
  (params: typicodeApi.tasks.GetTaskByIdParams) => {
    return typicodeApi.tasks.getTaskById(params);
  }
);

export const taskSchema = new schema.Entity("tasks");
export const normalizeTask = (data: Task) => normalize(data, taskSchema);
export const normalizeTasks = (data: Task[]) => normalize(data, [taskSchema]);

export const tasksInitialState: Record<number, Task> = {};
export const $tasks = createStore(tasksInitialState)
  .on(
    getTasksListFx.doneData,
    (_, payload) => normalizeTasks(payload.data).entities.tasks
  )
  .on(getTaskByIdFx.doneData, (state, payload) => ({
    ...state,
    ...normalizeTask(payload.data).entities.tasks,
  }));

export const $tasksList = combine($tasks, (tasks) => Object.values(tasks));
