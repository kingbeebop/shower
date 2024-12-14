export class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private stream: MediaStream | null = null;

  async startRecording(): Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.start();
    } catch (error) {
      console.error('Error starting recording:', error);
      throw error;
    }
  }

  stopRecording(): Promise<Blob> {
    return new Promise((resolve) => {
      if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
          this.audioChunks = [];
          if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
          }
          resolve(audioBlob);
        };
        this.mediaRecorder.stop();
      } else {
        resolve(new Blob());
      }
    });
  }
}

export class AudioProcessor {
  static async convertSpeechToText(audioBlob: Blob): Promise<string> {
    // This is a placeholder for the actual speech-to-text API implementation
    // You can implement Whisper API, Google Speech-to-Text, or any other service here
    const formData = new FormData();
    formData.append('audio', audioBlob);
    
    try {
      // Replace with your actual speech-to-text API endpoint
      const response = await fetch('/api/speech-to-text', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error('Error converting speech to text:', error);
      throw error;
    }
  }

  static async generateAIResponse(text: string, persona: string, scenario: string): Promise<string> {
    // This is a placeholder for the OpenAI API call
    try {
      const response = await fetch('/api/generate-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userMessage: text,
          persona,
          scenario
        })
      });
      
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error generating AI response:', error);
      throw error;
    }
  }

  static async convertTextToSpeech(text: string): Promise<string> {
    // This is a placeholder for the text-to-speech API implementation
    try {
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      });
      
      const data = await response.json();
      return data.audioUrl;
    } catch (error) {
      console.error('Error converting text to speech:', error);
      throw error;
    }
  }

  static async playAudio(audioUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const audio = new Audio(audioUrl);
      audio.onended = () => resolve();
      audio.onerror = (error) => reject(error);
      audio.play().catch(reject);
    });
  }
} 