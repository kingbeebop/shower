import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Persona } from '../../types/Persona';  // Assuming Persona types are defined elsewhere
import { Scenario } from '../../types/Scenario';  // Assuming Scenario types are defined elsewhere

interface Story {
  goal: string;
  persona: Persona;
  scenario: Scenario;
  tolerance: number;
  conversationIds: number[];  // Store conversation ids as numbers
}

interface StoryState {
  stories: Story[];
}

const initialState: StoryState = {
  stories: [],
};

const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    // Add a new story
    addStory(state, action: PayloadAction<Story>) {
      state.stories.push(action.payload);
    },
    // Update a story with a new conversation id (now using number IDs)
    // addConversationToStory(state, action: PayloadAction<{ storyId: number; conversationId: number }>) {
    //   const story = state.stories.find((s) => s.persona.id === action.payload.storyId);
    //   if (story) {
    //     story.conversationIds.push(action.payload.conversationId);
    //   }
    // },
  },
});

export const { addStory  } = storySlice.actions;

export default storySlice.reducer;
