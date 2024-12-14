'use client'

import { Box, Container, Typography, Paper, TextField, Button, Avatar, Chip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { addMessage } from '../../redux/slices/conversationSlice';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Conversation() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [newMessage, setNewMessage] = useState('');
  
  const { currentPersona, currentScenario, messages } = useSelector(
    (state: RootState) => state.conversation
  );

  // Redirect if no persona or scenario is selected
  if (!currentPersona || !currentScenario) {
    router.push('/setup');
    return null;
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      dispatch(addMessage({
        text: newMessage.trim(),
        sender: 'user'
      }));
      setNewMessage('');
      
      // Simulate persona response (you can replace this with actual AI response later)
      setTimeout(() => {
        dispatch(addMessage({
          text: "I understand your request. Let's discuss this further.",
          sender: 'persona'
        }));
      }, 1000);
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
            Conversation with {currentPersona}
          </Typography>
          <Chip
            label={currentScenario}
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
                <Avatar>{currentPersona[0]}</Avatar>
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
          <TextField
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            variant="outlined"
            multiline
            maxRows={4}
          />
          <Button 
            variant="contained" 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            sx={{ minWidth: 'auto', px: 3 }}
          >
            <SendIcon />
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 