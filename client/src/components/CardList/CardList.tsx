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

  loadList = () => {
    if(this.state.cards.length > 0){
      return this.state.cards.map((card: cardType, index:number) => {
        console.log("boop");
        return ( 
          <div>
            <CardListItem prompt={card.prompt} answer={card.answer} />
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