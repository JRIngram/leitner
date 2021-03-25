import React, { useState } from 'react';

type ColouredButtonProps = {
  text: string
  buttonType: ButtonType
  onClickAction: Function
}

enum ButtonType{
  'default',
  'delete',
  'add'
}

const ColouredButtonStyle = {
  border: 'none',
  borderRadius: '5px',
  fontSize: '14px',
  padding: '8px 20px',
  margin: '5px 2px',
  cursor: 'pointer',
}

/** Default button styling */
const DefaultButtonNormal = {
  border: '2px #CCC solid',
  backgroundColor: '#CCC',
  color: '#000'
}

const DefaultButtonHover = {
  border: '2px #666 solid',
}

const DefaultButtonClick = {
  border: '2px #666 solid',
  backgroundColor: '#666'
}

/** Delete button styling */
const DeleteButtonNormal = {
  backgroundColor: '#FBB',
  border: '2px #FBB solid',
  color: '#A00',
}

const DeleteButtonHover = {
  border: '2px #F55 solid'
}

const DeleteButtonClick = {
  border: '2px #F55 solid',
  backgroundColor: '#F55'
}

/** Add button stylig */
const AddButtonNormal ={
  backgroundColor: '#9D9',
  border: '2px #9D9 solid',
  color: '#050',
}

const AddButtonHover ={
  backgroundColor: '#9D9',
  border: '2px #6A6 solid',
  color: '#050',
}

const AddButtonClick ={
  backgroundColor: '#6A6',
  border: '2px #6A6 solid',
  color: '#050',
}

const ColouredButton = (props: ColouredButtonProps) => {
  const [actionStyle, setActionStyle] = useState('default')

  const renderButtonStyle = (buttonStyle: ButtonType) => {
    if(actionStyle === 'default'){
      switch (buttonStyle){
        case ButtonType.delete:
          return (
            {
              ...ColouredButtonStyle, 
              ...DeleteButtonNormal
            }
          );
        
        case ButtonType.add:
          return (
            {
              ...ColouredButtonStyle, 
              ...AddButtonNormal
            }
          );

        case ButtonType.default:
        default:
          return (
            {
              ...ColouredButtonStyle,
              ...DefaultButtonNormal,
            }
          );
      }
    }
    else if(actionStyle === 'hover'){
      switch (buttonStyle){
        case ButtonType.delete:
          return (
            {
              ...ColouredButtonStyle, 
              ...DeleteButtonNormal,
              ...DeleteButtonHover,
            }
          );

        case ButtonType.add:
          return (
            {
              ...ColouredButtonStyle, 
              ...AddButtonNormal,
              ...AddButtonHover
            }
          );
        
        case ButtonType.default:
        default:
          return (
            {
              ...ColouredButtonStyle,
              ...DefaultButtonNormal,
              ...DefaultButtonHover,
            }
          );
      }
    }
    else if(actionStyle === 'click'){
      switch (buttonStyle){
        case ButtonType.delete:
          return (
            {
              ...ColouredButtonStyle, 
              ...DeleteButtonNormal,
              ...DeleteButtonClick,
            }
          );

        case ButtonType.add:
          return (
            {
              ...ColouredButtonStyle, 
              ...AddButtonNormal,
              ...AddButtonClick
            }
          );
        
        case ButtonType.default:
        default:
          return (
            {
              ...ColouredButtonStyle,
              ...DefaultButtonNormal,
              ...DefaultButtonClick
            }
          );
      }      
    }
    return {};
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