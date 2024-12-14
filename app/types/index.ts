
export interface ConversationSettings {
    persona: string;
    scenario: string;
    goal: string;
  }
  
  export interface Message {
    sender: 'user' | 'ai';
    text: string;
  }
  
  export interface RootState {
    conversation: {
      settings: ConversationSettings;
    };
  }