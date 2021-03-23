import React from 'react';
import CardListItem from '../CardListItem/CardListItem';
import axios from 'axios';
require('dotenv').config();
axios.defaults.baseURL = `http://localhost:3001/`;

type cardType = {
  _id: string,
  prompt: string,
  answer: string,
}
class CardList extends React.Component<any, any> {
  constructor(props:any){
    super(props);
    this.state = { cards: []}
  }

  loadData = () => axios.get('getAllCards').then(response => { 
    try{
      this.setState({cards: response.data});
    }
    catch(err){
      throw new Error(err);
    }
  });

  loadList = () => {
    if(this.state.cards.length > 0){
      return this.state.cards.map((card: cardType, index:number) => {
        return ( 
          <div key={card._id} >
            <CardListItem 
              id={card._id} 
              prompt={card.prompt}
              answer={card.answer}
              onDelete={() => { this.loadData() }}
            />
            <hr/>
          </div>
        );
      });
    }
    else{
      return <p>Loading cards...</p>
    }
  }

  componentDidMount(){
    this.loadData();
  }

  render() {
    return (
      <div>
          {this.loadList()}
      </div>
    )
  }
}

export default CardList;