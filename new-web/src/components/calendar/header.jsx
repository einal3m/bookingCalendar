import React from 'react';
import './header.css';
import header from '../../images/header.jpg';


export default function Header() {
  return (
    <div className='header'>
      <img src={header} alt='' />
    </div>
  );
}
