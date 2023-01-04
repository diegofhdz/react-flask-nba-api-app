import React, { useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { authCalls } from '../api/auth/auth';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';

// Todo: Update change username, delete account, and home page
export const LoginPage = () => {
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const { register, handleSubmit } = useForm({ });
  const navigate = useNavigate();
  

  useEffect(() => {
    const response = authCalls.checkLogin();
    response.then((res) => setLoginStatus(res.message));
  } , [])

  const onSubmit = (data: any, event: any) => {
    const resp = authCalls.login(data);
    resp.then((res) => {
      setLoginStatus(res.message);
      navigate('/profile')
    });

    event.target.reset();
  }

  const logOut = () => {
    authCalls.logout();
    setLoginStatus(false)
    navigate('/');
  }
  
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
      <h1 className='text-center mb-3'>Login Here</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
      <form onSubmit={handleSubmit(onSubmit)} className="form-control p-3">
        <div className="form-group">
          <label className='my-2'>Username</label>
        <input {...register('user_name', {required: true})} type="text" name='user_name' className='form-control'/>
        </div>
        <div className="form-group">
        <label className='my-2'>Password</label>
        <input {...register('password', {required: true})} type="password" name='password' className='form-control'/>
        </div>
        <button className='btn btn-primary mt-4 btn-block' style={{width: "100px", height: "40px"}} type="submit">Submit</button>
      </form>

      {/* <button className='btn btn-secondary mt-4 btn-block' onClick={logOut}>Logout</button> */}
      <div className="d-flex flex-column">
        <label className='mt-3 me-3' >Don't have an account? Register here</label>
        <a className='me-auto'  href="/register"><button className='btn btn-info mt-1 mx-auto text-light' style={{width: "100px", height: "40px"}}>Register</button></a>
      </div>

      {(loginStatus) ? (<h1>Logged in</h1>) : (<h1>Not Logged In</h1>)}
      
      </div>
      </div>
      </div>
    </div>
  )
}
