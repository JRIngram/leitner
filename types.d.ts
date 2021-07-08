export type Card = {
  _id: string,
  prompt: string,
  answer: string
}

export type CardInQuiz = {
  _id: string
  box: number
}

export type Quiz = {
  _id: string,
  name: string,
  description: string,
  cardObjectIds: CardInQuiz[]
}

export type FormattedCard = {
  _id: string,
  prompt: string,
  answer: string,
  givenAnswer: string,
  correct: boolean
}
