import React from 'react';
import ReactDOM from 'react-dom';
import CardList from '../components/CardList/CardList';
import CardListItem from '../components/CardListItem/CardListItem';

const Manage = () => {
  return (
    <div>
      <div>
        <h1>Manage</h1>
        <p>Manage your cards and quizes</p>
      </div>
      <div>
        <button>Cards</button>
        <button>Quizes</button>
      </div>
      <CardList />
      <CardListItem prompt="HELLO THERE" answer="GOODBYE THERE" />
      <hr/>
      <CardListItem prompt="Hi lucy :)" answer="I love you! :)" />
      <hr/>
      <CardListItem prompt="HELLO THERE" answer="GOODBYE THERE" />
      <hr/>
      <CardListItem prompt="HELLO THERE" answer="GOODBYE THERE" />
    </div>


  )
}

export default Manage;