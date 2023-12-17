import { GET_USER_PROFILE } from "../../../constants/auth/user/userConstant";

const initialState = {
  userList: [],
};

const initialUserProfileState = {
  data: { id: 1, name: "User Name", email: "user@email.com" },
};

export function userListReducer(state = initialState, action: any) {
  if (action.type === "GET-USER-LIST") {
    return { userList: action.payload };
  }
  return state;
}

export function userProfileReducer(
  state = initialUserProfileState,
  action: any
) {
  switch (action.type) {
    case GET_USER_PROFILE:
      return { data: action.payload };
    default:
      return state;
  }
}
