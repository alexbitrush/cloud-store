import React from 'react';
import './navbar.css';
import logo from '../../assets/img/folder.svg';
import {NavLink} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../../reducers/userReducers'
const Navbar = () =>{
    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch()
    return(
        <div className='navbar'>
            <div className='container'>
            <img src={logo} alt='' className='' />

            <div className='navbar_header'>MernCloud</div>
            {!isAuth && <div className="navbar_login"><NavLink to='/login'>Login</NavLink></div>}
            {!isAuth && <div className='navbar_registartion'><NavLink to='/registartion'>Registartion</NavLink></div>}
            {isAuth && <div className='navbar_login' onClick={() => dispatch(logout())}><NavLink to='/registartion'>Exit</NavLink></div>}
            </div>
        </div>
    )
}

export default Navbar;