// redux/slices/personaSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Persona, PersonaState } from '../../types/Persona';

const initialState: PersonaState = {
  personas: [],
};

const personaSlice = createSlice({
  name: 'persona',
  initialState,
  reducers: {
    addPersona(state, action: PayloadAction<Omit<Persona, 'id'>>) {
      // Get the next available ID (next number after the highest current id)
      const nextId = state.personas.length ? Math.max(...state.personas.map(p => p.id)) + 1 : 1;

      // Create the new persona object with the assigned ID
      const newPersona = { ...action.payload, id: nextId };
      
      // Push the new persona to the personas array
      state.personas.push(newPersona);
    },
    removePersona(state, action: PayloadAction<number>) {
      // Remove persona by id
      state.personas = state.personas.filter(persona => persona.id !== action.payload);
    },
  },
});

export const { addPersona, removePersona } = personaSlice.actions;

export default personaSlice.reducer;
