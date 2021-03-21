import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import CardListItem from '../CardListItem/CardListItem';
import axios from 'axios';
require('dotenv').config();
axios.defaults.baseURL = `http://localhost:3001/`;

class CardList extends React.Component<any, any> {
  constructor(props:any){
    super(props);
    this.state = { cards: []}
  }

  loadData = () => axios.get('getAllCards').then(response => { 
    try{
      console.log(response.data[0]);
      this.setState({cards: response.data})
      console.log(this.state);
      console.log(this.state.cards);
      console.log(this.state.cards[0]);
      console.log(this.state.cards[0]._id);
      console.log(this.state.cards[0].prompt);
      console.log(this.state.cards[0].answer);
    }
    catch(err){
      throw new Error(err);
    }

  }); 

  componentDidMount(){
    this.loadData();
  }

  render() {
    return (
      <div>
          <p>{JSON.stringify(this.state)}</p>
          <p>Below?</p>
          <p>{this.state.cards.id}</p>
      </div>
  
    )
  }
}

export default CardList;