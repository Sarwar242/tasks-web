import { GET_USERS_LIST, GET_USER_PROFILE } from "../../../constants/auth/user/userConstant";

const initialState = {
  data: [],
};

const initialUserProfileState = {
  data: { id: 1, name: "User Name", email: "user@email.com" },
};

export function usersListReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_USERS_LIST:
      return { data: action.payload };
    default:
      return state;
  }
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
