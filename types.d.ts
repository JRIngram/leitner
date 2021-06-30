export type cardType = {
  _id: string,
  prompt: string,
  answer: string
}

export type quizType = { 
  _id: string,
  name: string,
  description: string,
  cardObjectIds: string[]
}