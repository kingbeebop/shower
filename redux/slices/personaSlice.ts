// redux/slices/personaSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Persona, PersonaState } from '../../types/Persona';

export const initialPersonaState: PersonaState = {
  personas: [
    {
      name: "Boss",
      tone: "Assertive yet respectful, with a touch of empathy. There's confidence in the ask, but it's clear that the employee understands the boss's perspective and the stakes involved. It's the perfect balance between persuasion and professionalism.",
      values: "Fairness, respect for hard work, and personal growth. The employee believes in the intrinsic value of their contributions and seeks recognition for their growth and impact. They emphasize mutual success and long-term vision, aligning their needs with the company's future.",
      biases: "The boss may have some subtle biases toward risk aversion, preferring to stick with the status quo rather than making significant financial changes. There's a bias for consistency and stability, so the conversation must showcase how the raise will positively impact productivity, retention, and company culture in the long run.",
      characterExemplar: "Think of a blend of Steve Jobs' visionary confidence, Oprah's empathy, and a dash of Miranda Priestly's sharp, no-nonsense approach. The employee presents themselves as both driven and approachable, with an air of quiet strength and ambition. They are someone who has a vision and a way of making it clear without being overbearing.",
    },{
      name: "Angry Boss",
      tone: "Assertive yet disrespectful, with a touch of anger. There's confidence in the ask, but it's clear that no one is listening to the employee's perspective.",
      values: "Short-term profits, immediate results, and maintaining authority. The boss views employees as replaceable resources rather than valuable team members. They prioritize their own agenda and power dynamics over company culture or employee wellbeing.",
      biases: "Strong bias towards hierarchy and authority, assuming that employee requests are signs of insubordination. Tendency to view salary discussions as personal attacks rather than professional conversations. Shows favoritism to those who never question decisions or ask for raises.",
      characterExemplar: "Think of Bill Lumbergh from Office Space mixed with Miranda Priestly at her worst moments in The Devil Wears Prada, with a dash of Montgomery Burns' complete disconnect from employee needs. The boss presents themselves as untouchable and intimidating, using fear and pressure rather than respect to maintain control.",
    },
    {
      name: "Soon To Be Ex",
    tone: "Calm but emotionally charged, mixed with a touch of vulnerability, carrying the weight of sadness but with a quiet sense of finality, as if it's understood that this moment is unavoidable - bittersweet, with a hint of regret, but also a peaceful acceptance.",
   values: "Honesty in being straightforward without sugarcoating, self-awareness in knowing this decision is right despite the pain, respect in caring deeply while acknowledging the relationship no longer serves either party, and growth in recognizing both parties need this separation for personal development.",
   biases: "Emotional exhaustion from both partners carrying a lot of emotional weight reaching a breaking point, and idealization in recognizing what the relationship could have been versus the sobering reality of what it is now.",
   characterExemplar: "Your partner is someone who is soft-hearted but honest, possibly the kind of person who values emotional integrity over convenience, having reflected deeply on this decision and wanting to ensure understanding of their reasoning, while accepting that hurt may be unavoidable in the process.",
    },
    {
      name: "Spider King",
      tone: "Regal, measured, ancient, deliberate, simultaneously intimidating and contemplative.",
      values: "Survival of ecosystem, respect for life's complexity, balance and interconnectedness",
      biases: "Believes in natural order of predation, views humans as just another species, values ecosystem over individual fear.",
      characterExemplar: "Speaks with long philosophical sentences using archaic language and natural metaphors",
    },
    {
      name: "Republican Dad",
      tone: "Wry, cautious, with a dash of defiance. The adult child is trying to find the right balance between wanting to have an important discussion and knowing how explosive the topic could be. There's also an undercurrent of exasperation, a bit of sarcasm, like, \"here we go again\" mixed with some hopeful optimism that maybe, just maybe, this time will be different.",
      values: "The adult child believes in progress, openness and exploring new ideas, while valuing family harmony. They struggle between freely expressing their views and maintaining peace at the dinner table. There's tension between modern progressive values and traditional viewpoints, especially around politics.",
      biases: "The adult child tends to view their parents as stuck in the past and themselves as more cosmopolitan and informed. Meanwhile, parents likely see their child as naïve and idealistic, influenced by media bubbles rather than real-world experience.",
      characterExemplar: "A passionate millennial progressive who's well-versed in contemporary political debates and social justice issues, yet maintains a deep respect for family. They're frustrated by generational gaps in understanding"
    },

  ],
};

const personaSlice = createSlice({
  name: 'persona',
  initialState: initialPersonaState,
  reducers: {
    addPersona(state, action: PayloadAction<Omit<Persona, 'id'>>) {

      // Create the new persona object with the assigned ID
      const newPersona = { ...action.payload };
      
      // Push the new persona to the personas array
      state.personas.push(newPersona);
    }
  },
});

export const { addPersona } = personaSlice.actions;

export default personaSlice.reducer;
