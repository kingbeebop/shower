"use client";

import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  Button,
  CircularProgress,
} from "@mui/material";
import { useConversation } from "@11labs/react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useRouter } from "next/navigation";
import { startConversation as startConversationUtil } from "../utils/conversation";
import { generateImage } from "./functions";

const AGENT_ID = process.env.NEXT_PUBLIC_AGENT_ID || "";
const API_KEY = process.env.NEXT_PUBLIC_ELEVEN_LABS_API_KEY || "";
const CONVERSATION_LOAD_TIME = 3000;

interface Message {
  role: string;
  message: string;
  time_in_call_secs: number;
}

interface ConversationResponse {
  agent_id: string;
  conversation_id: string;
  status: string;
  transcript: Message[];
  metadata: {
    start_time_unix_secs: number;
    call_duration_secs: number;
    cost: number;
  };
  analysis: {
    evaluation_criteria_results: Record<string, unknown>;
    data_collection_results: Record<string, unknown>;
    call_successful: string;
    transcript_summary: string;
  };
}

const getConversationDetails = async (
  sessionId: string
): Promise<Message[]> => {
  try {
    const options = {
      method: "GET",
      headers: { "xi-api-key": API_KEY },
    };

    console.log("API_KEY", API_KEY);
    console.log("AGENT_ID", AGENT_ID);
    console.log("sessionId", sessionId);

    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversations/${sessionId}`,
      options
    );
    if (!response.ok) {
      console.log("response", response);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: ConversationResponse = await response.json();
    return data.transcript.map(({ role, message, time_in_call_secs }) => ({
      role,
      message,
      time_in_call_secs,
    }));
  } catch (error) {
    console.error("Error fetching conversation details:", error);
    return [];
  }
};

export default function Conversation() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const { currentStory } = useSelector((state: RootState) => state.story);
  const [fetchingMessages, setFetchingMessages] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [animationActive, setAnimationActive] = useState(true);

  const conversation = useConversation({
    onConnect: () => console.log("Connected"),
    onDisconnect: async () => {
      if (sessionId) {
        await new Promise((resolve) =>
          setTimeout(resolve, CONVERSATION_LOAD_TIME)
        );
        try {
          const finalMessages = await getConversationDetails(sessionId);
          setMessages(finalMessages);
          console.log("finalMessages", finalMessages);
        } catch (error) {
          console.error("Failed to fetch final conversation details:", error);
        }
      }
    },
    onMessage: (message) => console.log("Message:", message),
    onError: (error) => console.error("Error:", error),
  });

  useEffect(() => {
    if (!currentStory) {
      router.push("/setup");
    }
  }, [currentStory, router]);

  useEffect(() => {
    async function setImage() {
      const imageUrl = await generateImage(
        "We want a frontal facing image of the character. Generate an image of the character" +
          currentStory?.persona.name
      );
      console.log("background image");
      setBackgroundImage(imageUrl);
    }
    setImage();
  }, [currentStory]);

  const startConversation = useCallback(async () => {
    try {
      const result = await startConversationUtil(conversation, currentStory);
      setSessionId(result);
      setAnimationActive(true);
    } catch (error) {
      console.error("Failed to start conversation:", error);
      alert("Failed to start conversation. Please try again later.");
    }
  }, [conversation, currentStory]);

  const stopConversation = useCallback(async () => {
    setFetchingMessages(true);
    setAnimationActive(false);
    await conversation.endSession();

    if (sessionId) {
      await new Promise((resolve) =>
        setTimeout(resolve, CONVERSATION_LOAD_TIME)
      );
      try {
        const finalMessages = await getConversationDetails(sessionId);
        setMessages(finalMessages);
        console.log("finalMessages", finalMessages);
        setFetchingMessages(false);
      } catch (error) {
        console.error("Failed to fetch final conversation details:", error);
      }
    }

    setSessionId(null);
  }, [conversation, sessionId]);

  if (!currentStory?.persona?.name || !currentStory?.scenario.name) {
    return null;
  }

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          my: 4,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" component="h1">
            Conversation with {currentStory?.persona.name}
          </Typography>
          <Chip
            label={currentStory?.scenario.name}
            color="primary"
            variant="outlined"
          />
        </Box>

        {/* Background Container */}
        <Box
          sx={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            borderRadius: 2,
          }}
        >
          {/* Background Image */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: backgroundImage
                ? `url(${backgroundImage})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              animation:
                backgroundImage && animationActive
                  ? "pulse 1s ease-in-out infinite alternate"
                  : "none",
              zIndex: 0,
              "@keyframes pulse": {
                "0%": { transform: "scale(1)" },
                "100%": { transform: "scale(1.1)" },
              },
            }}
          />

          {/* Foreground Content */}
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              p: 2,
            }}
          >
            {fetchingMessages ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                <CircularProgress />
                <Typography sx={{ mt: 2 }}>Loading messages...</Typography>
              </Box>
            ) : (
              <Box sx={{ flex: 1, overflowY: "auto" }}>
                {messages.map((msg, index) => (
                  <Box
                    key={index}
                    sx={{
                      mb: 1,
                      p: 1,
                      backgroundColor:
                        msg.role === "user" ? "#f0f0f0" : "#e3f2fd",
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body1">
                      <strong>{msg.role}:</strong> {msg.message}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>

        {/* Controls */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            onClick={startConversation}
            disabled={conversation.status === "connected"}
          >
            Start Conversation
          </Button>
          <Button
            variant="contained"
            onClick={stopConversation}
            disabled={conversation.status !== "connected"}
            color="error"
          >
            Stop Conversation
          </Button>
        </Box>
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography>Status: {conversation.status}</Typography>
          <Typography>
            Agent is {conversation.isSpeaking ? "speaking" : "listening"}
          </Typography>
          {sessionId && <Typography>Session ID: {sessionId}</Typography>}
        </Box>
      </Box>
    </Container>
  );
}
