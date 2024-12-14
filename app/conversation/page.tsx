"use client";

import { Box, Container, Typography, Paper, Chip, Button, CircularProgress } from "@mui/material";
import { useConversation } from "@11labs/react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useRouter } from 'next/navigation';
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
  const { currentStory } = useSelector(
    (state: RootState) => state.story
  );
  const [fetchingMessages, setFetchingMessages] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  const conversation = useConversation({
    onConnect: () => console.log("Connected"),
    onDisconnect: async () => {
      if (sessionId) {
        await new Promise(resolve => setTimeout(resolve, CONVERSATION_LOAD_TIME));
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

  // Redirect to setup if persona or scenario is not set
  useEffect(() => {
    if (!currentStory) {
      router.push("/setup");
    }
  }, [currentStory, router]);

  useEffect(() => {
    async function setImage() {
      const imageUrl = await generateImage('We want a frontal facing image of the character. Generate an image of the character' + currentStory?.persona.name);
      console.log("background image")
      setBackgroundImage(imageUrl);
    }
    setImage()
  }, [currentStory])

  const startConversation = useCallback(async () => {
    try {
      const result = await startConversationUtil(conversation, currentStory);
      setSessionId(result);
    } catch (error) {
      console.error("Failed to start conversation:", error);
      alert("Failed to start conversation. Please try again later.");
    }
  }, [conversation, currentStory]);

  const stopConversation = useCallback(async () => {
    setFetchingMessages(true)
    await conversation.endSession();
    
    if (sessionId) {
      await new Promise(resolve => setTimeout(resolve, CONVERSATION_LOAD_TIME));
      try {
        const finalMessages = await getConversationDetails(sessionId);
        setMessages(finalMessages);
        console.log("finalMessages", finalMessages);
        setFetchingMessages(false);
        // router.push("/review")
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

        <Paper
          sx={{
            flex: 1,
            mb: 2,
            p: 2,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          {/* Messages display */}

          <Paper
  sx={{
    flex: 1,
    mb: 2,
    p: 2,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    justifyContent: fetchingMessages ? "center" : "flex-start", // Center content when fetching
    alignItems: fetchingMessages ? "center" : "stretch", // Align horizontally to center when fetching
    backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
  }}
>
  
  {fetchingMessages ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 4, // Add padding around CircularProgress
      }}
    >
      <CircularProgress />
      <Typography sx={{ mt: 2 }} variant="body1">
        Loading messages...
      </Typography>
    </Box>
  ) : (
    // Background of this box should be generated dalle image
    <Box sx={{ flex: 1, mb: 2 }} >
      {messages.map((msg, index) => (
        <Box
          key={index}
          sx={{
            mb: 1,
            p: 1,
            backgroundColor: msg.role === "user" ? "#f0f0f0" : "#e3f2fd",
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
</Paper>


          {/* Controls */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                onClick={startConversation}
                disabled={conversation.status === "connected"}
                color="primary"
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

            <Box sx={{ textAlign: "center" }}>
              <Typography>Status: {conversation.status}</Typography>
              <Typography>
                Agent is {conversation.isSpeaking ? "speaking" : "listening"}
              </Typography>
              {sessionId && <Typography>Session ID: {sessionId}</Typography>}
            </Box>
          </Box>
        </Paper>

        
      </Box>
    </Container>
  );
}
