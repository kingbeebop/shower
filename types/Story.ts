import { Persona } from './Persona';
import { Scenario } from './Scenario';

export interface Story {
  persona: Persona;
  scenario: Scenario;
  userGoals: string;
  agentGoals: string | null;
}

export interface StoryState {
  story: Story;
}