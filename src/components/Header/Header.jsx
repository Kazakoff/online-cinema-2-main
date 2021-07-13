import React from 'react';
import style from './Header.module.css';
import Logo from './Logo/Logo';
import Menu from './Menu/Menu';
import onlineCinema from '../../onlineCinema.png'

const Header = (props) => {
    return (
        <nav className={`navbar navbar-expand-lg  ${style.header}`} >
            <Logo />
            <button className='navbar-toggler' type='button' data-toggle='collapse'
                data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent'
                aria-expanded='false' aria-label='Toggle navigation'>
                <img src={onlineCinema} alt='' style={{ width: '30px' }} />
            </button>

            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                <div className='mr-auto'></div>
                <Menu />
            </div>
        </nav>
    )
}
export default Header;