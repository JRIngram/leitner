import React from 'react';
import CardList from '../components/CardList/CardList';

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
    </div>


  )
}

export default Manage;