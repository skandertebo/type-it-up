import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';

@Injectable()
export class GameGenerationService {
  private readonly logger = new Logger(GameGenerationService.name);
  private readonly geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-thinking-exp-01-21:generateContent';  
  private readonly apiKey: string | undefined;

  private readonly systemPrompt = `You are a typing test generator. Your task is to create keyboard-friendly text for speed typing competitions. Follow these rules:
    1. Generate text with 60-70 English words total.
    2. Ensure sentences are grammatically correct.
    3. Words should be between 3-12 characters.
    4. Combine words into meaningful phrases.
    5. Ensure good readability and flow.
    6. Avoid repetition of words or phrases.
    7. Output ONLY the raw text for the typing competition, no Markdown or formatting.`;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('GEMINI_API_KEY');
  }

  async generateText(
    difficulty: 'easy' | 'medium' | 'hard' = 'medium',
    allowPunctuation = false,
    allowNumbers = false,
  ) {
    try {
      const difficultyPrompts = {
        easy: `Generate easy-level typing test text. Use only common vocabulary and simple sentence structures.`,
        medium: `Generate medium-level typing test text. Use a mix of common and intermediate vocabulary with moderately complex sentences.`,
        hard: `Generate hard-level typing test text. Use advanced vocabulary and complex sentence structures.`,
      };

      let additionalInstructions = '';
      if (allowPunctuation) {
        additionalInstructions += 'Include appropriate punctuation marks like commas, periods, question marks, and exclamation points. ';
      }else{
        additionalInstructions += "Do not add any punctuations. ";
      }
      if (allowNumbers) {
        additionalInstructions += 'Include actual number characters in the text, either as standalone digits or as part of words (e.g., "2nd time", "10 apples"). ';
      }else{
          additionalInstructions += "Do not add any number. ";  
      }


      const userPrompt = `${difficultyPrompts[difficulty] || difficultyPrompts.medium}${additionalInstructions}`;

      const response = await axios.post(
        `${this.geminiUrl}?key=${this.apiKey}`,
        {
          contents: [
            {
              role: 'model',
              parts: [
                {
                  text: this.systemPrompt,
                },
              ],
            },
            {
              role: 'user',
              parts: [
                {
                  text: userPrompt,
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        const generatedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!generatedText) {
          throw new InternalServerErrorException('Invalid response format from Gemini');
        }

        const cleanedText = generatedText
          .replace(/\s+/g, ' ') 
          .trim();

        this.logger.log(`Generated Text (${difficulty}): ${cleanedText}`);
        return {
          success: true,
          data: {
            text: cleanedText,
            words: cleanedText.split(' '),
            length: cleanedText.length,
          },
        };
      } else {
        throw new InternalServerErrorException('Error generating text');
      }

    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error('Gemini API Error:', error.response?.data);
        throw new InternalServerErrorException({
          message: 'Error generating text',
          details: error.response?.data,
        });
      }
      this.logger.error('Unexpected Error:', error);
      throw error;
    }
  }
}