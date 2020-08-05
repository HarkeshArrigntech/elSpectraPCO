import React from "react";
import App from "./App";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import configureStore, { history } from "./store";
import { Switch, Route } from "react-router-dom";

export const store = configureStore();

function mainApp() {
	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<Switch>
					<Route path='/' component={App} />
				</Switch>
			</ConnectedRouter>
		</Provider>
	);
}
export default mainApp;
