import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Story } from "@/types/Story";
interface StoryState {
  stories: Story[];
  currentStory: Story | null;
}



const initialState: StoryState = {
  stories: [
  ],
  currentStory: null,
};

const storySlice = createSlice({
  name: "story",
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

export const { addStory } = storySlice.actions;

export default storySlice.reducer;
