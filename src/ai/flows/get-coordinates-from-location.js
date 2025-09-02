'use server';

/**
 * @fileOverview A flow for getting the geographic coordinates (latitude and longitude) from a location description.
 *
 * - getCoordinatesFromLocation - A function that returns the coordinates.
 * - GetCoordinatesFromLocationInput - The input type for the function.
 * - GetCoordinatesFromLocationOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GetCoordinatesFromLocationInputSchema = z.object({
  location: z.string().describe('The description of the location.'),
});

const GetCoordinatesFromLocationOutputSchema = z.object({
  latitude: z.number().describe('The latitude of the location.'),
  longitude: z.number().describe('The longitude of the location.'),
});

export async function getCoordinatesFromLocation(input) {
  return getCoordinatesFromLocationFlow(input);
}

const getCoordinatesFromLocationPrompt = ai.definePrompt({
  name: 'getCoordinatesFromLocationPrompt',
  input: { schema: GetCoordinatesFromLocationInputSchema },
  output: { schema: GetCoordinatesFromLocationOutputSchema },
  prompt: `You are an expert in geography. Given a description of a location, provide its geographic coordinates.

  Location: {{{location}}}

  Return the latitude and longitude.
  `,
});

const getCoordinatesFromLocationFlow = ai.defineFlow(
  {
    name: 'getCoordinatesFromLocationFlow',
    inputSchema: GetCoordinatesFromLocationInputSchema,
    outputSchema: GetCoordinatesFromLocationOutputSchema,
  },
  async (input) => {
    const { output } = await getCoordinatesFromLocationPrompt(input);
    return output;
  }
);
