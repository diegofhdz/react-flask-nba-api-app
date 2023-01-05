import React, {useState, useEffect} from 'react';
import { Navbar } from '../components/Navbar';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import { authCalls } from '../api/auth/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [openUsernameDialog, setOpenUsernameDialog] = useState(false);
  const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false);
  const [userDetails, setUserDetails] = useState({ user_name:'', email:'' });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const passwordForm = useForm({ });
  const emailForm = useForm({ });
  const usernameForm = useForm({ });
  const deleteAccountForm = useForm({ });
  const navigate = useNavigate();


  const onSubmitPassword = (data: any , event: any) => {
    console.log(data);
    authCalls.updatePassword(data).then((res) => {
    if (res.password_change) {
      event.target.reset();
      alert("Success! Your password has been changed.");
      setTimeout(() => window.location.reload(), 1000);
    } else {
      alert(res.message)
    }})
  };

  const onEmailSubmit = (data: any , event: any) => {
    authCalls.updateEmail(data).then((res) => {
    if (res.email_change) {
      event.target.reset();
      alert("Success! Your email has been changed.");
      setTimeout(() => window.location.reload(), 1000);
    } else {
      alert("Wrong password or email already in use.")
    }})
  };

  const onUsernameSubmit = (data: any , event: any) => {
    authCalls.updateUsername(data).then((res) => {
    if (res.username_change) {
      event.target.reset();
      alert("Success! Your username has been changed.");
      setTimeout(() => window.location.reload(), 1000);
    } else {
      alert("Wrong password or username already in use.")
    }})
  };

  const onDeleteAccountSubmit = (data: any , event: any) => {
    authCalls.deleteUser(data).then((res) => {
    if (res.account_delete) {
      event.target.reset();
      alert("Your account has been deleted.");
      navigate('/');
    } else {
      alert("Wrong password.")
    }});
  };

  useEffect(() => {
    if (password !== confirmPassword) {
      setError(true);
    } else {
      setError(false);
    }
    }, [password, confirmPassword]);


  useEffect(() => {
    const response = authCalls.getUserDets();
    response.then((res) => setUserDetails(res));
  }, [])

  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
  }

  const handleCloseEmailDialog = () => {
    setOpenEmailDialog(false);
  }

  const handleCloseUsernameDialog = () => {
    setOpenUsernameDialog(false);
  }

  const handleCloseDeleteDialog = () => {
    setOpenDeleteAccountDialog(false);
  }

  return (
    <>
      <Navbar/>
      <div className="container d-flex flex-column justify-content-center">
        <h1 className='text-center mt-5'>Welcome to your profile!</h1>
        <h3 className="text-center mt-3">Your profile details are below</h3>
        <h6 className="text-center mt-3">Email address: {userDetails.email} </h6>
        <h6 className="text-center mt-3">User name: {userDetails.user_name} </h6>
        <div className='container d-flex'>
        <button onClick={() => setOpenEmailDialog(true)} style={{width: "160px"}} className="btn btn-primary btn-block mx-auto mt-3">Change Email</button>
        <button onClick={() => setOpenPasswordDialog(true)} style={{width: "160px"}} className="btn btn-primary btn-block mx-auto mt-3">Change password</button>
        <button onClick={() => setOpenUsernameDialog(true)} style={{width: "160px"}} className="btn btn-primary btn-block mx-auto mt-3">Change username</button>
        </div>

        <div className='container d-flex'> 
        <div style={{width: "160px"}}></div>
        <button className="btn btn-danger btn-block mx-auto mt-3" style={{width: "160px"}} onClick={() => setOpenDeleteAccountDialog(true)}>Delete Account</button>
        <div style={{width: "160px"}}></div>
        </div>.
        
        <Dialog open={openPasswordDialog} onClose={handleClosePasswordDialog} >
          <h3 className='text-center p-2 mt-2'>Change Password</h3>
          <DialogContent>
            <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} >
              <div className='container'>
              <label className='me-2'>Current password:</label>
              <input {...passwordForm.register('current_password', {required: true})} className='form-control my-2' type='password' value={oldPassword} onChange={Event => setOldPassword(Event.target.value)}></input>
              <label>New Password</label>
              <input {...passwordForm.register('new_password', {required: true, minLength: 3})} className='form-control my-2' type='password' value={password} onChange={Event => setPassword(Event.target.value)}></input>
              <label className='me-2'>Confirm Password</label>
              <input {...passwordForm.register('confirm_new_password', {required: true, minLength: 3})} className='form-control my-2' type="password" value={confirmPassword} onChange={Event => setConfirmPassword(Event.target.value)}/>
              {error && <p className='text-danger'>Passwords do not match.</p>}
              {!error && <button type='submit' className='btn btn-primary mx-auto mt-2'>Submit</button>}
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePasswordDialog}>Close</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openUsernameDialog} onClose={handleCloseUsernameDialog} >
          <h3 className='text-center p-2 mt-2'>Change Username</h3>
          <DialogContent>
            <form onSubmit={usernameForm.handleSubmit(onUsernameSubmit)}>
              <div className='container'>
              <label>New Username</label>
              <input {...usernameForm.register('new_user_name', {required: true, minLength: 3})} className='form-control my-2' type='text'/>
              <label className='me-2'>Current password:</label>
              <input {...usernameForm.register('password', {required: true})} className='form-control my-2' type='password' />
              <button type='submit' className='btn btn-primary mx-auto mt-2'>Submit</button>
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUsernameDialog}>Close</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openEmailDialog} onClose={handleCloseEmailDialog} >
          <h3 className='text-center p-2 mt-2'>Change Email</h3>
          <DialogContent>
            <form onSubmit={emailForm.handleSubmit(onEmailSubmit)}>
              <div className='container'>
              <label className='me-2'>New Email Address:</label>
              <input {...emailForm.register('new_email', {required: true})} className='form-control my-2' type='email' placeholder='Enter new email'/>
              <input {...emailForm.register('password', {required: true})} className='form-control my-2' type='password' placeholder='Enter password'/>
              <button type='submit' className='btn btn-primary mx-auto mt-2'>Submit</button>
              </div>
            </form>
          </DialogContent>
          <DialogActions>
          <Button onClick={handleCloseEmailDialog}>Close</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={openDeleteAccountDialog} onClose={handleCloseDeleteDialog}>
            <h3 className='text-center p-2 mt-2'>Delete Account</h3>
            <DialogContent>
              <form onSubmit={deleteAccountForm.handleSubmit(onDeleteAccountSubmit)}>
                <label className='me-2'>Enter password to confirm deletion:</label>
                <input {...deleteAccountForm.register('password', {required: true})} className='form-control my-2' type='password' placeholder='Enter password'/>
                <button type='submit' className='btn btn-danger mx-auto mt-2'>Delete Account</button>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog}>Close</Button>
            </DialogActions>
          </Dialog>


      </div>
    </>
  )
}

