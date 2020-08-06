import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect, ConnectedProps } from 'react-redux';
import { SUBBMIT_POST } from '../auctions';
interface RootState {
	auth: any;
}

const mapState = (state: RootState) => ({
	...state["auth"],
});
const mapDispatch = {
	sumbbmitPost: (data: any) => ({ type:SUBBMIT_POST , payload: data }),
	showMessage: (data:any)=> ({type:"SHOW_MESSAGE",payload:data})
};
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const PostDialog = (props: PropsFromRedux) => {

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onPost=()=>{
if(title === "" || description=== ""){
    props.showMessage({
        msg:"Please Enter all the fields",
        type:"error"
    })
}else{
    props.sumbbmitPost({authUser:props.authUser,title:title,description:description})
handleClose()
}
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
				+ Add Post
			  </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Post</DialogTitle>
        <DialogContent>
          <DialogContentText>

          </DialogContentText>
          <TextField
            autoFocus
            value={title}
            onChange={(event)=>setTitle(event.target.value)}
            margin="dense"
            id="title"
            label="Title"
            type="string"
            fullWidth
          />
          <TextField
            margin="dense"
            value={description}
            onChange={(event)=>setDescription(event.target.value)}
            id="description"
            label="Description"
            type="string"
            multiline
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>onPost()} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default connector(PostDialog);
