import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { authCalls } from '../api/auth/auth';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';


export const LoginPage = () => {
  // const [userName, setUserName] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  const [loginStatus, setLoginStatus] = useState<string>("failure");
  const { register, handleSubmit } = useForm({ });
  const navigate = useNavigate();

  const onSubmit = (data: any, event: any) => {
    const resp = authCalls.login(data);
    resp.then((res) => {
      setLoginStatus(res.message);
      console.log(loginStatus);
    });

    event.target.reset();

    if (loginStatus === "success") {
      console.log("success");
      // navigate('/profile');
    }
  }

  const logOut = () => {
    const resp = authCalls.logout();
    console.log(resp.then((res) => console.log(res.message)));
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

      <button onClick={logOut}>Logout</button>
      </div>
      </div>
      </div>
    </div>
  )
}
