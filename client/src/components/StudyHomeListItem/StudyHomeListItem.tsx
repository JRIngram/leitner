import React from 'react';
import { Quiz } from '../../../../types';
import { ColouredButton, ButtonType } from '../../components/ColouredButton/ColouredButton';
import ViewQuizzesListItem from '../../components/ViewQuizzesListItem/ViewQuizzesListItem';
import Divider from '../../components/Divider/Divider';

type StudyHomeListItemProps = {
  quiz: Quiz,
  onQuizSelect: Function
}

const StudyHomeListItem = (props: StudyHomeListItemProps) => {
  const { quiz, onQuizSelect } = props;

  return (
    <div key={quiz._id}>
      <ColouredButton 
        buttonType={ButtonType.nav}
        text="start quiz" 
        onClickAction={() => { return onQuizSelect(quiz)}} 
      />
      <div>
        <label>Quiz Boxes:</label>
        <div>
          <select name="quizBoxes" id="quizBoxes" data-testid='quiz-box-dropdown'>
            <option value="1">Boxes 1,2 and 3</option>
            <option value="2">Boxes 2 and 3</option>
            <option value="3">Box 3</option>
          </select>
        </div>
      </div>
      <ViewQuizzesListItem id={quiz._id} name={quiz.name} description={quiz.description} cardObjects={[]} />
      <Divider />
    </div>
  )
}

export default StudyHomeListItem;