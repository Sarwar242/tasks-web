import { getProjectsService } from "../../../httpService/projectService";
import { GET_PROJECTS_LIST } from "../../constants/project/projectConstants";

export const getProjectsAction = () => async (dispatch: any) => {
	try {
		var data = getProjectsService();
		const pload = (await data).data;
		dispatch({ type: GET_PROJECTS_LIST, payload: pload });
	}
	catch (error: any) { 
		console.log(error);
	}
}