import React, { useState } from 'react';
import Input from '../utilis/Input';
import {useDispatch} from 'react-redux'
import {login} from '../../actions/user'
const Login = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch()
    return (
        <div className='registration'>
            <h1>Login</h1>
            <Input value={email} setValue={setEmail} type='text' placeholder='' />
            <Input value={password} setValue={setPassword} type='password' placeholder='' />
            <button className='registartion_btn' onClick={()=> dispatch(login(email, password))}>Login</button>
        </div>
    )
}

export default Login;