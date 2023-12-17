import { GET_TASKS_LIST } from "../../constants/task/taskConstants";

export function tasksListReducer(state = { data: {} }, action: any) {
  switch (action.type) {
    case GET_TASKS_LIST:
      return { data: action.payload };
    default:
      return state;
  }
}