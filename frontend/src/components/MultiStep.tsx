'use client';
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
  'Review and Generate Image',
  'Submit post',
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
  const [poem, setPoem] = React.useState(
    "Let wings unfurl, break chains of old, For women's worth, a story untold. In every field, their voices rise, With equal rights, they reach for the skies. No glass ceilings, no limits to their dreams, Equality's light, a radiant beam. From boardroom to home, they strive as one, For justice and peace, the battle's begun. Together we rise, with hearts aflame, In unity's embrace, we claim our name."
  );

  React.useEffect(() => {
    if (activeStep === 4 && !poem) {
      const generatePoem = async () => {
        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify({
              userInput: 'tell me 10 lines poem on women equality',
            }),
            headers: { 'Content-Type': 'application/json' },
          });

          const result = await response.json();
          if (result.reply) {
            setPoem(result.reply);
          }
        } catch (e) {
          console.log(e);
        }
      };

      generatePoem();
    }
  }, [activeStep, poem]);

  return (
    <div className="max-w-4xl mx-auto w-full mt-6">
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          mt={4}
        >
          <div className="flex items-center gap-1">
            <CheckCircleIcon style={{ fontSize: 60, color: 'green' }} />
            <Typography sx={{ ml: 2 }} variant="h5">
              Post successfully submitted!
            </Typography>
            <Link href="/" className="ml-4 text-blue-500 underline">
              Go back to home
            </Link>
          </div>
          {poem && (
            <Box
              mt={4}
              p={4}
              sx={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.2rem',
                backgroundColor: '#f9f9f9',
                borderLeft: '4px solid #4CAF50',
                color: '#555',
                textAlign: 'center',
                maxWidth: '600px',
                whiteSpace: 'pre-line',
              }}
            >
              {poem.split('. ').map((line, index) => (
                <Typography key={index} variant="body1" gutterBottom>
                  {line.trim()}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      ) : (
        <Box sx={{ mt: 2, mb: 1 }}>{stepContent[activeStep]}</Box>
      )}
    </div>
  );
}
