import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import personaReducer from './slices/personaSlice';
import scenarioReducer from './slices/scenarioSlice';
import storyReducer from './slices/storySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    persona: personaReducer,
    scenario: scenarioReducer,
    story: storyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
