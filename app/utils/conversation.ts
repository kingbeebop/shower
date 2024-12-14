import { HookOptions } from "@11labs/react";
import { SessionConfig } from "@11labs/client";
import { Story } from "@/types/Story";
import { Persona } from "@/types/Persona";
import { Scenario } from "@/types/Scenario";
import OpenAI from "openai";


const client = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

type ConversationObject = {
  startSession: (options: SessionConfig & HookOptions) => Promise<string>;
  endSession: () => Promise<void>;
  setVolume: ({ volume }: { volume: number }) => void;
  getInputByteFrequencyData: () => Uint8Array | undefined;
  getOutputByteFrequencyData: () => Uint8Array | undefined;
  getInputVolume: () => number;
  getOutputVolume: () => number;
  status: string;
  isSpeaking: boolean;
};

const AGENT_ID = process.env.NEXT_PUBLIC_AGENT_ID || "";

const persona_scenario_prompt_string = (
  persona: Persona,
  scenario: Scenario
): string => {
  return `
  ## PERSONA
  Tone: ${persona.tone}
  Values: ${persona.values}
  Biases: ${persona.biases}
  Voice: ${persona.characterExemplar}

  ## SCENARIO
  Context: ${scenario.context}
  Relationship: ${scenario.relationship}
  `;
};

const generateStoryPrompt = (story: Story, agentGoals: string): string => {
  const { persona, scenario } = story;
  if (!agentGoals) {
    throw new Error(
      "Agent goals must be generated before generating story prompt"
    );
  }

  return `
  ## Context
  This is a role-playing scenario where the user and you are working through difficult conversations through realistic role-playing simulations.
  You will play the role of the other person in the conversation, responding in a way that feels authentic and true to that relationship.
  Users will define a specific scenario, like talking to a boss about a raise or discussing a sensitive issue with a parent.
  The simulation focuses on capturing the emotional complexity of real-world interactions.
  Instead of giving generic responses, you will adapt its communication style, tone, and goals based on the specific context provided.
  This means the conversation will feel dynamic and unpredictable, much like a real dialogue.

  ${persona_scenario_prompt_string(persona, scenario)}

  ## YOUR GOALS
  ${agentGoals}

  ## Rules for Conversation
  1. Keep the conversation on-topic; do not talk about anything other than the scenario unless your persona specifically demands avoidance.
  2. Respond only as the persona within the current context. Do not respond as an LLM.
  3. Stay in character throughout the conversation.
  4. Provide actionable feedback if the user's approach could improve.
  5. Use natural turns of phrase as opposed to making exclusively functional word choices. For example, you can use verbal tics, idiomatic language, hesitancy, or uncertainty.
  6. Try to keep your responses to 100 words or less.
  `;
};

const generateAgentGoalsPrompt = async (story: Story): Promise<string> => {
  const { persona, scenario, userGoals } = story;
  const prompt = `
    we are simulating a conversation in which the user wants to get a raise. Given this context what are 2 8-10 word goals for the chat agent

    ${persona_scenario_prompt_string(persona, scenario)}
    
    ## YOUR GOALS
    ${userGoals}
  `;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.0,
    max_tokens: 100,
  });

  return response.choices[0].message.content || "";
};

export const startConversation = async (
  conversation: ConversationObject,
  currentStory: Story | null
): Promise<string> => {
  if (!currentStory) {
    throw new Error("Story must be provided");
  }

  const agentGoals = await generateAgentGoalsPrompt(currentStory);

  console.log("Agent goals:", agentGoals);

  await navigator.mediaDevices.getUserMedia({ audio: true });
  const storyPrompt = generateStoryPrompt(currentStory, agentGoals);

  const result = await conversation.startSession({
    agentId: AGENT_ID,
    overrides: {
      agent: {
        prompt: {
          prompt: storyPrompt,
        },
        firstMessage: `Hey...!`,
      },
    },
  });
  console.log("Start session result:", result);
  return result;
};
