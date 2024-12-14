'use server'

import axios from "axios";

export const generateImage = async (prompt: string): Promise<string | null> => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          prompt,
          n: 1,
          size: "1024x1024",
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("gogog")
      return response.data.data[0].url;
    } catch (error) {
      console.error("Error generating image:", error);
      return null;
    }
  };
