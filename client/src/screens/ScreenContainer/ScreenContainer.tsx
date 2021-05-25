import React, { useState } from 'react';
import Manage from '../Manage/Manage';

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
    padding: '10px',
    margin: '10px'
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
  const screens = ['Quizzes', 'Manage'];
  const [currentScreen, setCurrentScreen] = useState(screens[0]);


  const renderScreen = () => {
    switch (currentScreen){
      case screens[0]:
        return <p>TODO: add quizzes screen</p>
      case screens[1]:
        return <Manage />
      default:
        return <p>TODO: add quizzes screen</p>

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