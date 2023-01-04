import React, {useState, useEffect} from 'react';
import { Navbar } from '../components/Navbar';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { authCalls } from '../api/auth/auth';
import { useForm } from 'react-hook-form';

export const Profile = () => {
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({ user_name:'', email:'' });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const {register, handleSubmit} = useForm({ });


  const onSubmit = (data: any , event: any) => {
    console.log(data)
    authCalls.updatePassword(data).then((res) => {
    if (res.password_change) {
      event.target.reset();
      alert("Success! Your password has been changed.");
      setTimeout(() => window.location.reload(), 1000);
    } else {
      alert(res.message)
    }})
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

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Navbar/>
      <div className="container d-flex flex-column justify-content-center">
        <h1 className='text-center mt-5'>Welcome to your profile!</h1>
        <h3 className="text-center mt-3">Your profile details are below</h3>
        <h6 className="text-center mt-3">Email address: {userDetails.email} </h6>
        <h6 className="text-center mt-3">User name: {userDetails.user_name} </h6>
        <button onClick={() => setOpen(true)} className="btn btn-primary btn-block mx-auto mt-3">Change password</button>
        <Dialog open={open} onClose={handleClose} >
          <h3 className='text-center p-2 mt-2'>Change Password</h3>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='container'>
              <label className='me-2'>Current password:</label>
              <input {...register('current_password', {required: true})} className='form-control my-2' type='password' value={oldPassword} onChange={Event => setOldPassword(Event.target.value)}></input>
              <label>New Password</label>
              <input {...register('new_password', {required: true, minLength: 3})} className='form-control my-2' type='password' value={password} onChange={Event => setPassword(Event.target.value)}></input>
              <label className='me-2'>Confirm Password</label>
              <input {...register('confirm_new_password', {required: true, minLength: 3})} className='form-control my-2' type="password" value={confirmPassword} onChange={Event => setConfirmPassword(Event.target.value)}/>
              {error && <p className='text-danger'>Passwords do not match.</p>}
              {!error && <button className='btn btn-primary mx-auto mt-2'>Submit</button>}
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>

      </div>
    </>
  )
}
