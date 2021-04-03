import React, { useState, useEffect } from 'react';
import { ColouredButton, ButtonType } from '../ColouredButton/ColouredButton';
import AddQuiz from '../AddQuiz/AddQuiz';
import ViewQuizzes from '../ViewQuizzes/ViewQuizzes';

enum manageQuizScreens {
  'add quiz',
  'view quizzes'
}

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
  const [manageQuizScreen, setManageQuizScreen] = useState(manageQuizScreens['add quiz'])

  const renderNavButtons = () => {
    switch(manageQuizScreen){
      case manageQuizScreens['view quizzes']:
        return (
          <div>
            <ColouredButton
              buttonType={ButtonType.nav}
              text="add quiz"
              onClickAction={() => setManageQuizScreen(manageQuizScreens['add quiz'])}
            />
            <ColouredButton
              buttonType={ButtonType.navFilled}
              text="edit quizzes"
              onClickAction={() => null}
            />
          </div>
        )
      case manageQuizScreens['add quiz']:
      default:
        return (
          <div>
            <ColouredButton
              buttonType={ButtonType.navFilled}
              text="add quiz"
              onClickAction={() => null}
            />
            <ColouredButton
              buttonType={ButtonType.nav}
              text="edit quizzes"
              onClickAction={() => setManageQuizScreen(manageQuizScreens['view quizzes'])}
            />
          </div>
        )
    }
  }

  const renderSubscreen = () => {
    switch(manageQuizScreen){
      case manageQuizScreens['view quizzes']:
        return <ViewQuizzes />
      case manageQuizScreens['add quiz']:
      default:
        return <AddQuiz />
    }
  }

  return (
    <div>
      {renderNavButtons()}
      {renderSubscreen()}
    </div>
  );
}

export default ManageQuizzes;