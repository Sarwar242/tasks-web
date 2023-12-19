import { reactLocalStorage } from "reactjs-localstorage";
import { getUserService, getUsersService } from "../../../../httpService/userService";
import { GET_USERS_LIST, GET_USER_PROFILE } from "../../../constants/auth/user/userConstant";

export const getUserAction = () => async (dispatch: any) => {
	try {
		var data = getUserService();
		const pload = (await data).data;
		dispatch({ type: GET_USER_PROFILE, payload: pload });
	}
	catch (error: any) { 
		reactLocalStorage.remove("User");
		reactLocalStorage.remove("Token");
	}
}

export const getUsersAction = () => async (dispatch: any) => {
	try {
		var data = getUsersService();
		const pload = (await data).data;
		dispatch({ type: GET_USERS_LIST, payload: pload });
	}
	catch (error: any) { 
		console.log(error);
	}
}
