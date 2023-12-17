import { GET } from "./service";


export const getTasksService = () => {
  return GET(`/api/v1/tasks`);
};