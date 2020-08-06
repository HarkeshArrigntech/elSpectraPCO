import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { connect, ConnectedProps } from 'react-redux';
import { CREATE_USER } from '../auctions';
interface RootState {
	auth: any;
}

const mapState = (state: RootState) => ({
	...state["auth"],
});
const mapDispatch = {
	addUsers: (data: any) => ({ type:CREATE_USER , payload: data }),
	showMessage: (data:any)=> ({type:"SHOW_MESSAGE",payload:data})
};
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const AddUsers = (props: PropsFromRedux) => {
    const [open, setOpen] = React.useState(false);
  const [emailId, setEmailId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onAddUsers=()=>{
if(emailId === "" || userName=== ""){
    props.showMessage({
        msg:"Please Enter all the fields",
        type:"error"
    })
}else{
    if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(emailId)){
        let tenantNameReq = emailId.slice(
            emailId.indexOf("@") + 1,
            emailId.indexOf(".com"),
        );
if(tenantNameReq !== props.userDeatils.tenantName){
    props.showMessage({
        msg:"Please Enter valid tenant name",
        type:"error"
    })
}else{

    props.addUsers({authUser:props.authUser,userName:userName,emailId:emailId})
}
    }else{
        props.showMessage({
            msg:"Please Enter valid Email Id",
            type:"error"
        })
    }
}
  }

  return (
    <div>
    <text onClick={handleClickOpen}>
              Add Users
            </text>
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">User Details</DialogTitle>
      <DialogContent>
        <DialogContentText>

        </DialogContentText>
        <TextField
          autoFocus
          style={{marginBottom:"20px"}}
          value={emailId}
          onChange={(event)=>setEmailId(event.target.value)}
          id="emailId"
          required
          label="Email Id"
          type="string"
          fullWidth
          variant='outlined'
        />
        <TextField
          variant='outlined'
          required
          value={userName}
          onChange={(event)=>setUserName(event.target.value)}
          id="username"
          label="User Name"
          type="string"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={()=>onAddUsers()} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  );
}
export default connector(AddUsers);
