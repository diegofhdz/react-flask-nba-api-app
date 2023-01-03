import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { authCalls } from '../api/auth/auth';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';


export const LoginPage = () => {
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const { register, handleSubmit } = useForm({ });
  const navigate = useNavigate();

  // const {isAuth, setAuth} = useContext(isAuthed);

  useEffect(() => {
    const response = authCalls.checkLogin();
    response.then((res) => setLoginStatus(res.message));
  } , [])

  const onSubmit = (data: any, event: any) => {
    const resp = authCalls.login(data);
    resp.then((res) => {
      setLoginStatus(res.message);
      navigate('/')
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label className='my-2'>Username</label>
        <input {...register('user_name', {required: true})} type="text" name='user_name' className='form-control'/>
        </div>
        <div className="form-group">
        <label className='my-2'>Password</label>
        <input {...register('password', {required: true})} type="text" name='password' className='form-control'/>
        </div>
        <button className='btn btn-primary mt-4 btn-block' type="submit">Submit</button>
      </form>

      <button className='btn btn-secondary mt-4 btn-block' onClick={logOut}>Logout</button>
      <p>Don't have an account? Register here</p>
      <button className='btn btn-info btn-block'>Register</button>
      {(loginStatus) ? (<h1>Logged in</h1>) : (<h1>Not Logged In</h1>)}
      
      </div>
      </div>
      </div>
    </div>
  )
}
