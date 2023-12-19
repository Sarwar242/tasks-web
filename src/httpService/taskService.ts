import { DELETE, GET, POST, PUT } from "./service";

export const getTasksService = () => {
  return GET(`/api/v1/tasks`);
};
export const createTaskService = (data: any) => {
  return POST(`/api/v1/task/create`, data);
};

export const updateTaskService = (id: any, data: any) => {
  return PUT(`/api/v1/task/update/${id}`, data);
};

export const statusUpdateTaskService = (id: any, data: any) => {
  return PUT(`/api/v1/task/update-status/${id}`, data);
};

export const assignUserTaskService = (id: any, data: any) => {
  return POST(`/api/v1/task/assign-user/${id}`, data);
};

export const removeUserTaskService = (id: any, data: any) => {
  return POST(`/api/v1/task/remove-user/${id}`, data);
};

export const deleteTaskService = (id: any) => {
  return DELETE(`/api/v1/task/delete/${id}`);
};
