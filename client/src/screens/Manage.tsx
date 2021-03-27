import React, { useState } from 'react';
import ManageCards from '../components/ManageCards/ManageCards';
import Divider from '../components/Divider/Divider';
import { ColouredButton, ButtonType } from '../components/ColouredButton/ColouredButton';
import ManageQuizzes from '../components/ManageQuizzes/ManageQuizzes';

enum ManageModes{
  'cards',
  'quizzes'
}

const Manage = () => {
  const [manageMode, setManageMode] = useState<ManageModes>(ManageModes.cards);

  const renderNavButtons = () => {
    switch(manageMode){
      case ManageModes.cards:
        return (
          <div>
            <ColouredButton 
              text="Manage Cards"
              buttonType={ButtonType.navFilled}
              onClickAction={() => setManageMode(ManageModes.cards)}
            />
            <ColouredButton 
              text="Manage Quizzes"
              buttonType={ButtonType.nav}
              onClickAction={() => setManageMode(ManageModes.quizzes)}
            />
          </div>
        );
      case ManageModes.quizzes:
        return (
          <div>
            <ColouredButton 
              text="Manage Cards"
              buttonType={ButtonType.nav}
              onClickAction={() => setManageMode(ManageModes.cards)}
            />
            <ColouredButton 
              text="Manage Quizzes"
              buttonType={ButtonType.navFilled}
              onClickAction={() => setManageMode(ManageModes.quizzes)}
            />
          </div>
        );  
    }
  }

  const renderManagerSection = () => {
    switch(manageMode){
      case ManageModes.cards:
        return <ManageCards />;
      case ManageModes.quizzes:
        return <ManageQuizzes />;  
    }
  }

  return (
    <div>
      <h1>Manage</h1>
      <p>Manage your cards and quizes</p>
      {renderNavButtons()}
      <Divider />
      {renderManagerSection()}
    </div>
  )
}

export default Manage;