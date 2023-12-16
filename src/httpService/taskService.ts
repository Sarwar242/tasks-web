import { DELETE, GET, POST, PUT } from "./service";


export const getTasksService = () => {
  return GET(`/api/v1/tasks`);
};