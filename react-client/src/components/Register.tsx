import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { authCalls } from '../api/auth/auth';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);
    const [password1, setPassword1] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const {register, handleSubmit} = useForm({});
    const navigate = useNavigate();

    useEffect(() => {
        if (password1 === password2) {
            setPasswordsMatch(true);
        } else {
            setPasswordsMatch(false);
        }
    }, [password1, password2])

    const onSubmit = (data: any, event: any) => {
        authCalls.registerUser(data).then((res)=> {
            console.log(res);
            if (res.message) {
                console.log('User registered');
                alert("Successfully registered!")
                navigate('/profile');
                event.target.reset();
            } else {
                event.target.reset();
                alert('User or email already exists');
            }
        })
    }

  return (
    <>
    <div className="container">
        <h1 className="text-center p-3 m-3">Register Below!</h1>
        <div className="d-flex flex-column justify-content-center align-items-center col-5 mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className='form-control p-5'>
                <h5 className='text-center'>Enter your details below</h5>
                <div className="form-group">
                    <label className='p-1' htmlFor="email">Enter your email address: </label>
                    <input {...register('email',{required: true, minLength: 3})} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label className='p-1' htmlFor="user_name">Enter a username: </label>
                    <input {...register('user_name',{required: true, minLength: 3})} type="text" className="form-control" id="user_name" placeholder="Username" />
                </div>
                <div className="form-group">
                    <label className='p-1' htmlFor="password">Enter a password: </label>
                    <input {...register('password',{required: true, minLength: 3})} type="password" className="form-control" id="password" placeholder="Password" value={password1} onChange={Event => setPassword1(Event.target.value)} />
                    <label className='p-1' htmlFor="password_confirm">Confirm password: </label>
                    <input type="password" className="form-control" id="password_confirm" placeholder="Confirm Password" value={password2} onChange={Event => setPassword2(Event.target.value)}/>
                </div>

                {passwordsMatch ? <button  type="submit" className="btn btn-primary my-3">Submit</button> : <><button type="submit" className="btn btn-primary my-3" disabled>Submit</button><p className='text-danger'>Passwords do not match</p></>}
            </form>
        </div>
    </div>
    </>
  )
}
