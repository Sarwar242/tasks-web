import { GET_PROJECTS_LIST } from "../../constants/project/projectConstants";

export function projectsListReducer(state = { data: {} }, action: any) {
  switch (action.type) {
    case GET_PROJECTS_LIST:
      return { data: action.payload };
    default:
      return state;
  }
}