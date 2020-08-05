import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { SIGNUP_USER,SIGNIN_USER, SIGNOUT_USER } from "../auctions";

const signinPromise = async (userName: string, password: string) =>
	fetch("localhost:80/login", {
		method: "post",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username: userName, password: password }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			return err.json();
		});
const signUpUserPromise = async (password: string, userName: string,emaiId:string) =>
	fetch("localhost:80/createUser", {
		method: "put",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ password: password,userName,emaiId }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			return err.json();
		});

function* userSignout(payload: any) {
	localStorage.removeItem("user_id");
	yield put({
		type: "SIGNOUT_USER_SUCCESS",
	});
}

function* userSignUp(payload: any) {
	yield put({ type: "ON_SHOW_LOADER" });
	const userSignupPromise = yield call(
		signUpUserPromise,
		payload.payload.data.password,
		payload.payload.data.userName,
		payload.payload.data.emailId,
	);
	if (userSignupPromise.result === 1) {
		yield put({
			type: "SIGNUP_USER_SUCCESS",
			payload: payload.payload.authToken,
		});
	} else if (userSignupPromise.result === 0) {
		yield put({
			type: "SHOW_MESSAGE",
			payload: { msg: userSignupPromise.msg, type: "error" },
		});
	}
}

function* userSignin(payload: any) {
	yield put({ type: "ON_SHOW_LOADER" });
	const signin = yield call(
		signinPromise,
		payload.payload.userName,
		payload.payload.password,
	);
	if (signin.result === 1) {
		localStorage.setItem("user_id", signin.data.token);
		localStorage.setItem("corporateName", signin.data.corporateName);
		yield put({
			type: "SIGNIN_USER_SUCCESS",
			payload: {
				user_id: signin.data.token,
				corporateName: signin.data.corporateName,
			},
		});
	} else if (signin.result === 0) {
		yield put({
			type: "SHOW_MESSAGE",
			payload: { msg: "Username or Password is Incorrect", type: "error" },
		});
	}
}

export function* signInUser() {
	yield takeEvery(SIGNIN_USER, userSignin);
}
export function* signOutUser() {
	yield takeEvery(SIGNOUT_USER, userSignout);
}
export function* signUpUser() {
	yield takeEvery(SIGNUP_USER, userSignUp);
}

export default function* rootSaga() {
	yield all([fork(signInUser), fork(signOutUser), fork(signUpUser)]);
}
