import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Persona, PersonaState } from '../../types/Persona';

const initialState: PersonaState = {
  personas: [],
};

const personaSlice = createSlice({
  name: 'persona',
  initialState,
  reducers: {
    addPersona(state, action: PayloadAction<Persona>) {
      state.personas.push(action.payload);
    },
    removePersona(state, action: PayloadAction<string>) {
      state.personas = state.personas.filter(persona => persona.name !== action.payload);
    },
  },
});

export const { addPersona, removePersona } = personaSlice.actions;
export default personaSlice.reducer;
