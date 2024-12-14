// redux/slices/personaSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Persona, PersonaState } from '../../types/Persona';

const initialState: PersonaState = {
  personas: [

  ],
};

const personaSlice = createSlice({
  name: 'persona',
  initialState,
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
