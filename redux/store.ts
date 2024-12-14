import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import personaReducer from './slices/personaSlice';
import scenarioReducer from './slices/scenarioSlice';
import storyReducer from './slices/storySlice';
import conversationReducer from './slices/conversationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    persona: personaReducer,
    scenario: scenarioReducer,
    story: storyReducer,
    conversation: conversationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
