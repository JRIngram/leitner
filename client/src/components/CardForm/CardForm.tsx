import React, { useState, useEffect, ReactElement } from 'react';
import { ColouredButton, ButtonType } from '../ColouredButton/ColouredButton';
import Divider from '../Divider/Divider';
import { addCard, updateCard } from '../../utils/axios';

enum CardFormType{
  'add',
  'edit'
}

type CardFormProps = {
  afterGreenButtonClick: () => void
  onCancel: () => void
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

const CardForm = (props: CardFormProps): ReactElement => {
  const [prompt, setPrompt] =  useState('');
  const [answer, setAnswer] = useState('');
  const [loadedExistingValues, setLoadedExistingValues] = useState(false);

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
            onClickAction={async () => { 
              await addCard(prompt, answer);
              await props.afterGreenButtonClick();
            }} 
          />
        )
      case CardFormType.edit:
        return (
          <ColouredButton 
            text="edit card" 
            buttonType={ButtonType.add} 
            onClickAction={async () => {
              if(typeof props.cardId === 'string'){
                await updateCard(props.cardId, prompt, answer);
              }
              props.afterGreenButtonClick();
            }} 
          />
        )
    }
  }

  return (
    <div data-testid={`card-form`}>
      <form>
        <div>
          <label
            style={styles.labelStyle}
            data-testid='card-form-prompt-label'
            htmlFor="prompt"
          >
              Prompt
          </label>
          <input 
            data-testid='card-form-prompt-input'
            style={styles.inputStyle}
            type="text"
            value={prompt}
            onChange={event => { 
              setPrompt(event.target.value) 
            }}
            id="prompt"
          />
        </div>
        <div>
          <label 
            style={styles.labelStyle}
            data-testid='card-form-answer-label'
            htmlFor="answer"
          >
            Answer
          </label>
          <input 
            data-testid='card-form-answer-input'
            style={styles.inputStyle}
            type="text" 
            value={answer}
            onChange={event => { setAnswer(event.target.value )}}
            id="answer"
          />
        </div>
      </form>
      {renderFormButtons()}
      <ColouredButton data-testid={'card-form-cancel-button'} text="cancel" buttonType={ButtonType.default} onClickAction={() => { props.onCancel() }} />
      <Divider />
    </div>
  )
}

export { CardForm, CardFormType };