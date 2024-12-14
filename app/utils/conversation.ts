import { HookOptions, } from "@11labs/react";
import { SessionConfig,   } from "@11labs/client";

interface Persona {
  name: string;
}

interface Scenario {
  name: string;
}

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

export const startConversation = async (
  conversation: ConversationObject,
  currentPersona: Persona | null,
  currentScenario: Scenario | null
): Promise<string> => {
  await navigator.mediaDevices.getUserMedia({ audio: true });
  const result = await conversation.startSession({
    agentId: AGENT_ID,
    overrides: {
      agent: {
        prompt: {
          prompt: `You are ${currentPersona?.name} and you are in the ${currentScenario?.name} scenario.`,
        },
        firstMessage: `Hey`,
      },
    },
  });
  console.log("Start session result:", result);
  return result;
}; 