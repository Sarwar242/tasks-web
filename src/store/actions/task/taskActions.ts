import { getTasksService } from "../../../httpService/taskService";
import { GET_TASKS_LIST } from "../../constants/task/taskConstants";

export const getTasksAction = () => async (dispatch: any) => {
	try {
		var data = getTasksService();
		const pload = (await data).data;
		dispatch({ type: GET_TASKS_LIST, payload: pload });
	}
	catch (error: any) {

	}
}