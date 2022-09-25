import React, { ReactElement, useState } from 'react';
import { ColouredButton, ButtonType } from '../ColouredButton/ColouredButton';
import AddQuiz from '../AddQuiz/AddQuiz';
import AmendQuizzes from '../AmendQuizzes/AmendQuizzes';

enum manageQuizScreens {
  'add quiz',
  'amend quizzes'
}

const ManageQuizzes = (): ReactElement => {
  const [manageQuizScreen, setManageQuizScreen] = useState(manageQuizScreens['add quiz'])

  const renderNavButtons = () => {
    switch(manageQuizScreen){
      case manageQuizScreens['amend quizzes']:
        return (
          <div>
            <ColouredButton
              buttonType={ButtonType.nav}
              text="add quiz"
              onClickAction={() => setManageQuizScreen(manageQuizScreens['add quiz'])}
            />
            <ColouredButton
              buttonType={ButtonType.navFilled}
              text="amend quizzes"
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
              text="amend quizzes"
              onClickAction={() => setManageQuizScreen(manageQuizScreens['amend quizzes'])}
            />
          </div>
        )
    }
  }

  const renderSubscreen = () => {
    switch(manageQuizScreen){
      case manageQuizScreens['amend quizzes']: 
        return <AmendQuizzes />
      case manageQuizScreens['add quiz']:
      default:
        return <AddQuiz />
    }
  }

  return (
    <div data-testid='manage-quizzes'>
      {renderNavButtons()}
      {renderSubscreen()}
    </div>
  );
}

export default ManageQuizzes;