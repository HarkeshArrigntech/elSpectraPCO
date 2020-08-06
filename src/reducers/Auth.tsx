import  jwt from "jsonwebtoken";
function decodeToken (token:any){
	return jwt.verify(token, "elSpectra", (err:any, decoded:any) => {if(err){return null}else{ return  {role:decoded.role,emailId:decoded.emailId,tenantName:decoded.tenantName,userName:decoded.userName}}});
}
function getToken(token:any){
	return jwt.verify(token, "elSpectra", (err:any, decoded:any) => {if(err){return null}else{ return  token}});

}
const INIT_STATE = {
	posts:[],
	loader: false,
	alertMessage: "",
	showMessage: false,
	typeOfMessage: "",
	initURL: "",
	nextURL:"",
	setPasswordToken: "",
	userDeatils:localStorage.getItem("user") !== null ? decodeToken(localStorage.getItem("user")): null,
	authUser: getToken(localStorage.getItem("user")),
};

export default (state = INIT_STATE, action: { type: any; payload: any }) => {
	switch (action.type) {
		case "SIGNUP_USER_SUCCESS": {
			return {
				...state,
				loader: false,
				alertMessage: "User regester successfully",
				showMessage: true,
				nextURL: "/signin",
				typeOfMessage: "success",
			};
		}
		case "SIGNIN_USER_SUCCESS": {
			return {
				...state,
				loader: false,
				authUser: action.payload.user,
				userDeatils:action.payload.userDetails
			};
		}
		case "INIT_URL": {
			return {
				...state,
				initURL: action.payload,
			};
		}
		case "NEXT_URL_EMPTY": {
			return {
				...state,
				nextURL: "",
			};
		}
		case "GETPOSTS_SUCCESS":{
			return{
				...state,
				posts:action.payload.data
			}
		}
		case "SIGNOUT_USER_SUCCESS": {
			return {
				...state,
				posts:[],
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
