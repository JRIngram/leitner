const selectors = {
  manageNavButton: '#root > div:nth-child(1) > nav:nth-child(1) > p:nth-child(3)',
  studyNavButton: '#root > div:nth-child(1) > nav:nth-child(1) > p:nth-child(2)',
  // manageQuizzesButton: Selector('#coloured-button-manage-quizzes'),

  // Card management
  addCardsButton: '#coloured-button-add-cards',
  addCardButton: '#coloured-button-add-card',
  deleteCardButton: '#coloured-button-delete',
  editCardButton: '#coloured-button-edit',
  cancelCardButton: '#coloured-button-cancel',
  greenEditCardButton: '#coloured-button-edit-card',
  promptInput: '#prompt',
  answerInput: '#answer',
  savedPrompt: '#root > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(5) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > p:nth-child(1)',
  savedAnswer: '#root > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(5) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > p:nth-child(2)',
  noCardsCreatedMessage: '#root > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(5) > div:nth-child(3) > p:nth-child(1)',

  // manage quizzes
  noQuizzesCreatedMessage: '#root > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > p:nth-child(2)',
  manageQuizzesButton: '#coloured-button-manage-quizzes',
  quizNameInput: '#quizName',
  quizDescriptionInput: '#quizDescription',
  quizMustContainCardsMessage: '#root > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(5) > div:nth-child(2) > p:nth-child(3)',
  confirmAddQuizButton: '#coloured-button-confirm-add-quiz',
  addCardCheckBox: '#add-card-checkbox-',
  quizSuccessfullyAdded: '#root > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(5) > div:nth-child(2) > p:nth-child(3)',
  ammendQuizzesButton: '#coloured-button-amend-quizzes',
  boxOne: '#root > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > ul:nth-child(3) > ol:nth-child(1) > li:nth-child(1)',
  amendQuizzesPromptOneBoxOne: '#root > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > ul:nth-child(3) > ol:nth-child(1) > li:nth-child(1) > ul:nth-child(1) > li:nth-child(1)',
  amendQuizzesPromptTwoBoxTwo: '#root > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > ul:nth-child(3) > ol:nth-child(1) > li:nth-child(1) > ul:nth-child(1) > li:nth-child(2)',
  amendQuizzesPromptThreeBoxThree: '#root > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > ul:nth-child(3) > ol:nth-child(1) > li:nth-child(1) > ul:nth-child(1) > li:nth-child(3)',
  boxTwo: '#root > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > ul:nth-child(3) > ol:nth-child(1) > li:nth-child(2)',
  boxThree: '#root > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > ul:nth-child(3) > ol:nth-child(1) > li:nth-child(3)',
  editQuizButton: '#coloured-button-edit-quiz',
  deleteQuizButton: '#coloured-button-delete-quiz',
  confirmEditQuizButton: '#coloured-button-confirm-edit-quiz',

  // study page
  firstQuizName: '#root > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > p:nth-child(1)',
  firstQuizDescription: '#root > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > p:nth-child(2)',
  firstQuizBox: '#quizBoxes',
  startQuizButton: '#coloured-button-start-quiz',
  quizBoxDropdown: '#quizBoxes',

  // quiz page
  quizTitle: '#root > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > h1:nth-child(1)',
  quizQuestionCount: '#root > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > h2:nth-child(1)',
  quizAnswerInput: '#answer-input',
  quizQuestion: '#quizPrompt',
  submitAnswerButton: '#coloured-button-submit-answer',
  youSaidText: '#root > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > p:nth-child(1)',
  actualAnswerText: '#root > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > p:nth-child(2)',
  didYouGetCorrectText: '#root > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > p:nth-child(3)',
  correctAnswerButton: '#coloured-button-correct',
  incorrectAnswerButton: '#coloured-button-incorrect',

  // quiz review
  quizReviewTitle: '#root > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > h2:nth-child(1)',
  quizAnswerPercentage: '#root > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > h3:nth-child(2)',
  finishReviewButton: '#coloured-button-finish-review',
  firstQuestionReviewPrompt: '#root > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)',
  firstQuestionReviewGivenAnswer: '#root > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > p:nth-child(2)',
  firstQuestionReviewActualAnswer: '#root > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > p:nth-child(3)',
};

export default selectors;
