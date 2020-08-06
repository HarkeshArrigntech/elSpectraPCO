import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { SIGNUP_USER, SIGNIN_USER, SIGNOUT_USER,CREATE_USER } from "../auctions";

const signinPromise = async (emailId: string, password: string) =>
	fetch("http://localhost:80/signin", {
		method: "post",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ emailId: emailId, password: password }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			return err.json();
		});

		const createUserPromise = async (emailId: string, userName: string,token:string) =>
	fetch("http://localhost:80/createUser", {
		method: "post",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
            "Authorization":token
		},
		body: JSON.stringify({ emailId: emailId, userName: userName }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			return err.json();
		});
const signUpUserPromise = async (
	password: string,
	userName: string,
	emailId: string,
) =>
	fetch("http://localhost:80/signup", {
		method: "post",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ password, userName, emailId }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			return err;
		});

function* userSignout(payload: any) {
	localStorage.removeItem("user");
	yield put({
		type: "SIGNOUT_USER_SUCCESS",
	});
}

function* userSignUp(payload: any) {
	console.log(payload)
	const userSignupPromise = yield call(
		signUpUserPromise,
		payload.payload.password,
		payload.payload.userName,
		payload.payload.emailId,
	);
	console.log(userSignupPromise)
	if (userSignupPromise.success) {
		yield put({
			type: "SIGNUP_USER_SUCCESS",
		});
	} else {
		yield put({
			type: "SHOW_MESSAGE",
			payload: { msg: userSignupPromise.message, type: "error" },
		});
	}
}

function* userSignin(payload: any) {
	yield put({ type: "ON_SHOW_LOADER" });
	const signin = yield call(
		signinPromise,
		payload.payload.emailId,
		payload.payload.password,
	);
	if (signin.success === true) {
		localStorage.setItem("user", signin.result.token);
		yield put({
			type: "SIGNIN_USER_SUCCESS",
			payload: {
				user: signin.result.token,
				userDetails:{role:signin.result.role,tenantName:signin.result.tenantName,userName:signin.result.userName,
					emailId:signin.result.emailId,}
			},
		});
	} else {
		yield put({
			type: "SHOW_MESSAGE",
			payload: { msg: signin.message, type: "error" },
		});
	}
}

function* createNewUser(payload: any) {
	const createUser = yield call(
		createUserPromise,
		payload.payload.emailId,
		payload.payload.userName,
		payload.payload.authUser
	);
	if (createUser.success === true) {
		yield put({
			type: "SHOW_MESSAGE",
			payload: { msg: createUser.message, type: "success" },
		});
	} else {
		yield put({
			type: "SHOW_MESSAGE",
			payload: { msg: createUser.message, type: "error" },
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
export function* createUserNew() {
	yield takeEvery(CREATE_USER, createNewUser);
}

export default function* rootSaga() {
	yield all([fork(signInUser), fork(signOutUser), fork(signUpUser),fork(createUserNew)]);
}
