import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { withRouter } from "react-router";
import { connect, ConnectedProps } from "react-redux";
import { SIGNIN_USER } from "./auctions";
import {Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { InputAdornment } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

interface RootState {
	auth: any;
	router: any;
}

const mapState = (state: RootState) => ({
	...state["auth"],
});
const mapDispatch = {
	signinUser: (data: any) => ({ type: SIGNIN_USER, payload: data }),
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Signin = (props: PropsFromRedux) => {
	const history = useHistory();
	const classes = useStyles();
	useEffect(() => {
		if (props.authUser !== null) {
			history.push("/");
		}
	});
	let [emailID, setEmailId] = React.useState("");
	let [password, setPassword] = React.useState("");
	let [password1Hide, setPassword1Hide] = React.useState(true);

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='email'
						value={emailID}
						label='Email Address'
						name='email'
						onChange={(event: any) => setEmailId(event.target.value)}
						autoComplete='email'
						autoFocus
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						InputProps={{
							endAdornment: (
								<InputAdornment position='end' style={{cursor:"pointer"}} >
									{password1Hide ? (
										<VisibilityIcon
											onClick={() => setPassword1Hide(false)}
											fontSize='small'
										/>
									) : (
										<VisibilityOffIcon
											onClick={() => setPassword1Hide(true)}
											fontSize='small'
										/>
									)}
								</InputAdornment>
							),
						}}
						type={password1Hide ? "password" : "text"}
						value={password}
						onChange={(event: any) => setPassword(event.target.value)}
						id='password'
						autoComplete='current-password'
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link to='/forgotPassword'>
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link to='/signup'>
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
			</div>
		</Container>
	);
};

export default withRouter(connector(Signin));
