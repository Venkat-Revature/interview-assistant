import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  candidates: [],
  currentCandidateId: null,
};

const candidateSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    addCandidate: (state, action) => {
      const newCandidate = {
        id: uuidv4(),
        ...action.payload,
        createdAt: new Date().toISOString(),
        status: 'in-progress',
      };
      state.candidates.push(newCandidate);
      state.currentCandidateId = newCandidate.id;
    },
    updateCandidate: (state, action) => {
      const { id, ...updates } = action.payload;
      const candidate = state.candidates.find((c) => c.id === id);
      if (candidate) {
        Object.assign(candidate, updates);
      }
    },
    setCurrentCandidate: (state, action) => {
      state.currentCandidateId = action.payload;
    },
    completeCandidate: (state, action) => {
      const { id, name, email, phone, score, summary, completedAt, answers, scores, questions } = action.payload;
      const candidate = state.candidates.find((c) => c.id === id);
      
      if (candidate) {
        // Update basic info if provided
        if (name) candidate.name = name;
        if (email) candidate.email = email;
        if (phone) candidate.phone = phone;
        
        // Update completion data if provided
        if (score !== undefined) {
          candidate.status = 'completed';
          candidate.score = score;
          candidate.summary = summary;
          candidate.completedAt = completedAt || new Date().toISOString();
          
          // Store interview details
          if (answers) candidate.answers = answers;
          if (scores) candidate.scores = scores;
          if (questions) candidate.questions = questions;
        }
      }
    },
  },
});

export const { addCandidate, updateCandidate, setCurrentCandidate, completeCandidate } = candidateSlice.actions;
export default candidateSlice.reducer;