import { applyMiddleware, compose, createStore } from "redux";
import reducers from "../reducers";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
import { logger } from "redux-logger";
const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, routeMiddleware];

export default function configureStore() {
	const store = createStore(
		reducers(history),
		compose(applyMiddleware(...middlewares, logger)),
	);

	sagaMiddleware.run(rootSaga);
	return store;
}
export { history };
