import React, { useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
interface RootState {
	auth: any;
	router: any;
}
const mapState = (state: RootState) => ({
	...state["auth"],
});
const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

const FAQs = (props: PropsFromRedux) => {
	const history = useHistory();

	useEffect(() => {
		if (props.authUser === null) {
			history.push("/");
		}
	});
	return (
        <>
        <h3>Home page</h3>
		</>
	);
};
export default withRouter(connector(FAQs));
