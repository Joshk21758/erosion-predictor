'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const riskVariantMap = {
  Low: 'default',
  Medium: 'secondary',
  High: 'destructive',
};

export default function DashboardPage() {
  const [history, setHistory] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedHistory = localStorage.getItem('erosion-analysis-history');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  if (!isClient) {
    return null; 
  }

  return (
    <div className="flex min-h-screen flex-col bg-background p-4 sm:p-6 md:p-8">
      <div className="flex items-center mb-6">
        <Button asChild variant="ghost" size="icon" className="mr-2">
            <Link href="/">
                <ArrowLeft />
            </Link>
        </Button>
        <h1 className="text-3xl font-bold">Analysis History</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Custom Location Reports</CardTitle>
        </CardHeader>
        <CardContent>
          {history.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Location</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Estimated Soil Loss</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <Badge variant={riskVariantMap[item.riskLevel] || 'default'}>
                        {item.riskLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.estimatedSoilLoss}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No analysis history found.</p>
              <p className="text-sm">Perform an analysis on the main page to see the results here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
