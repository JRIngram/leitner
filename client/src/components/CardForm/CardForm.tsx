import React, { useState, useEffect } from 'react';
import { ColouredButton, ButtonType } from '../ColouredButton/ColouredButton';
import Divider from '../Divider/Divider';
import axios from 'axios';
axios.defaults.baseURL = `http://localhost:3001/`;

enum CardFormType{
  'add',
  'edit'
}

type CardFormProps = {
  afterGreenButtonClick: Function
  onCancel: Function
  formType: CardFormType
  cardId?: string
  cardPrompt?: string
  cardAnswer?: string
}

const styles = { 
  labelStyle: {
    display: 'block'
  },
  inputStyle: {
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid',
    padding: '10px',
    marginBottom: '10px',
  }
}

const CardForm = (props: CardFormProps) => {
  const [prompt, setPrompt] =  useState('');
  const [answer, setAnswer] = useState('');
  const [loadedExistingValues, setLoadedExistingValues] = useState(false);

  const addCard = () => {
    axios({
      method: 'post',
      url: 'addCard',
      data: {
        prompt,
        answer
      }
    });
  }

  const updateCard = () => {
    const id = props.cardId;
    axios({
      method: 'post',
      url: 'updateCard',
      data: {
        id,
        prompt,
        answer
      }
    });
  }

  useEffect(() => {
    if(!loadedExistingValues){
      typeof props.cardPrompt !== 'undefined' ? setPrompt(props.cardPrompt) : setPrompt('');
      typeof props.cardAnswer !== 'undefined' ? setAnswer(props.cardAnswer) : setAnswer('');
      setLoadedExistingValues(true);
    }
  }, [loadedExistingValues, props.cardPrompt, props.cardAnswer])

  const renderFormButtons = () => {
    const formType = props.formType
    switch(formType){
      case CardFormType.add:
        return (
          <ColouredButton 
            text="add card" 
            buttonType={ButtonType.add} 
            onClickAction={() => { 
              addCard();
              props.afterGreenButtonClick();
            }} 
          />
        )
      case CardFormType.edit:
        return (
          <ColouredButton 
            text="edit card" 
            buttonType={ButtonType.add} 
            onClickAction={() => { 
              updateCard();
              props.afterGreenButtonClick();
            }} 
          />
        )
    }
  }

  return (
    <div>
      <form>
        <div>
          <label style={styles.labelStyle}>Prompt</label>
          <input 
            style={styles.inputStyle}
            type="text"
            value={prompt}
            onChange={event => { 
              setPrompt(event.target.value) 
            }}
          />
        </div>
        <div>
          <label style={styles.labelStyle}>Answer</label>
          <input 
            style={styles.inputStyle}
            type="text" 
            value={answer}
            onChange={event => { setAnswer(event.target.value )}}
          />
        </div>
      </form>
      {renderFormButtons()}
      <ColouredButton text="cancel" buttonType={ButtonType.default} onClickAction={() => { props.onCancel() }} />
      <Divider />
    </div>
  )
}

export { CardForm, CardFormType };