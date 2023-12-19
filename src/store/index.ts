import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { tasksListReducer } from "./reducers/task/taskReducer";
import { userProfileReducer, usersListReducer } from "./reducers/auth/user/userReducer";
import { projectsListReducer } from "./reducers/project/projectReducer";


const reducer = combineReducers({
	getUsersResponse: usersListReducer,
	getTasksResponse: tasksListReducer,
	getUserProfileResponse: userProfileReducer,
	getProjectsResponse: projectsListReducer,
});

const composeEnhancer = compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
