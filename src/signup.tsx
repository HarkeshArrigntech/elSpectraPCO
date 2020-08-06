import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { withRouter } from "react-router";
import { connect, ConnectedProps } from "react-redux";
import { SIGNUP_USER } from "./auctions";
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
	signUpUser: (data: any) => ({ type: SIGNUP_USER, payload: data }),
	showMessage: (data:any)=> ({type:"SHOW_MESSAGE",payload:data})
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Signup = (props: PropsFromRedux) => {
	const history = useHistory();
	const classes = useStyles();
	useEffect(() => {
		if (props.authUser !== null) {
			history.push("/");
		}
	});
	let [userName, setUserName] = React.useState("");
	let [emailID, setEmailId] = React.useState("");
	let [password1, setPassword1] = React.useState("");
	let [password1Hide, setPassword1Hide] = React.useState(true);
	let [password2, setPassword2] = React.useState("");
	let [password2Hide, setPassword2Hide] = React.useState(true);
   const signUp=()=>{
	   if(userName === "" || emailID === "" || password1 === "" || password2 === ""){
		props.showMessage({
			msg:"Please Enter all the fields",
			type:"error"
		})
	   }
	   else{
		   if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(emailID)){
			if(password1 !== password2){
				props.showMessage({
					msg:"Passwords Dont Match",
					type:"error"
				})
			}else{
				props.signUpUser({
					emailId:emailID,password:password1,userName:userName
				})
			}
		   }else{
			props.showMessage({
				msg:"Email Id Invalid Formate",
				type:"error"
			})
		   }
    
}
   }
	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign Up
				</Typography>
				<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='userName'
						value={userName}
						label='User Name'
						name='userName'
						onChange={(event: any) => setUserName(event.target.value)}
						autoFocus
					/>	
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
					value={password1}
					onChange={(event: any) => setPassword1(event.target.value)}
					id='password1'
				/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='password'
						label='Conform Password'
						InputProps={{
							endAdornment: (
								<InputAdornment position='end' style={{cursor:"pointer"}} >
									{password2Hide ? (
										<VisibilityIcon
											onClick={() => setPassword2Hide(false)}
											fontSize='small'
										/>
									) : (
										<VisibilityOffIcon
											onClick={() => setPassword2Hide(true)}
											fontSize='small'
										/>
									)}
								</InputAdornment>
							),
						}}
						type={password2Hide ? "password" : "text"}
						value={password2}
						onChange={(event: any) => setPassword2(event.target.value)}
						id='password2'
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
						onClick={()=>signUp()}
					>
						Sign Up
					</Button>
					<Grid container>

						<Grid item>
							<Link to='/signin'>
								{"You have an account? Sign In"}
							</Link>
						</Grid>
					</Grid>
			</div>
		</Container>
	);
};

export default withRouter(connector(Signup));
