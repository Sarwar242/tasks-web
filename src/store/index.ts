import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { tasksListReducer } from "./reducers/task/taskReducer";


const reducer = combineReducers({

	getTasksResponse: tasksListReducer,

});

const composeEnhancer = compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
