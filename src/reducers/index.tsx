import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import Auth from "./Auth";
export default (history: any) =>
	combineReducers({
		router: connectRouter(history),
		auth: Auth,
	});
