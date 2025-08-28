"use client";

import type { FC, Dispatch, SetStateAction } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FileText, Loader2, Wand2 } from 'lucide-react';

import { getErosionSummary } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { ErosionReport } from '@/lib/types';
import { RiskReport } from './risk-report';
import { Card, CardContent } from './ui/card';

interface AnalysisPanelProps {
  setResult: Dispatch<SetStateAction<ErosionReport | null>>;
  result: ErosionReport | null;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}

const formSchema = z.object({
  locationDetails: z.string().min(30, {
    message: 'Please provide at least 30 characters for a more accurate analysis.',
  }).max(500, {
    message: "Location details cannot exceed 500 characters."
  }),
});

export const AnalysisPanel: FC<AnalysisPanelProps> = ({ setResult, result, setIsLoading, isLoading }) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      locationDetails: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    const { data, error } = await getErosionSummary(values);
    if (error || !data) {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: error || 'An unknown error occurred.',
      });
    } else {
      setResult(data);
      toast({
        title: 'Analysis Complete',
        description: 'Erosion risk report generated successfully.',
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="p-2 space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="locationDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Custom Location Analysis</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the location: e.g., 'A steep, deforested hillside in a tropical region with heavy rainfall and clay-rich soil.'"
                    className="resize-none"
                    rows={6}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide environmental factors for an AI-powered risk assessment.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Analyze Risk
          </Button>
        </form>
      </Form>
      
      <div className="pt-4">
        {isLoading && (
            <Card>
                <CardContent className="p-6 flex flex-col items-center justify-center text-center text-muted-foreground space-y-2">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="font-semibold">Analyzing Data...</p>
                    <p className="text-sm">The AI is processing the location details. This may take a moment.</p>
                </CardContent>
            </Card>
        )}
        {result && <RiskReport report={result} />}
        {!isLoading && !result && (
             <Card>
                <CardContent className="p-6 flex flex-col items-center justify-center text-center text-muted-foreground space-y-2">
                    <FileText className="h-8 w-8" />
                    <p className="font-semibold">Your Report Awaits</p>
                    <p className="text-sm">Enter location details above to generate a new erosion risk report.</p>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
};
