import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Scenario, ScenarioState } from '../../types/Scenario';

const initialState: ScenarioState = {
  scenarios: [],
};

const scenarioSlice = createSlice({
  name: 'scenario',
  initialState,
  reducers: {
    addScenario(state, action: PayloadAction<Scenario>) {
      state.scenarios.push(action.payload);
    },
    removeScenario(state, action: PayloadAction<string>) {
      state.scenarios = state.scenarios.filter(scenario => scenario.name !== action.payload);
    },
  },
});

export const { addScenario, removeScenario } = scenarioSlice.actions;
export default scenarioSlice.reducer;
