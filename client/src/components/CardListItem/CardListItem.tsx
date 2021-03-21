import React from 'react';

type CardListItemProps = {
  id: string,
  prompt: string,
  answer: string,
}

const CardListItem = (props: CardListItemProps) => {
  const id = props.id;
  const prompt = props.prompt;
  const answer = props.answer;

  return (
    <details data-testid={id}>
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