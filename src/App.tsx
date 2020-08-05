import React, { useEffect } from "react";
import Home from "./container/Home";
import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import ProtectedRoute, { ProtectedRouteProps } from "./ProtectedRoute";
import { connect, ConnectedProps } from "react-redux";
import Signin from "./signin";
import Signup from "./signup";
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { Notification } from "./components/SnackBar";
import { orange,green } from "@material-ui/core/colors";
const theme = createMuiTheme({
	palette: {
		common: { black: "#000", white: "#fff" },
		primary: { main: green[700], light: green[100] },
		secondary: { main: orange[700], light: orange[100] },
	}
});
interface RootState {
	auth: any;
	router: any;
}

const mapState = (state: RootState) => ({
	...state["auth"],
	router: state.router,
});
const mapDispatch = {
	setInitUrl: (path: string) => ({ type: "INIT_URL", payload: path }),
	closeNotification: () => ({ type: "HIDE_MESSAGE" }),
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const MainApp = (props: PropsFromRedux) => {
	useEffect(() => {
		if (props.initURL === "") {
			props.setInitUrl(props.router.location.pathname);
		}
	});
	if (props.router.location.pathname === "/") {
		if (props.authUser === null) {
			return <Redirect to={"/signin"} />;
		} else if (
			props.initURL === "" ||
			props.initURL === "/" ||
			props.initURL === "/signin" ||
			props.initURL === "/setPassword"
		) {
			return <Redirect to={"/dashboard"} />;
		} else {
			return <Redirect to={props.initURL} />;
		}
	}
	const defaultProtectedRouteProps: ProtectedRouteProps = {
		isAuthenticated:
			props.authUser === null ||
			props.authUser === undefined ||
			props.authUser === ""
				? false
				: true,
		authenticationPath: "/signin",
	};
	return (
		<>
			<Notification
				open={props.showMessage}
				handleClose={props.closeNotification}
				message={props.alertMessage}
				type={props.typeOfMessage}
			/>

			<ThemeProvider theme={theme}>
				<Switch>
					<ProtectedRoute
						{...defaultProtectedRouteProps}
						path={"/Home"}
						component={Home}
					/>
					
					<Route path='/signin'>
						<Signin />
					</Route>
					<Route path='/signup'>
						<Signup />
					</Route>

				</Switch>
			</ThemeProvider>
		</>
	);
};
export default withRouter(connector(MainApp));
