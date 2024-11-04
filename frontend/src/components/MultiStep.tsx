import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { CheckCircleIcon } from 'lucide-react';
import Link from 'next/link';

const steps = [
  'Fill out the form',
  'Review your post and share it',
  'Submission complete',
];

interface HorizontalLinearStepperProps {
  activeStep: number;
  stepContent: React.ReactNode[];
}

export default function HorizontalLinearStepper({
  activeStep,
  stepContent,
}: HorizontalLinearStepperProps) {
  return (
    <div className={`max-w-4xl mx-auto w-full mt-6`}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
          <CheckCircleIcon style={{ fontSize: 60, color: 'green' }} />
          <Typography sx={{ ml: 2 }} variant="h5">
            Post successfully submitted!
          </Typography>
          <Link href="/" className="ml-4 text-blue-500 underline">
            Go back to home
          </Link>
        </Box>
      ) : (
        <Box sx={{ mt: 2, mb: 1 }}>{stepContent[activeStep]}</Box>
      )}
    </div>
  );
}
