import React, { useState } from 'react';

type  ManageQuizzesCardListItemProps = {
  id: string,
  prompt: string,
  answer: string,
  handleCheckChange: Function,
  checked: boolean
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
  const [isChecked, setIsChecked] = useState(props.checked);
  const testId = `manage-quiz-card-list-item-${props.id}`

  return (
    <div data-testid={testId}>
      <div style={styles.checkboxContainer}>
        <label 
          htmlFor={`add card ${props.id}`}
          data-testid={`${testId}-checkbox-label`}
        >
          Add Card
        </label>
        <input 
          data-testid={`${testId}-checkbox-${isChecked}`}
          type="checkbox"
          id={`add card ${props.id}`}
          checked={isChecked}
          onChange={
            (e) => {
              setIsChecked(e.target.checked)
              props.handleCheckChange(e.target.checked, props.id)
            }
          }/>
      </div>
      <div style={styles.paragraphContainer}>
        <p data-testid={`${testId}-prompt`}>Prompt: {props.prompt}</p>
        <p data-testid={`${testId}-answer`}>Answer: {props.answer}</p>
      </div>
    </div>
  );
}

export default ManageQuizzesCardListItem;