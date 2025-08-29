'use client';
import { APIProvider } from '@vis.gl/react-google-maps';
import { Toaster } from "@/components/ui/toaster"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export function Providers({ children }) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE' || apiKey === 'dummy_key') {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground p-4">
                <Card className="max-w-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="text-destructive" />
                      Configuration Error
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>The Google Maps API key is missing or invalid. To enable map functionality, please get a valid API key from the Google Cloud Console and add it to a <code className="font-code bg-muted p-1 rounded-sm">.env.local</code> file in your project root with the following content:</p>
                    <pre className="mt-2 bg-muted p-2 rounded-sm text-sm"><code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE</code></pre>
                  </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <APIProvider apiKey={apiKey}>
            {children}
            <Toaster />
        </APIProvider>
    );
}