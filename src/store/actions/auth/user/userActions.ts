import { getUserService } from "../../../../httpService/userService";

export const getUserAction = (id: any) => async (dispatch: any) => {
	try {
		var data = getUserService(id);
		// const pload = (await data).data;
		// dispatch({ type: GET_USER, payload: pload });
	}
	catch (error: any) { }
}
