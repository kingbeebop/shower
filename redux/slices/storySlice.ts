import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Story } from "@/types/Story";
interface StoryState {
  stories: Story[];
  currentStory: Story | null;
}

const DEFAULT_PERSONA = {
  name: "Ex Wife",
  tone: "Aggressive",
  values: "Power, Control, Dominance",
  biases: "Fear of spiders",
  characterExemplar: "Mean girls",
};
const DEFAULT_SCENARIO = {
  name: "You are asking for a divorce",
  context: "You are asking for a divorce",
  relationship: "You are asking for a divorce",
};
const DEFAULT_USER_GOALS = "You are asking for a divorce";

const initialState: StoryState = {
  stories: [
    {
      persona: DEFAULT_PERSONA,
      scenario: DEFAULT_SCENARIO,
      userGoals: DEFAULT_USER_GOALS,
      agentGoals: null,
    },
  ],
  currentStory: {
    persona: DEFAULT_PERSONA,
    scenario: DEFAULT_SCENARIO,
    userGoals: DEFAULT_USER_GOALS,
    agentGoals: null,
  },
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
