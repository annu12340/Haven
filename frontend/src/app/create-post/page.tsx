'use client';

import React, { useState, useEffect } from 'react';
import { InputForm } from '@/components/InputForm';
import Share from '@/components/Share';
import { useClerk } from '@clerk/nextjs';
import HorizontalLinearStepper from '@/components/MultiStep';

function Page() {
  const [resImage, setResImage] = useState<string | null>(null);
  const { user } = useClerk();
  const [activeStep, setActiveStep] = useState(0);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    // Move to the next step when resImage is set
    if (resImage) {
      setActiveStep(1);
    }
  }, [resImage]);

  useEffect(() => {
    if (shared) {
      setActiveStep(3);
    }
  }, [shared]);

  const stepContent = [
    <InputForm key="step1" setResImage={setResImage} />, // Step 1
    <Share key="step2" imageURL={resImage || ''} setShared={setShared} />, // Step 2
  ];

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center -mt-[150px]">
          <h1 className="text-2xl font-bold">Please sign in to continue</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <HorizontalLinearStepper
        activeStep={activeStep}
        stepContent={stepContent}
      />
    </div>
  );
}

export default Page;
