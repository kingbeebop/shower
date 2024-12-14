'use client'

import React, { use, useEffect, useState } from 'react';
import { AppDispatch } from '../../redux/store';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '@/redux/slices/conversationSlice';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { setConversationSetup } from '@/redux/slices/conversationSlice';

export default function Review() {
  const dispatch = useDispatch() as AppDispatch;
  const conversation = useSelector((state: RootState) => state.conversation);

  const [reviewData, setReviewData] = useState({
    rating: '',
    feedback: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setReviewData({
      ...reviewData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log('Review Data:', reviewData);
    // Handle review submission logic here, such as sending data to an API or updating the Redux state
  };

  useEffect(()=> {
    dispatch(addMessage(
        {
        text: "hello",
        sender: "persona"
    }
    ))
    dispatch(addMessage(
        {
        text: "hello there user",
        sender: "user"
    }
    ))
  }, [])

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={4}>
        {/* Conversation Display */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Conversation
          </Typography>
          <Box
            sx={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: 2,
              height: '400px',
              overflowY: 'auto',
            }}
          >
            {conversation.messages.length > 0 ? (
              conversation.messages.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    marginBottom: 2,
                    textAlign: message.sender === 'user' ? 'right' : 'left',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 'bold',
                      color: message.sender === 'user' ? 'blue' : 'green',
                    }}
                  >
                    {message.sender === 'user' ? 'You' : conversation.currentPersona}
                  </Typography>
                  <Typography variant="body1">{message.text}</Typography>
                  <Typography variant="caption" sx={{ color: '#888' }}>
                    {new Date(message.timestamp).toLocaleString()}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography>No conversation messages available.</Typography>
            )}
          </Box>
        </Grid>

        {/* Review Form */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Review the Conversation
          </Typography>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              padding: 2,
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
          >
            {/* Rating Question */}
            <Typography variant="body1">How did you like this conversation on a scale of 1 to 5?</Typography>
            <RadioGroup
              name="rating"
              value={reviewData.rating}
              onChange={handleChange}
              row
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <FormControlLabel
                  key={value}
                  value={value.toString()}
                  control={<Radio />}
                  label={value.toString()}
                />
              ))}
            </RadioGroup>

            {/* Feedback Question */}
            <TextField
              name="feedback"
              label="Additional Feedback"
              multiline
              rows={4}
              value={reviewData.feedback}
              onChange={handleChange}
              fullWidth
            />

            {/* Submit Button */}
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit Review
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
