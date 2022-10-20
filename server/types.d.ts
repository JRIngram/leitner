export type Card = {
    _id: string,
    prompt: string,
    answer: string
  }

export type CardInQuiz = {
    _id: string
    box: number
  }

export type FormattedCard = {
    _id: string,
    prompt: string,
    answer: string,
    givenAnswer: string,
    correct: boolean
  }

export type CardIdsAndCorrectness = {
    _id: string,
    correct: boolean,
  };

export type Quiz = {
    _id: string,
    name: string,
    description: string,
    cardObjects: CardInQuiz[]
  }

export type QuizUnderstudy = {
    _id: string,
    name: string,
    description: string,
    cardObjects: CardInQuiz[]
    cards: FormattedCard[]
    quizBoxLevel: number
  }
