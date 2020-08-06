import React, { useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import FormDialog from "./Post";
import AddUsers from "./AddUsers";
import { GET_POST, SIGNOUT_USER } from "../auctions";

interface RootState {
	auth: any;
	router: any;
}

const useStyles = makeStyles((theme) => ({
	icon: {
		marginRight: theme.spacing(2),
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
	heroButtons: {
		position: "absolute",
		right: theme.spacing(4),
		marginBottom: theme.spacing(4),
	},
	userDiv: {
		position: "absolute",
		right: theme.spacing(4),
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
	card: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
	},
	cardMedia: {
		paddingTop: "56.25%", // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(6),
	},
}));

const mapState = (state: RootState) => ({
	...state["auth"],
});
const mapDispatch = {
	getPosts: (data: any) => ({ type: GET_POST, payload: data }),
	signOut: () => ({ type: SIGNOUT_USER }),
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Home = (props: PropsFromRedux) => {
	const classes = useStyles();
	const history = useHistory();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleMenu = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		if (props.posts.length === 0) {
			props.getPosts({ authUser: props.authUser });
		}
		if (props.authUser === null) {
			history.push("/");
		}
	});

	return (
		<>
			<React.Fragment>
				<CssBaseline />
				<AppBar position='static'>
					<Toolbar>
						<Typography variant='h6' color='inherit' noWrap>
							{props.userDeatils.tenantName}
						</Typography>
						<div className={classes.userDiv}>
							{props.userDeatils.userName}
							<IconButton
								aria-label='account of current user'
								aria-controls='menu-appbar'
								aria-haspopup='true'
								onClick={handleMenu}
								color='inherit'
							>
								<AccountCircle />
							</IconButton>
							<Menu
								id='menu-appbar'
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={open}
								onClose={handleClose}
							>
								{props.userDeatils.tenantName !== props.userDeatils.emailId && props.userDeatils.role === "admin"  ? (
									<>
										<MenuItem>
											<AddUsers />
										</MenuItem>
										<MenuItem onClick={() => props.signOut()}>
											Sign Out
										</MenuItem>
									</>
								) : (
									<MenuItem onClick={() => props.signOut()}>Sign Out</MenuItem>
								)}
							</Menu>
						</div>
					</Toolbar>
				</AppBar>
				<main>
					{/* Hero unit */}
					<div className={classes.heroContent}>
						<Container maxWidth='sm'>
							<div className={classes.heroButtons}>
								<FormDialog />
							</div>
							<Typography
								component='h1'
								variant='h2'
								align='center'
								color='textPrimary'
								gutterBottom
							>
								Posts
							</Typography>
						</Container>
					</div>
					<Container className={classes.cardGrid} maxWidth='md'>
						{/* End hero unit */}
						<Grid container spacing={4}>
							{props.posts.length === 0 ? (
								<h3>Sorry No Posts to Show</h3>
							) : (
								props.posts.map((post: any) => (
									<Grid item key={post._id} xs={12} sm={6} md={4}>
										<Card className={classes.card}>
											<CardMedia
												className={classes.cardMedia}
												image='https://source.unsplash.com/random'
												title='Image title'
											/>
											<CardContent className={classes.cardContent}>
												<Typography gutterBottom variant='h5' component='h2'>
													{post.title}
												</Typography>
												<Typography>{post.description}</Typography>
											</CardContent>
											<CardActions>
												<Button size='small' color='primary'>
													Delete
												</Button>
												<Button size='small' color='primary'>
													Edit
												</Button>
											</CardActions>
										</Card>
									</Grid>
								))
							)}
						</Grid>
					</Container>
				</main>
			</React.Fragment>
		</>
	);
};
export default withRouter(connector(Home));
