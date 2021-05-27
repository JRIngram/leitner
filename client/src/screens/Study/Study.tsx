import React from 'react';
import { ColouredButton, ButtonType } from '../../components/ColouredButton/ColouredButton';
import Divider from '../../components/Divider/Divider';

const Study = () => {
  return (
    <div>
      <h1>Study</h1>
      <p>Study using your created flashcards and quizzes.</p>
      <div>
        <h2>Quizzes</h2>
        <p>Example quiz 1</p>
        <p>Here I describe the quiz</p>
        <ColouredButton text="start quiz" buttonType={ButtonType.nav} onClickAction={() => {}}/>
        <Divider />
        <p>Example quiz 1</p>
        <p>Here I describe the quiz</p>
        <ColouredButton text="start quiz" buttonType={ButtonType.nav} onClickAction={() => {}}/>
        <Divider />
        <p>Example quiz 1</p>
        <p>Here I describe the quiz</p>
        <ColouredButton text="start quiz" buttonType={ButtonType.nav} onClickAction={() => {}}/>
        <Divider />
      </div>
    </div>

  )
}

export default Study;