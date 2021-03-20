import React from 'react';
import ReactDOM from 'react-dom';

const Manage = () => {
  return (
    <div>
      <div>
        <h1>Manage</h1>
        <p>Manage your cards and quizes</p>
      </div>
      <div>
        <button>Cards</button>
        <button>Quizes</button>
      </div>
      <details>
        <summary>This is an example prompt... / this is an example answer...</summary>
        <p>Prompt: this is an example prompt: Hello I am a prompt!</p>
        <p>Answer: this is an example answer: Hello I am an Answer!</p>
      </details>
      <hr/>
      <details>
        <summary>This is an example prompt... / this is an example answer...</summary>
        <p>Prompt: this is an example prompt: Hello I am a prompt!</p>
        <p>Answer: this is an example answer: Hello I am an Answer!</p>
      </details>
      <hr/>
      <details>
        <summary>This is an example prompt... / this is an example answer...</summary>
        <p>Prompt: this is an example prompt: Hello I am a prompt!</p>
        <p>Answer: this is an example answer: Hello I am an Answer!</p>
      </details>
      <hr/>
      <details>
        <summary>This is an example prompt... / this is an example answer...</summary>
        <p>Prompt: this is an example prompt: Hello I am a prompt!</p>
        <p>Answer: this is an example answer: Hello I am an Answer!</p>
      </details>
    </div>


  )
}

export default Manage;