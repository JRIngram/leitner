import React from 'react';
import ReactDOM from 'react-dom';

type CardListItemProps = {
  prompt: string
  answer: string,
}

const CardListItem = (props: CardListItemProps) => {
  const prompt = props.prompt;
  const answer = props.answer;

  return (
    <details>
      <summary>
        This is an example prompt... / this is an example answer...
        <span>
          <button>Edit</button>
          <button>Delete</button>
        </span>
      </summary>
      <p>Prompt: {prompt} </p>
      <p>Answer: {answer}</p>
    </details>
  );
}

export default CardListItem