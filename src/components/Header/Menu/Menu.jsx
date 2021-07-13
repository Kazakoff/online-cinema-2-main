import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../../store/actions/authActions';
import { getRole, getUid } from '../../../store/selectors';

const Menu = (props) => {

    const dispatch = useDispatch()
    const uid = useSelector(getUid)
    const role = useSelector(getRole)

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {uid ?
                <>
                    {
                        role === 'admin' &&
                        <>
                            <NavLink to='/admin_movies' activeClassName='navlink active'
                                className='navlink'>Manage Movies</NavLink>
                            <NavLink to='/admin_users' activeClassName='navlink active'
                                className='navlink'>Manage Users</NavLink>
                        </>
                    }
                    {
                        role === 'user' &&
                        <>
                            <NavLink to='/booking' activeClassName='navlink active'
                                className='navlink'>Booking</NavLink>
                            <NavLink to='/settings' activeClassName='navlink active'
                                className='navlink'>Settings</NavLink>
                        </>
                    }
                    <NavLink to='/' className={`btn whiteBtn`} onClick={() => dispatch(signOut())}>Sign Out</NavLink>
                </>
                :
                <>

                    <NavLink to='/sign_up' className='btn' style={{ marginRight: '7px' }}>Sign Up</NavLink>
                    <NavLink to='/sign_in' className='btn whiteBtn'>Sign In</NavLink>

                </>}
        </div >
    )
}

export default Menu;