'use client';

import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ShieldAlert, ShieldCheck, Shield } from 'lucide-react';

const riskColors = {
  Low: 'hsl(140, 70%, 40%)', // green
  Medium: 'hsl(45, 90%, 50%)', // yellow
  High: 'hsl(0, 80%, 55%)', // red
};

const riskIcons = {
  Low: <ShieldCheck className="h-5 w-5 text-white" />,
  Medium: <Shield className="h-5 w-5 text-white" />,
  High: <ShieldAlert className="h-5 w-5 text-white" />,
};

export const ErosionMap = ({ locations, selectedLocation, onSelectLocation }) => {
  return (
    <div className="h-screen w-full relative">
      <Map
        mapId="a2e4b472c695e28a"
        defaultCenter={{ lat: 20, lng: 0 }}
        defaultZoom={2}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        onClick={() => onSelectLocation(null)}
      >
        {locations.map((location) => (
          <AdvancedMarker
            key={location.id}
            position={location.position}
            onClick={() => onSelectLocation(location)}
          >
            <div className="relative">
              <Pin background={riskColors[location.riskLevel]} borderColor={riskColors[location.riskLevel]} glyphColor={"#fff"} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[140%] pointer-events-none">
                 {riskIcons[location.riskLevel]}
              </div>
            </div>
          </AdvancedMarker>
        ))}
      </Map>
      {selectedLocation && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <Card className="w-80 shadow-2xl animate-in fade-in-0 zoom-in-95">
                <CardHeader>
                    <CardTitle className="text-lg">{selectedLocation.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <span style={{color: riskColors[selectedLocation.riskLevel]}}>
                            {riskIcons[selectedLocation.riskLevel]}
                        </span>
                        <p className="font-semibold" style={{color: riskColors[selectedLocation.riskLevel]}}>
                           Risk Level: {selectedLocation.riskLevel}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
};
