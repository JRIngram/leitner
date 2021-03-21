import React from 'react';
import ReactDOM from 'react-dom';

const navBarStyle = {
  backgroundColor: '#094d9b',
  display: 'block',
}

const titleStyle = {
  display: 'inline',
  color: '#FFF',
  fontSize: 30,
}

const itemStyle = {
  display: 'inline',
  color: '#FFF',
  textDecoration: 'none',
  padding: 30,
}

const items = ['Quizes', 'Manage'];

const Navbar = () => {
  return (
    <nav style={navBarStyle}>
      <p style={titleStyle}>Leitner</p>
      {items.map((itemName, index) => {
        return <a key={index} href="" style={itemStyle}>{itemName}</a>
      })}
    </nav>
  )
}

export default Navbar;