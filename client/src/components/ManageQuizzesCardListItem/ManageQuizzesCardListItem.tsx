import React from 'react';
import Divider from '../Divider/Divider';

type  ManageQuizzesCardListItemProps = {
  id: string,
  prompt: string,
  answer: string,
  handleCheckChange: Function,
}

const styles = {
  checkboxContainer: {
    display: 'inline-block'
  },
  paragraphContainer: {
    display: 'inline-block',
    marginLeft: '20px'
  }
}


const ManageQuizzesCardListItem = (props: ManageQuizzesCardListItemProps) => {

  return (
    <div>
      <div style={styles.checkboxContainer}>
        <label htmlFor="add card">Add Card</label>
        <input 
          type="checkbox"
          id="add card"
          onChange={
            (e) => {props.handleCheckChange(e.target.checked, props.id)}
          }/>
      </div>
      <div style={styles.paragraphContainer}>
        <p>Prompt: {props.prompt}</p>
        <p>Answer: {props.answer}</p>
      </div>
    </div>
  );
}

export default ManageQuizzesCardListItem;