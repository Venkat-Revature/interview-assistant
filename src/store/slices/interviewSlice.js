import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentQuestion: 0,
  questions: [],
  answers: [],
  scores: [],
  isInterviewStarted: false,
  isInterviewCompleted: false,
  currentTimer: 0,
  isPaused: false,
  resumeData: null,
};

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    initializeInterview: (state, action) => {
      state.questions = action.payload;
      state.currentQuestion = 0;
      state.answers = new Array(action.payload.length).fill('');
      state.scores = new Array(action.payload.length).fill(0);
      state.isInterviewStarted = true;
      state.isInterviewCompleted = false;
      state.currentTimer = action.payload[0]?.timeLimit || 20;
    },
    submitAnswer: (state, action) => {
      const { questionIndex, answer, score } = action.payload;
      state.answers[questionIndex] = answer;
      state.scores[questionIndex] = score;
    },
    moveToNextQuestion: (state) => {
      state.currentQuestion += 1;
      if (state.currentQuestion < state.questions.length) {
        state.currentTimer = state.questions[state.currentQuestion].timeLimit;
      }
    },
    setTimer: (state, action) => {
      state.currentTimer = action.payload;
    },
    completeInterview: (state) => {
      state.isInterviewCompleted = true;
    },
    pauseInterview: (state) => {
      state.isPaused = true;
      state.resumeData = {
        currentQuestion: state.currentQuestion,
        answers: [...state.answers],
        scores: [...state.scores],
        pausedAt: new Date().toISOString(),
      };
    },
    resumeInterview: (state) => {
      state.isPaused = false;
      state.currentTimer = state.questions[state.currentQuestion]?.timeLimit || 20;
    },
    resetInterview: (state) => {
      return initialState;
    },
  },
});

export const {
  initializeInterview,
  submitAnswer,
  moveToNextQuestion,
  setTimer,
  completeInterview,
  pauseInterview,
  resumeInterview,
  resetInterview,
} = interviewSlice.actions;

export default interviewSlice.reducer;
