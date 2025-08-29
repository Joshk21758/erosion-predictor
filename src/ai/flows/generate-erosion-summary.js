'use server';

/**
 * @fileOverview A flow for generating a summarized report of erosion risk factors and estimated soil loss for a specific location using AI.
 *
 * - generateErosionSummary - A function that generates the erosion summary report.
 * - GenerateErosionSummaryInput - The input type for the generateErosionSummary function.
 * - GenerateErosionSummaryOutput - The return type for the generateErosionSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

//Erosion summary form schema
const GenerateErosionSummaryInputSchema = z.object({
  locationDetails: z
    .string()
    .describe(
      'Detailed description of the location, including environmental factors such as soil type, slope, vegetation cover, and climate data.'
    ),
});

//Erosion summary output schema
const GenerateErosionSummaryOutputSchema = z.object({
  summary: z.string().describe('A summarized report of the key erosion risk factors and estimated soil loss for the specified location.'),
  riskLevel: z.enum(['Low', 'Medium', 'High']).describe('The overall erosion risk level for the location.'),
  estimatedSoilLoss: z.string().describe('The estimated soil loss in tons per acre per year.'),
  atRiskAreas: z.string().describe('Description of specific areas within the location that are most at risk of erosion.'),
});

//function to generate summary report
export async function generateErosionSummary(input) {
  return generateErosionSummaryFlow(input);
}

//Function to output summary prompt
const generateErosionSummaryPrompt = ai.definePrompt({
  name: 'generateErosionSummaryPrompt',
  input: {schema: GenerateErosionSummaryInputSchema},
  output: {schema: GenerateErosionSummaryOutputSchema},
  prompt: `You are an expert in soil science and environmental analysis. You are tasked with generating a concise report detailing the erosion risk for a specific location.

  Based on the location details provided, identify the key erosion risk factors, estimate the potential soil loss, determine the overall risk level (Low, Medium, or High), and describe the areas most vulnerable to erosion.

  Location Details: {{{locationDetails}}}

  Provide the output in the requested JSON format, populating the riskLevel, estimatedSoilLoss, and atRiskAreas fields with your analysis. Use your best judgement.
  Ensure to fill the summary field with a summary of the key erosion risk factors and estimated soil loss for the specified location.
`,
});

const generateErosionSummaryFlow = ai.defineFlow(
  {
    name: 'generateErosionSummaryFlow',
    inputSchema: GenerateErosionSummaryInputSchema,
    outputSchema: GenerateErosionSummaryOutputSchema,
  },
  async input => {
    const {output} = await generateErosionSummaryPrompt(input);
    return output;
  }
);
