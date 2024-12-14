import { Persona } from './Persona';
import { Scenario } from './Scenario';

export interface Story {
  persona: Persona | null;
  scenario: Scenario | null;
  tolerance: number;
}

export interface StoryState {
  story: Story | null;
}
