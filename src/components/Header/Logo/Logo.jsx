import React from 'react';
import style from './Logo.module.css';
import { NavLink } from 'react-router-dom';

const Logo = (props) => {
    return (
        <div className={style.logo}>
            <NavLink to='/'><span>Online</span>Cinema</NavLink>
        </div>
    )
}
export default Logo;