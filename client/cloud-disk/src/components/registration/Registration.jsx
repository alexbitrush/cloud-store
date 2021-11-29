import React, { useState } from 'react';
import Input from '../utilis/Input';
import {registration} from '../../actions/user'

const Registration = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className='registration'>
            <h1>Registration</h1>
            <Input value={email} setValue={setEmail} type='text' placeholder='' />
            <Input value={password} setValue={setPassword} type='password' placeholder='' />
            <button className='registartion_btn' onClick={() => registration(email, password) }>Registration</button>
        </div>
    )
}

export default Registration;