import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Story, StoryState } from '../../types/Story';

const initialState: StoryState = {
  story: null,
};

const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    setStory(state, action: PayloadAction<Story>) {
      state.story = action.payload;
    },
    clearStory(state) {
      state.story = null;
    },
  },
});

export const { setStory, clearStory } = storySlice.actions;
export default storySlice.reducer;
