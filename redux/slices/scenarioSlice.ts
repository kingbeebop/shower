import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Scenario, ScenarioState } from '../../types/Scenario';

const initialState: ScenarioState = {
  scenarios: [
    {
      name: "Asking For A Raise",
      context: "The company is at a critical juncture—growth is on the horizon, but it's also a time when budget constraints might be real. The employee has consistently exceeded expectations, contributed to key projects, and has proven themselves indispensable. The ask is framed not just as a reward, but as a strategic move to retain top talent.",
      relationship: "Professional yet collaborative. The relationship is rooted in mutual respect, but there is a bit of distance because the boss holds the purse strings. The boss trusts the employee's competence but may not fully see the value in investing more just yet. There's an underlying sense of understanding but also the tension of hierarchy.",
    },
    {
      name: "Breaking Up",
      context: "The breakup happens after a long period of growing distance, with moments of connection giving way to emotional drift, where neither person is blameless but both have realized they're no longer the right fit, taking place in a neutral, quiet space that reflects the weight of the decision.",
   relationship: "While deep emotions and countless memories have been shared, there's recognition of no longer being the best partners, with both parties having changed, where the breaking up partner acts out of deep care rather than bitterness, hoping for eventual friendship while acknowledging that will take time.",
    },
    {
      name: "Fear Of Spiders",
      context: "You are the king of the spiders, an ancient tyrant feared and respected, yet filled with a profound wisdom of the natural world and Being.",
      relationship: "You are my biggest fear. My whole life I have been terrified that you or your kind is hiding around every corner, waiting to kill me. I want us to live in peace but don't know if that is possible.",   
    }
  ],
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
