'use client'

import { Box, Container, Typography, Paper, TextField, Button, Avatar, Chip, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { addMessage, setRecordingState, setProcessingState, setPlayingState } from '../../redux/slices/conversationSlice';
import { useState, useRef } from 'react';
import { AudioRecorder, AudioProcessor } from '../../services/audioService';

export default function Conversation() {
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState('');
  const audioRecorder = useRef(new AudioRecorder());
  
  const { 
    currentPersona, 
    currentScenario, 
    messages,
    isRecording,
    isProcessing,
    isPlaying 
  } = useSelector((state: RootState) => state.conversation);

  const handleStartRecording = async () => {
    try {
      await audioRecorder.current.startRecording();
      dispatch(setRecordingState(true));
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const handleStopRecording = async () => {
    try {
      dispatch(setRecordingState(false));
      dispatch(setProcessingState(true));
      
      // Get the audio blob from the recorder
      const audioBlob = await audioRecorder.current.stopRecording();
      
      // Convert speech to text
      const text = await AudioProcessor.convertSpeechToText(audioBlob);
      
      // Add user's message
      dispatch(addMessage({
        text,
        sender: 'user'
      }));

      // Generate AI response
      const aiResponse = await AudioProcessor.generateAIResponse(
        text,
        currentPersona.name,
        currentScenario.name
      );

      // Convert AI response to speech
      const audioUrl = await AudioProcessor.convertTextToSpeech(aiResponse);
      
      // Add AI's message
      dispatch(addMessage({
        text: aiResponse,
        sender: 'persona',
        audioUrl
      }));

      dispatch(setProcessingState(false));
      dispatch(setPlayingState(true));
      
      // Play the audio
      await AudioProcessor.playAudio(audioUrl);
      
      dispatch(setPlayingState(false));
    } catch (error) {
      console.error('Error processing audio:', error);
      dispatch(setProcessingState(false));
      dispatch(setPlayingState(false));
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      dispatch(setProcessingState(true));
      
      // Add user's message
      dispatch(addMessage({
        text: newMessage.trim(),
        sender: 'user'
      }));
      setNewMessage('');
      
      try {
        // Generate AI response
        const aiResponse = await AudioProcessor.generateAIResponse(
          newMessage.trim(),
          currentPersona.name,
          currentScenario.name
        );

        // Convert to speech
        const audioUrl = await AudioProcessor.convertTextToSpeech(aiResponse);
        
        // Add AI's message
        dispatch(addMessage({
          text: aiResponse,
          sender: 'persona',
          audioUrl
        }));

        dispatch(setProcessingState(false));
        dispatch(setPlayingState(true));
        
        // Play the audio
        await AudioProcessor.playAudio(audioUrl);
        
        dispatch(setPlayingState(false));
      } catch (error) {
        console.error('Error generating response:', error);
        dispatch(setProcessingState(false));
        dispatch(setPlayingState(false));
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          {messages.map((message) => (
            <Box 
              key={message.id}
              sx={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: 1,
                alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              {message.sender === 'persona' && (
                <Avatar>{currentPersona.name[0]}</Avatar>
              )}
              <Paper 
                sx={{ 
                  p: 2, 
                  bgcolor: message.sender === 'user' ? 'primary.light' : 'grey.100',
                  color: message.sender === 'user' ? 'white' : 'text.primary',
                  maxWidth: '80%'
                }}
              >
                <Typography>
                  {message.text}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Paper>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton 
            color={isRecording ? "error" : "primary"}
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            disabled={isProcessing || isPlaying}
          >
            {isRecording ? <StopIcon /> : <MicIcon />}
          </IconButton>
          <TextField
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            variant="outlined"
            multiline
            maxRows={4}
            disabled={isRecording || isProcessing || isPlaying}
          />
          <Button 
            variant="contained" 
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isRecording || isProcessing || isPlaying}
            sx={{ minWidth: 'auto', px: 3 }}
          >
            <SendIcon />
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 