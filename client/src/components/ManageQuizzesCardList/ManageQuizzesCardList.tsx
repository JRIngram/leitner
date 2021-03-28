import React, { useState, useCallback, useEffect } from 'react';
import { getAllCards } from '../../utils/axios';
import ManageQuizzesCardListItem from '../ManageQuizzesCardListItem/ManageQuizzesCardListItem';
import Divider from '../Divider/Divider';

type cardType = {
  _id: string,
  prompt: string,
  answer: string,
}

type ManageQuizzesCardListProps = {
  handleCheckChange: Function
}

const ManageQuizzesCardList = (props: ManageQuizzesCardListProps) => {
  const [cards, setCards] = useState<cardType[]>([]);

  const loadData = useCallback(() => getAllCards().then(response => { 
    console.log("Requesting data");
    try{
      setCards(response.data);
    }
    catch(err){
      throw new Error(err);
    }
  }), []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const loadList = () => {
    if(cards.length > 0){
      return cards.map((card: cardType, index:number) => {
        return ( 
          <div key={card._id} >
            <ManageQuizzesCardListItem 
              id={card._id} 
              prompt={card.prompt}
              answer={card.answer}
              handleCheckChange={props.handleCheckChange}
            />
            <Divider />
          </div>
        );
      });
    }
    else{
      return <p>Loading cards...</p>
    }
  }

  return (
    <div>
      {loadList()}
    </div>
  )
}

export default ManageQuizzesCardList;