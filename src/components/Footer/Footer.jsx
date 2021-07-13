import React from 'react';
import style from './Footer.module.css'
import onlineCinema from '../../onlineCinema.png'

const Footer = (props) => {
  return (
    <footer className={style.footer}>
      <p><img src={onlineCinema} alt='' style={{ width: '30px' }} /><span>Online</span>Cinema</p>
    </footer>
  )
}
export default Footer;