import { getUserService } from "../../../../httpService/userService";
import { GET_USER_PROFILE } from "../../../constants/auth/user/userConstant";

export const getUserAction = () => async (dispatch: any) => {
	try {
		var data = getUserService();
		const pload = (await data).data;
		dispatch({ type: GET_USER_PROFILE, payload: pload });
	}
	catch (error: any) { }
}
