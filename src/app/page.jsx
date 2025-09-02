'use client';

import { useState, useEffect } from 'react';
import { Leaf, LogIn, UserPlus, Mail, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

import { AnalysisPanel } from '@/components/analysis-panel';
import { ErosionMap } from '@/components/erosion-map';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';

const initialLocations = [
  { id: '1', position: { lat: -3.4653, lng: -62.2159 }, name: 'Amazon Rainforest, Brazil', riskLevel: 'Low', estimatedSoilLoss: '5 tons/acre/year', atRiskAreas: 'Riverbanks and deforested zones.' },
  { id: '2', position: { lat: 28.3949, lng: 84.1240 }, name: 'Himalayan Foothills, Nepal', riskLevel: 'High', estimatedSoilLoss: '50 tons/acre/year', atRiskAreas: 'Steep slopes with sparse vegetation.' },
  { id: '3', position: { lat: 39.8283, lng: -98.5795 }, name: 'US Great Plains', riskLevel: 'Medium', estimatedSoilLoss: '20 tons/acre/year', atRiskAreas: 'Areas with intensive agriculture.' },
  { id: '4', position: { lat: -28.7, lng: 133.5 }, name: 'Australian Outback', riskLevel: 'High', estimatedSoilLoss: '40 tons/acre/year', atRiskAreas: 'Dry, sparsely vegetated regions.' },
  { id: '5', position: { lat: 64.2, lng: -51.7 }, name: 'Greenland Ice Sheet', riskLevel: 'Low', estimatedSoilLoss: '2 tons/acre/year', atRiskAreas: 'Coastal areas during summer melt.' },
];

const Home = () => {
  const [locations, setLocations] = useState([]);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const storedLocations = localStorage.getItem('erosion-analysis-history');
    if (storedLocations) {
      setLocations(JSON.parse(storedLocations));
    } else {
      setLocations(initialLocations);
    }
  }, []);

  useEffect(() => {
    // Prevent storing the initial hardcoded locations on first load
    if (locations.length > initialLocations.length || (locations.length > 0 && !localStorage.getItem('erosion-analysis-history'))) {
        localStorage.setItem('erosion-analysis-history', JSON.stringify(locations));
    }
  }, [locations]);
  
  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);
    if (result && result.position) {
        const newLocation = {
            id: new Date().toISOString(), // unique id
            ...result,
        };
        setLocations(prevLocations => [...prevLocations, newLocation]);
        setSelectedLocation(newLocation);
    }
  }

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
            setResult={handleAnalysisComplete}
            result={analysisResult}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
          <SidebarSeparator />
          <SidebarMenu>
             <SidebarMenuItem>
                <SidebarMenuButton asChild size="lg">
                    <Link href="/dashboard">
                        <LayoutDashboard />
                        Dashboard
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild size="lg">
                    <Link href="/login">
                        <LogIn />
                        Login
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild size="lg">
                    <Link href="/register">
                        <UserPlus />
                        Register
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild size="lg">
                    <Link href="/contact">
                        <Mail />
                        Contact
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
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
