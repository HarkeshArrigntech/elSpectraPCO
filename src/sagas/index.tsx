import { all } from "redux-saga/effects";

import authSagas from "./Auth";
import postSagas from "./Post";
export default function* rootSaga() {
	yield all([authSagas(),postSagas()]);
}
