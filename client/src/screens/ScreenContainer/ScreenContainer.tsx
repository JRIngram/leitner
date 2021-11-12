import React, { ReactElement, useState } from 'react';
import Manage from '../Manage/Manage';
import Study from '../Study/Study';

const styles = {
  container: {
    marginLeft: '1%',
    marginRight: '1%',
  },
  navBarStyle: {
    height: "50px",
    backgroundColor: '#094d9b',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: "centre"
  },
  titleStyle: {
    display: 'inline',
    color: '#FFF',
    fontSize: 30,
    margin: "auto",
    paddingLeft: "1%",
    paddingRight: "5%"
  },
  itemContainer: {
    width: "100%",
    display: 'flex',
    // justifyContent: 'space-evenly',
  },
  navBarItem: {
    height: "30px",
    display: 'inline',
    color: '#FFF',
    background: '#094d9b',
    textDecoration: 'none',
    padding: "20px",
    margin: "0% 5%",
    cursor: 'pointer',
    font: "14px \"Century Gothic\", Futura, sans-serif",
    border: "none",
  },
  activeNavBarItem: {
    textDecoration: 'underline',
  }
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
    let navBarButtonStyle = styles.navBarItem;
    if (screenName === currentScreen) {
      navBarButtonStyle = {
        ...navBarButtonStyle,
        ...styles.activeNavBarItem,
      }
    }
    return (
      <button
        style={
          navBarButtonStyle
        }
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
        <p style={styles.titleStyle}>Leitner</p>
        <div style={styles.itemContainer}>
          {screens.map((screen, index) => renderNavButton(screen, index))}
        </div>
      </nav>
      <div style={styles.container}>
        {renderScreen()}
      </div>
    </div>

  )
}

export default ScreenContainer;