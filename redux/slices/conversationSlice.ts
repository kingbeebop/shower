import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Persona } from '../../types/Persona'
import { Scenario } from '../../types/Scenario'


interface Message {
  id: string;
  text: string;
  sender: 'user' | 'persona';
  timestamp: number;
  audioUrl?: string;
}

interface ConversationState {
  messages: Message[];
  currentPersona: Persona | null;
  currentScenario: Scenario | null;
  goal: string;
  isActive: boolean;
  isRecording: boolean;
  isProcessing: boolean;
  isPlaying: boolean;
}

const initialState: ConversationState = {
  messages: [],
  currentPersona: null,
  currentScenario: null,
  goal: '',
  isActive: false,
  isRecording: false,
  isProcessing: false,
  isPlaying: false
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setConversationSetup: (
      state,
      action: PayloadAction<{
        persona: Persona;
        scenario: Scenario;
        goal: string;
      }>
    ) => {
      state.currentPersona = action.payload.persona;
      state.currentScenario = action.payload.scenario;
      state.goal = action.payload.goal;
      state.isActive = true;
      state.messages = [];
    },
    addMessage: (
      state,
      action: PayloadAction<{
        text: string;
        sender: 'user' | 'persona';
        audioUrl?: string;
      }>
    ) => {
      state.messages.push({
        id: Date.now().toString(),
        text: action.payload.text,
        sender: action.payload.sender,
        timestamp: Date.now(),
        audioUrl: action.payload.audioUrl
      });
    },
    setRecordingState: (state, action: PayloadAction<boolean>) => {
      state.isRecording = action.payload;
    },
    setProcessingState: (state, action: PayloadAction<boolean>) => {
      state.isProcessing = action.payload;
    },
    setPlayingState: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    endConversation: (state) => {
      state.isActive = false;
    },
    resetConversation: () => initialState,
  },
});

export const {
  setConversationSetup,
  addMessage,
  setRecordingState,
  setProcessingState,
  setPlayingState,
  endConversation,
  resetConversation,
} = conversationSlice.actions;

export default conversationSlice.reducer;
