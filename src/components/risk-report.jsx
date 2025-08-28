'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, MapPin, Shield, ShieldAlert, ShieldCheck, TrendingDown } from 'lucide-react';

const riskLevelStyles = {
  Low: {
    icon: <ShieldCheck className="h-6 w-6" />,
    color: 'text-green-600',
  },
  Medium: {
    icon: <Shield className="h-6 w-6" />,
    color: 'text-yellow-600',
  },
  High: {
    icon: <ShieldAlert className="h-6 w-6" />,
    color: 'text-red-600',
  },
};

export const RiskReport = ({ report }) => {
  const { icon, color } = riskLevelStyles[report.riskLevel] || riskLevelStyles.Medium;

  return (
    <div className="space-y-4 animate-in fade-in-0 duration-500">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5" />
            AI-Generated Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{report.summary}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <span className={color}>{icon}</span>
              Risk Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${color}`}>{report.riskLevel}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <TrendingDown className="h-6 w-6 text-primary" />
              Soil Loss
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{report.estimatedSoilLoss.split(' ')[0]}</p>
            <p className="text-xs text-muted-foreground">tons/acre/year</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5" />
            At-Risk Areas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{report.atRiskAreas}</p>
        </CardContent>
      </Card>
    </div>
  );
};
