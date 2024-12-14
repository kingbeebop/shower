"use client";

import { Box, Container, Typography, Paper, Chip, Button } from "@mui/material";
import { useConversation } from "@11labs/react";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
const AGENT_ID = process.env.NEXT_PUBLIC_AGENT_ID || "";

export default function Conversation() {
  const { currentPersona, currentScenario } = useSelector(
    (state: RootState) => state.conversation
  );

  const conversation = useConversation({
    onConnect: () => console.log("Connected"),
    onDisconnect: () => console.log("Disconnected"),
    onMessage: (message) => console.log("Message:", message),
    onError: (error) => console.error("Error:", error),
  });

  const startConversation = useCallback(async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      // Start the conversation with your agent
      await conversation.startSession({
        agentId: AGENT_ID,
        overrides: {
          agent: {
            prompt: {
              prompt: `You are ${currentPersona.name} and you are in the ${currentScenario.name} scenario.`,
            },
            firstMessage: `Hey`,
          },
        },
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  }, [conversation, currentPersona, currentScenario]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

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
            Conversation with {currentPersona.name}
          </Typography>
          <Chip
            label={currentScenario.name}
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
            alignItems: "center",
            justifyContent: "center",
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
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
