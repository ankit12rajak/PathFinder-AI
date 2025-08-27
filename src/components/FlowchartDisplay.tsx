import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FlowchartStep {
  name: string;
  description: string;
}

interface FlowchartProps {
  title: string;
  steps: FlowchartStep[];
}

const FlowchartDisplay: React.FC<FlowchartProps> = ({ title, steps }) => {
  return (
    <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="w-full max-w-md p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
                <h4 className="font-bold text-lg text-primary">{step.name}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="w-6 h-6 text-gray-500 dark:text-gray-400 rotate-90 md:rotate-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FlowchartDisplay;