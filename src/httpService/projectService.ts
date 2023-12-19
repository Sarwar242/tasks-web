import { DELETE, GET, POST, PUT } from "./service";

export const createProjectService = (data: any) => {
  return POST(`/api/v1/project/create`, data);
};

export const updateProjectService = (id: any, data: any) => {
  return PUT(`/api/v1/project/update/${id}`, data);
};

export const statusUpdateProjectService = (id: any, data: any) => {
  return PUT(`/api/v1/project/update-status/${id}`, data);
};

export const deleteProjectService = (id: any) => {
  return DELETE(`/api/v1/project/delete/${id}`);
};

export const getProjectsService = () => {
  return GET(`/api/v1/projects`);
};
