import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'persona';
  timestamp: number;
}

interface ConversationState {
  messages: Message[];
  currentPersona: string;
  currentScenario: string;
  goal: string;
  isActive: boolean;
}

const initialState: ConversationState = {
  messages: [],
  currentPersona: '',
  currentScenario: '',
  goal: '',
  isActive: false,
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setConversationSetup: (
      state,
      action: PayloadAction<{
        persona: string;
        scenario: string;
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
      }>
    ) => {
      state.messages.push({
        id: Date.now().toString(),
        text: action.payload.text,
        sender: action.payload.sender,
        timestamp: Date.now(),
      });
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
  endConversation,
  resetConversation,
} = conversationSlice.actions;

export default conversationSlice.reducer;
