import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import candidateReducer from './slices/candidateSlice';
import interviewReducer from './slices/interviewSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['candidates', 'interview'],
};

const persistedCandidateReducer = persistReducer(persistConfig, candidateReducer);
const persistedInterviewReducer = persistReducer(persistConfig, interviewReducer);

export const store = configureStore({
  reducer: {
    candidates: persistedCandidateReducer,
    interview: persistedInterviewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
