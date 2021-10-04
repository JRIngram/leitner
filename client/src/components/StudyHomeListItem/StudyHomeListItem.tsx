import React, { ReactElement, useState }from 'react';
import { Quiz } from '../../../../types';
import { ColouredButton, ButtonType } from '../../components/ColouredButton/ColouredButton';
import ViewQuizzesListItem from '../../components/ViewQuizzesListItem/ViewQuizzesListItem';
import Divider from '../../components/Divider/Divider';

type StudyHomeListItemProps = {
  quiz: Quiz,
  onQuizSelect: (arg1: Quiz, arg2: number) => void
}

const StudyHomeListItem = (props: StudyHomeListItemProps): ReactElement => {
  const { quiz, onQuizSelect } = props;
  const [boxLevel, setBoxLevel] = useState(1);

  const handleChange = (event: any) => {
    setBoxLevel(event.target.value);
  }
  return (
    <div key={quiz._id}>
      <ColouredButton 
        buttonType={ButtonType.nav}
        text="start quiz" 
        onClickAction={() => { return onQuizSelect(quiz, boxLevel)}} 
      />
      <div>
        <label>Quiz Boxes:</label>
        <div>
          <select 
            name="quizBoxes"
            id="quizBoxes"
            data-testid='quiz-box-dropdown'
            defaultValue={"1"}
            onChange={handleChange}
          >
            <option id="quizBoxes-1" value="1">Box 1</option>
            <option id="quizBoxes-2" value="2">Box 2</option>
            <option id="quizBoxes-3" value="3">Box 3</option>
          </select>
        </div>
      </div>
      <ViewQuizzesListItem id={quiz._id} name={quiz.name} description={quiz.description} cardObjects={[]} />
      <Divider />
    </div>
  )
}

export default StudyHomeListItem;