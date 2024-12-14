"use server";

import OpenAI from "openai"; // Default export from the new SDK.

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // API key configuration in `next-app/.env.local` file.
});

// Function to call OpenAI API
export const getAnswerFromOpenAI = async (prompt: string, transcript: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: prompt},
        { role: "user", content: transcript }
    ],
      max_tokens: 300,
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating answer from OpenAI:', error);
    throw error;
  }
};

