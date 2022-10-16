import React, { ReactElement, useState } from 'react';
import './ScreenContainer.css';
import Manage from '../Manage/Manage';
import Study from '../Study/Study';

const styles = {
  navBarStyle: {
    height: "50px",
    backgroundColor: '#094d9b',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: "centre"
  },
}

const ScreenContainer = (): ReactElement => {
  const screens = ['Study', 'Manage'];
  const [currentScreen, setCurrentScreen] = useState(screens[0]);


  const renderScreen = () => {
    switch (currentScreen) {
      case screens[0]:
        return <Study />
      case screens[1]:
        return <Manage />
      default:
        return <Study />
    }
  }

  const renderNavButton = (screenName: string, index: number) => {
    return (
      <button
        className= {screenName === currentScreen ? 'activeNavBarItem' : 'navBarItem'}
        key={index}
        data-testid={`navbar-item-${index}`}
        onClick={
          () => { setCurrentScreen(screenName) }
        }
      >
        {screenName}
      </button>
    );
  }

  return (
    <div>
      <nav style={styles.navBarStyle}>
        <p className='titleStyle'>Leitner</p>
        <div className='itemContainer'>
          {screens.map((screen, index) => renderNavButton(screen, index))}
        </div>
      </nav>
      <div className='container'>
        {renderScreen()}
      </div>
    </div>

  )
}

export default ScreenContainer;