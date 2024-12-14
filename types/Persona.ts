export interface Persona {
  name: string;
  tone: string;
  values: string;
  biases: string;
  characterExemplar: string;
}

export interface PersonaState {
  personas: Persona[];
}
