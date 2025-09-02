'use server';

import { generateErosionSummary } from '@/ai/flows/generate-erosion-summary';
import { getCoordinatesFromLocation } from '@/ai/flows/get-coordinates-from-location';
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
    const [summaryOutput, coordsOutput] = await Promise.all([
      generateErosionSummary(validatedFields.data),
      getCoordinatesFromLocation({ location: validatedFields.data.locationDetails })
    ]);

    if (!summaryOutput || !coordsOutput) {
        throw new Error('Failed to get complete analysis from AI.');
    }
    
    const output = {
        ...summaryOutput,
        name: validatedFields.data.locationDetails.substring(0, 50) + '...', // Truncate for display
        position: {
            lat: coordsOutput.latitude,
            lng: coordsOutput.longitude
        }
    };
    
    return { data: output, error: null };
  } catch (e) {
    console.error('Error generating erosion summary:', e);
    return { data: null, error: 'Failed to generate erosion summary due to an unexpected server error. Please try again later.' };
  }
}
