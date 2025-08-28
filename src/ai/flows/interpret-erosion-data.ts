'use server';

/**
 * @fileOverview Interprets soil erosion data to identify vulnerable areas and reasons for high risk.
 *
 * - interpretErosionData - A function that interprets soil data and identifies high-risk areas.
 * - InterpretErosionDataInput - The input type for the interpretErosionData function.
 * - InterpretErosionDataOutput - The return type for the interpretErosionData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InterpretErosionDataInputSchema = z.object({
  soilComposition: z
    .string()
    .describe('Detailed composition of the soil, including organic matter content, texture, and mineral distribution.'),
  topography: z
    .string()
    .describe('Description of the topography, including slope angles, elevation changes, and landscape features.'),
  climateData: z
    .string()
    .describe('Relevant climate data, including average rainfall, temperature variations, and wind patterns.'),
  landUse: z
    .string()
    .describe('Current land use practices, such as agriculture, deforestation, or urbanization.'),
  vegetationCover: z
    .string()
    .describe('Description of the vegetation cover, including type, density, and health of the vegetation.'),
});
export type InterpretErosionDataInput = z.infer<typeof InterpretErosionDataInputSchema>;

const InterpretErosionDataOutputSchema = z.object({
  highRiskAreas: z
    .string()
    .describe('Identification of specific areas with high erosion risk, including coordinates or location names.'),
  riskFactors: z
    .string()
    .describe(
      'Explanation of the primary factors contributing to the high erosion risk in identified areas, such as soil type, slope, or land use.'
    ),
  recommendedInterventions: z
    .string()
    .describe('Specific recommendations for interventions to mitigate erosion risk in the identified high-risk areas.'),
});
export type InterpretErosionDataOutput = z.infer<typeof InterpretErosionDataOutputSchema>;

export async function interpretErosionData(
  input: InterpretErosionDataInput
): Promise<InterpretErosionDataOutput> {
  return interpretErosionDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interpretErosionDataPrompt',
  input: {schema: InterpretErosionDataInputSchema},
  output: {schema: InterpretErosionDataOutputSchema},
  prompt: `You are an expert in soil erosion analysis.

  Analyze the provided soil data to identify areas with high erosion risk and explain the contributing factors.
  Provide specific recommendations for interventions to mitigate erosion in these areas.

  Soil Composition: {{{soilComposition}}}
  Topography: {{{topography}}}
  Climate Data: {{{climateData}}}
  Land Use: {{{landUse}}}
  Vegetation Cover: {{{vegetationCover}}}

  Highlight the most vulnerable areas and the reasons behind their high risk.
  Prioritize areas for intervention based on the severity of the risk and potential impact.
  Ensure that the output adheres to the schema descriptions.`,
});

const interpretErosionDataFlow = ai.defineFlow(
  {
    name: 'interpretErosionDataFlow',
    inputSchema: InterpretErosionDataInputSchema,
    outputSchema: InterpretErosionDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
