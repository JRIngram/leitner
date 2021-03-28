import React, { useState } from 'react';
import { ColouredButton, ButtonType } from '../ColouredButton/ColouredButton';
import Divider from '../Divider/Divider';

const styles = { 
  labelStyle: {
    display: 'block'
  },
  inputStyle: {
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid',
    padding: '10px',
    marginBottom: '10px',
  }
}

const ManageQuizzes = () => {
  return (
    <div>
      <ColouredButton
        buttonType={ButtonType.navFilled}
        text="add quiz"
        onClickAction={() => true}
      />
      <h2>Add a Quiz</h2>
      <form>
        <div>
          <label style={styles.labelStyle} htmlFor="quizName">Quiz Name</label>
          <input style={styles.inputStyle} type="text" id="quizName"/>
        </div>
        <div>
          <label style={styles.labelStyle} htmlFor="quizDescription">Description</label>
          <input style={styles.inputStyle} type="text" id="quizDescription"/>
        </div>
      </form>
      <Divider />
    </div>
  );
}

export default ManageQuizzes;