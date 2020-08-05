// import { TRIAL_CALL } from "../auctions";

const INIT_STATE = {
	loader: false,
	alertMessage: "",
	showMessage: false,
	typeOfMessage: "",
	initURL: "",
	setPasswordToken: "",
	authUser: localStorage.getItem("user_id"),
};

export default (state = INIT_STATE, action: { type: any; payload: any }) => {
	switch (action.type) {
		case "SIGNUP_USER_SUCCESS": {
			return {
				...state,
				loader: false,
				alertMessage: "User regester successfully",
				showMessage: true,
				typeOfMessage: "success",
			};
		}
		case "SIGNIN_USER_SUCCESS": {
			return {
				...state,
				loader: false,
				authUser: action.payload.user_id,
			};
		}
		case "INIT_URL": {
			return {
				...state,
				initURL: action.payload,
			};
		}
		case "SIGNOUT_USER_SUCCESS": {
			return {
				...state,
				authUser: null,
				initURL: "/signin",
				loader: false,
			};
		}

		case "SHOW_MESSAGE": {
			return {
				...state,
				alertMessage: action.payload.msg,
				showMessage: true,
				typeOfMessage: action.payload.type,
				loader: false,
			};
		}
		case "HIDE_MESSAGE": {
			return {
				...state,
				alertMessage: "",
				showMessage: false,
				loader: false,
			};
		}
		case "ON_SHOW_LOADER": {
			return {
				...state,
				loader: true,
			};
		}
		case "ON_HIDE_LOADER": {
			return {
				...state,
				loader: false,
			};
		}
		default:
			return state;
	}
};
