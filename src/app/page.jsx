'use client';

import { useState } from 'react';
import { Leaf } from 'lucide-react';

import { AnalysisPanel } from '@/components/analysis-panel';
import { ErosionMap } from '@/components/erosion-map';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

const initialLocations = [
  { id: '1', position: { lat: -3.4653, lng: -62.2159 }, name: 'Amazon Rainforest, Brazil', riskLevel: 'Low' },
  { id: '2', position: { lat: 28.3949, lng: 84.1240 }, name: 'Himalayan Foothills, Nepal', riskLevel: 'High' },
  { id: '3', position: { lat: 39.8283, lng: -98.5795 }, name: 'US Great Plains', riskLevel: 'Medium' },
  { id: '4', position: { lat: -28.7, lng: 133.5 }, name: 'Australian Outback', riskLevel: 'High' },
  { id: '5', position: { lat: 64.2, lng: -51.7 }, name: 'Greenland Ice Sheet', riskLevel: 'Low' },
];

const Home = () => {
  const [locations] = useState(initialLocations);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Leaf className="size-5" />
            </div>
            <h1 className="font-headline text-xl font-semibold">Erosion Insights</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <AnalysisPanel
            setResult={setAnalysisResult}
            result={analysisResult}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="absolute left-0 top-0 z-10 p-2">
          <SidebarTrigger />
        </header>
        <ErosionMap
          locations={locations}
          selectedLocation={selectedLocation}
          onSelectLocation={setSelectedLocation}
        />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Home;
