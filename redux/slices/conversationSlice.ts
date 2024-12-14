import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Conversation {
  id: string;
  messages: string[];
}

interface ConversationState {
  conversations: Conversation[];
}

const initialState: ConversationState = {
  conversations: [],
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    // Add a new conversation
    addConversation(state, action: PayloadAction<Conversation>) {
      state.conversations.push(action.payload);
    },
    // Add a message to an existing conversation
    addMessage(state, action: PayloadAction<{ conversationId: string; message: string }>) {
      const conversation = state.conversations.find(
        (conv) => conv.id === action.payload.conversationId
      );
      if (conversation) {
        conversation.messages.push(action.payload.message);
      }
    },
    // Set all conversations
    setConversations(state, action: PayloadAction<Conversation[]>) {
      state.conversations = action.payload;
    },
  },
});

export const { addConversation, addMessage, setConversations } = conversationSlice.actions;

export default conversationSlice.reducer;
