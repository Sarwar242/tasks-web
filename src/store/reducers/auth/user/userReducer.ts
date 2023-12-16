
const initialState = {
  userList: [],
};


export function userListReducer(state = initialState, action: any) {
  if (action.type === "GET-USER-LIST") {
    return { userList: action.payload };
  }
  return state;
}
