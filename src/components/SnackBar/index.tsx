import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

interface SnackBarAlert {
	open: boolean;
	handleClose: any;
	type: string;
	message: string;
}

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}
export function Notification(props: SnackBarAlert) {
	const { open, handleClose, message, type } = props;
	switch (type) {
		case "success":
			return (
				<Snackbar
					anchorOrigin={{ vertical: "top", horizontal: "right" }}
					open={open}
					autoHideDuration={3000}
					onClose={() => handleClose()}
				>
					<Alert onClose={() => handleClose()} severity='success'>
						{message}
					</Alert>
				</Snackbar>
			);
		case "error":
			return (
				<Snackbar
					anchorOrigin={{ vertical: "top", horizontal: "right" }}
					open={open}
					autoHideDuration={3000}
					onClose={() => handleClose()}
				>
					<Alert onClose={() => handleClose()} severity='error'>
						{message}
					</Alert>
				</Snackbar>
			);
		case "info":
			return (
				<Snackbar
					anchorOrigin={{ vertical: "top", horizontal: "right" }}
					open={open}
					autoHideDuration={3000}
					onClose={() => handleClose()}
				>
					<Alert onClose={() => handleClose()} severity='info'>
						{message}
					</Alert>
				</Snackbar>
			);
		case "warning":
			return (
				<Snackbar
					anchorOrigin={{ vertical: "top", horizontal: "right" }}
					open={open}
					autoHideDuration={3000}
					onClose={() => handleClose()}
				>
					<Alert onClose={() => handleClose()} severity='warning'>
						{message}
					</Alert>
				</Snackbar>
			);
		default:
			return <div />;
	}
}
