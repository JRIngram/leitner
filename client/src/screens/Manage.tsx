import React from 'react';
import CardList from '../components/CardList/CardList';
import { ColouredButton, ButtonType } from '../components/ColouredButton/ColouredButton';

const Manage = () => {
  return (
    <div>
      <div>
        <h1>Manage</h1>
        <p>Manage your cards and quizes</p>
      </div>
      <div>
        <ColouredButton onClickAction={() => { console.log("cards pressed") }} text="cards" buttonType={ButtonType.default} />
        <ColouredButton onClickAction={() => { console.log("quizzes pressed") }} text="quizes" buttonType={ButtonType.default} />
      </div>
      <hr/>
      <ColouredButton onClickAction={() => {console.log("add pressed")}} text='add cards' buttonType={ButtonType.add} />
      <CardList />
    </div>


  )
}

export default Manage;