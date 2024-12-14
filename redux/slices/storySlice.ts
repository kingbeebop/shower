import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Story } from "@/types/Story";
import { initialScenarioState } from "./scenarioSlice";
import { initialPersonaState } from "./personaSlice";
interface StoryState {
  stories: Story[];
  currentStory: Story | null;
}



export const initialStoryState: StoryState = {
  stories: initialPersonaState.personas.map((persona, index) => ({
    persona,
    scenario: initialScenarioState.scenarios[index],
    userGoals: "",
    agentGoals: null
  })),
  currentStory: null,
};

const storySlice = createSlice({
  name: "story",
  initialState: initialStoryState,
  reducers: {
    // Add a new story
    addStory(state, action: PayloadAction<Story>) {
      state.stories.push(action.payload);
    },
    // Set current story
    setCurrentStory(state, action: PayloadAction<Story>) {
      state.currentStory = action.payload;
    },
  },
});

export const { addStory, setCurrentStory } = storySlice.actions;

export default storySlice.reducer;
