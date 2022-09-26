import React, { useState, useEffect } from 'react';
import { Quiz } from '../../../types';
import Divider from '../../components/Divider/Divider';
import { getAllQuizzes } from '../../utils/axios';
import { ColouredButton, ButtonType } from '../../components/ColouredButton/ColouredButton';
import ViewQuizzesListItem from '../../components/ViewQuizzesListItem/ViewQuizzesListItem';

type StudyHomeProps = { 
  onQuizSelect: (arg1: Quiz, arg2: number) => void
}


const StudyHome = (props: StudyHomeProps) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    let didCancel = false;
    const loadData = () => getAllQuizzes().then(response => {
      try{
        if(!didCancel){
          setIsLoadingData(true);
          setQuizzes(response.data);
          setIsLoadingData(false);
        }
      }
      catch(err){
        console.error({ err })
        throw err;
      }
    });

    loadData();
    return () => {didCancel = true}
  }, []);
  
  const renderQuizList = () => {
    if(quizzes.length > 0){

      const renderedQuizItems = () => {
        return quizzes.map(quiz => {
          return (
            <StudyHomeListItem 
              key={quiz._id}
              quiz={quiz}
              onQuizSelect={props.onQuizSelect}
            />
          )
        })
      }

      return (
        <div>
          <Divider />
          {renderedQuizItems()}
        </div>
      )
    }
    else if(isLoadingData){
      return <p>Loading quizzes...</p>
    }
    else{
      return <p>No quizzes have been created. Please create quizzes in the Manage tab.</p>
    }
  }

  return (
    <div data-testid="study-screen-home">
      <h1>Study</h1>
      <p>Study using your created flashcards and quizzes.</p>
      <div>
        <h2>Quizzes</h2>
        {renderQuizList()}
      </div>
    </div> 
  );
}

type StudyHomeListItemProps = {
  quiz: Quiz,
  onQuizSelect: (arg1: Quiz, arg2: number) => void
}

const StudyHomeListItem = (props: StudyHomeListItemProps) => {
  const { quiz, onQuizSelect } = props;
  const [boxLevel, setBoxLevel] = useState(1);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBoxLevel(parseInt(event.target.value));
    
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

export default StudyHome;