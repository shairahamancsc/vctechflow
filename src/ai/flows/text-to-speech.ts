'use server';
/**
 * @fileOverview A Text-to-Speech (TTS) flow using Genkit and Google AI.
 *
 * - generateSpeech - A function that converts text to speech and returns audio data.
 * - toWav - A utility function to convert raw PCM audio data to WAV format.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';
import { googleAI } from '@genkit-ai/google-genai';

const toWav = async (
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', (d) => {
      bufs.push(d);
    });
    writer.on('end', () => {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
};

const SpeechOutputSchema = z.object({
  media: z.string().describe("The generated audio as a data URI in WAV format."),
});

const speechFlow = ai.defineFlow(
  {
    name: 'speechFlow',
    inputSchema: z.string(),
    outputSchema: SpeechOutputSchema,
  },
  async (query) => {
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: query,
    });

    if (!media) {
      throw new Error('No media was returned from the TTS model.');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const wavData = await toWav(audioBuffer);

    return {
      media: `data:audio/wav;base64,${wavData}`,
    };
  }
);

export async function generateSpeech(text: string): Promise<z.infer<typeof SpeechOutputSchema>> {
  return speechFlow(text);
}
