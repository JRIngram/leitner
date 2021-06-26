import React, { useState } from 'react';
import Manage from '../Manage/Manage';
import Study from '../Study/Study';

const styles = {
  container: {
    marginLeft: '1%',
    marginRight: '1%',
  },
  navBarStyle: {
    backgroundColor: '#094d9b',
    display: 'block',
  },
  titleStyle: {
    display: 'inline',
    color: '#FFF',
    fontSize: 30,
    margin: '1%'
  },
  itemStyle: {
    display: 'inline',
    color: '#FFF',
    textDecoration: 'none',
    padding: 30,
    cursor: 'pointer'
  },
  activeItemStyle:{
    display: 'inline',
    color: '#FFF',
    textDecoration: 'underline',
    padding: 30,
    cursor: 'pointer',
  }
}



const ScreenContainer = () => {
  const screens = ['Study', 'Manage'];
  const [currentScreen, setCurrentScreen] = useState('');


  const renderScreen = () => {
    switch (currentScreen){
      case screens[0]:
        return <Study />
      case screens[1]:
        return <Manage />
      default:
        return <Study />
    }
  }

  return (
    <div>
      <nav style={styles.navBarStyle}>
        <p style={styles.titleStyle}>Leitner</p>
        {screens.map((screen, index) => {
          return (
            <p
              style={screen === currentScreen ? styles.activeItemStyle : styles.itemStyle}
              key={index}
              data-testid={`navbar-item-${index}`}
              onClick={
                ()=>{ setCurrentScreen(screen) }
              }
            >
              {screen}
            </p>
          )
        })}
      </nav>
      <div style={styles.container}>
        { renderScreen() }
      </div>
    </div>

  )
}

export default ScreenContainer;