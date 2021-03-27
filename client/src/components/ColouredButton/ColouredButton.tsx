import React, { useState } from 'react';

type ColouredButtonProps = {
  text: string
  buttonType: ButtonType
  onClickAction: Function
}

enum ButtonType{
  'add',
  'delete',
  'default',
  'nav',
  'navFilled'
}

const colouredButtonStyle = {
  border: 'none',
  borderRadius: '5px',
  fontSize: '14px',
  padding: '8px 20px',
  margin: '5px 2px',
  cursor: 'pointer',
}

const defaultButtonNormalStyle = {
  ...colouredButtonStyle,
  border: '2px #CCC solid',
  backgroundColor: '#CCC',
  color: '#000'
}

const addButtonNormalStyle ={
  ...colouredButtonStyle,
  backgroundColor: '#9D9',
  border: '2px #9D9 solid',
  color: '#050',
}


const deleteButtonNormalStyle = {
  ...colouredButtonStyle,
  backgroundColor: '#FBB',
  border: '2px #FBB solid',
  color: '#A00',
}

const navButtonNormalStyle = {
  ...colouredButtonStyle,
  backgroundColor: '#78B3F7',
  border: '2px #78B3F7 solid',
  color: '#094d9b'
}

const navButtonFilledStyle = {
  ...navButtonNormalStyle,
  border: '2px #094d9b solid',
  backgroundColor: '#094d9b',
  color: '#FFF'
}

const styles ={
  default: {
    defaultButtonHover: {
      ...defaultButtonNormalStyle,
      border: '2px #666 solid',
    },
    defaultButtonClick: {
      ...defaultButtonNormalStyle,
      border: '2px #666 solid',
      backgroundColor: '#666'
    }
  },
  add: {
    addButtonHover: {
      ...addButtonNormalStyle,
      backgroundColor: '#9D9',
      border: '2px #6A6 solid',
      color: '#050',
    },
    addButtonClick: {
      ...addButtonNormalStyle,
      backgroundColor: '#6A6',
      border: '2px #6A6 solid',
      color: '#050',
    }
  },
  delete: {
    deleteButtonHover: {
      ...deleteButtonNormalStyle,
      border: '2px #F55 solid'
    },
    deleteButtonClick: {
      ...deleteButtonNormalStyle,
      border: '2px #F55 solid',
      backgroundColor: '#F55'
    }
  },
  nav: {
    navButtonHover: {
      ...navButtonNormalStyle,
      border: '2px #094d9b solid',
    },
    navButtonClick: {
      ...navButtonFilledStyle
    }
  },
  navFilled: {
    navFilledButtonHover: {
      ...navButtonFilledStyle,
      backgroundColor: '#78B3F7',
      color: '#094d9b'

    },
    navFilledButtonClick: {
      ...navButtonFilledStyle,
      backgroundColor: '#78B3F7',
      border: '2px #78B3F7 solid',
      color: '#094d9b'
    }
  }
}

const ColouredButton = (props: ColouredButtonProps) => {
  const [actionStyle, setActionStyle] = useState('default')

  const renderButtonStyle = (buttonStyle: ButtonType) => {
    switch(buttonStyle){
      case ButtonType.add:
        const {addButtonClick, addButtonHover} = styles.add;
        if(actionStyle === 'hover'){
          return ({...addButtonHover});
        }
        else if(actionStyle === 'click'){
          return ({...addButtonClick});
        }
        return ({...addButtonNormalStyle});
      case ButtonType.delete:
        const {deleteButtonClick, deleteButtonHover} = styles.delete;
        if(actionStyle === 'hover'){
          return ({...deleteButtonHover});
        }
        else if(actionStyle === 'click'){
          return ({...deleteButtonClick});
        }
        return ({...deleteButtonNormalStyle});
      case ButtonType.nav:
        const {navButtonClick, navButtonHover} = styles.nav;
        if(actionStyle === 'hover'){
          return({...navButtonHover})
        }
        else if(actionStyle === 'click'){
          return({...navButtonClick})
        }
        return ({...navButtonNormalStyle});
      case ButtonType.navFilled:
        const { navFilledButtonClick, navFilledButtonHover } = styles.navFilled;
        if(actionStyle === 'hover'){
          return({...navFilledButtonHover});
        }
        else if(actionStyle === 'click'){
          return({...navFilledButtonClick});
        }
        return({...navButtonFilledStyle});
      case ButtonType.default:
      default:
        const {defaultButtonClick, defaultButtonHover} = styles.default;
        if(actionStyle === 'hover'){
          return ({...defaultButtonHover});
        }
        else if(actionStyle === 'click'){
          return ({...defaultButtonClick});
        }
        return ({...defaultButtonNormalStyle});
    }
  }

  return(
    <button 
      data-testid={`coloured-button-${props.text.toLowerCase().replace(/\s/g, '-')}`}
      style={renderButtonStyle(props.buttonType)} 
      onMouseLeave={() => {setActionStyle('default')}}
      onMouseUp={() => {setActionStyle('hover')}}
      onMouseOver={() =>{setActionStyle('hover')}}
      onMouseDown={() => {setActionStyle('click')}}
      onClick={() => { return props.onClickAction() }}
    >
      {props.text}
    </button>
  )
}

export {ColouredButton, ButtonType};