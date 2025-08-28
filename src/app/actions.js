'use server';

import { generateErosionSummary } from '@/ai/flows/generate-erosion-summary';
import { z } from 'zod';

const formSchema = z.object({
  locationDetails: z.string().min(10, 'Please provide more details about the location.'),
});



export async function getErosionSummary(values) {
  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.issues.map(issue => issue.message).join(' ');
    return { data: null, error: errorMessages };
  }

  try {
    const output = await generateErosionSummary(validatedFields.data);
    return { data: output, error: null };
  } catch (e) {
    console.error('Error generating erosion summary:', e);
    return { data: null, error: 'Failed to generate erosion summary due to an unexpected server error. Please try again later.' };
  }
}
