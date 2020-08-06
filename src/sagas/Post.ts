import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { SUBBMIT_POST,GET_POST } from "../auctions";
const getPostspromise = (token:any)=> fetch("http://localhost:80/post", {
    method: "get",
    headers: {
        "Authorization":token
    },
})
    .then((response) => {
        return response.json();
    })
    .catch((err) => {
        return err;
    });
const subbmitPostPromise = async (
	title: string,
    description: string,
    token:string
) =>
	fetch("http://localhost:80/post", {
		method: "post",
		headers: {
			"Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization":token
		},
		body: JSON.stringify({ title,description }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			return err;
		});



function* userSubbmitPost(payload: any) {
	const signin = yield call(
		subbmitPostPromise,
		payload.payload.title,
        payload.payload.description,
        payload.payload.authUser,
	);
	if (signin.success === true) {
        yield put({type:GET_POST,payload:{authUser:payload.payload.authUser}})
        yield put({
			type: "SHOW_MESSAGE",
			payload: { msg: signin.message, type: "success" },
        });
	} else {
		yield put({
			type: "SHOW_MESSAGE",
			payload: { msg: signin.message, type: "error" },
		});
	}
}
 function* userGetPost(payload:any){
     const posts= yield call(
         getPostspromise,payload.payload.authUser
     )
     if(posts.success === true){
        yield put({
			type: "GETPOSTS_SUCCESS",
			payload: { data: posts.result, },
		});
     }else{

     }
 }

export function* subbmitPost() {
	yield takeEvery(SUBBMIT_POST, userSubbmitPost);
}
export function* getPost() {
	yield takeEvery(GET_POST, userGetPost);
}

export default function* rootSaga() {
	yield all([fork(subbmitPost),fork(getPost)]);
}
