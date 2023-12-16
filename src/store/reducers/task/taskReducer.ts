export function tasksListReducer(state = {}, action: any) {
    if (action.type === "GET_TASKS_LIST") {
      return { data: action.payload };
    }
    return state;
  }
  