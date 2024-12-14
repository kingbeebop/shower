'use client'

import React, { use, useEffect, useState } from 'react';
import { AppDispatch } from '../../redux/store';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '@/redux/slices/conversationSlice';
import OpenAI from 'openai';
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
import { text } from 'stream/consumers';
import { getAnswerFromOpenAI } from './functions';
import ReactMarkdown from 'react-markdown'

export default function Review() {
  const dispatch = useDispatch() as AppDispatch;
  const conversation = useSelector((state: RootState) => state.conversation);

  const [reviewData, setReviewData] = useState({
    rating: '',
    feedback: '',
  });

  const [aiReview, setAiReview] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setReviewData({
      ...reviewData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    // Prepare conversation data for OpenAI API
    const prompt = 'Please act as an objective observer and provide a review of the following conversation. Include feedback on tone, clarity, and overall interaction quality'
  
    // const client = new OpenAI({
    //     apiKey: apiKey, // This is the default and can be omitted
    //   });
    const conversationMessages = conversation.messages.map(
        (message) =>
          `${message.sender === 'user' ? 'User' : 'Persona'}: ${message.text}`
      ).join('\n')

    try {
  
      // Call OpenAI API with the updated method
    //   const response = await client.chat.completions.create({
    //     model: 'text-davinci-003', // Use the appropriate model
    //     messages: [{
    //         role: "system",
    //         content: prompt,
    //     }, {
    //         role: "user",
    //         content: conversationMessages
    //     }],
    //     max_tokens: 500,
    //     temperature: 0.7,
    //   });
    
  
      // Extract the review from the response
      const aiReview = await getAnswerFromOpenAI(prompt, conversationMessages)
  
      if(aiReview) {
        // Update reviewData with the AI-generated review
        // setReviewData({
        //   rating: '', // You can leave the rating empty or set a placeholder value
        //   feedback: aiReview,
        // });
        setAiReview(aiReview)
      } else {
        console.error('No review received from OpenAI');
      }
    } catch (error) {
      console.error('Error fetching review from OpenAI:', error);
    }
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
                    {message.sender === 'user' ? 'You' : conversation.currentPersona.name}
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
          <Button
          variant="contained"
          size="large"
          sx={{ mt: 4 }}
            href='/'>
                Back to Home
            </Button>
        </Grid>

        {aiReview.length == 0 && 
        // {/* Review Form */}
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
            }
            {aiReview.length != 0 && 
                <Grid item xs={12} md={6}>
                {AIReviewDisplay(aiReview)}
                </Grid>
            }
      </Grid>
    </Box>
  );
}

const AIReviewDisplay = (aiReview: string) => {
    return (
      <Box
        sx={{
          padding: 2,
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Typography variant="h5" gutterBottom>
          AI-Generated Review
        </Typography>
  
        <ReactMarkdown>{aiReview}</ReactMarkdown>
      </Box>
    );
  };
  