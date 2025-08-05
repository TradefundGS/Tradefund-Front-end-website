'use client';

import React, { useState } from 'react';
import ForgotPassword from '@/components/Auth/ForgotPassword';
import VerifyOTP from '@/components/Auth/VerifyOTP';
import UpdateForm from '@/components/Auth/UpdateForm';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [mail, setMail] = useState<string | undefined>(undefined);


  const handleNextStep = (currentStep: number, email: string) => {
    setStep(currentStep + 1);
    if(email){

      setMail(email)
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 bg-[url('/hero.png')] bg-cover bg-no-repeat bg-center" style={{ minHeight: 'calc(100vh - 6rem)' }}>
    <div className="md:flex md:flex-1 items-center justify-center bg-cover bg-center" >
      <div className="">
        
      </div>
    </div>
      <div className="md:flex md:flex-1 items-center justify-center bg-transparent">
      <div className="w-full max-w-md">
        
          {step === 1 && <ForgotPassword onNext={(email) => handleNextStep(1, email)} />}
          {/* {step === 2 && <VerifyOTP onNext={() => handleNextStep(2, '')} mail={mail} />} */}
          {/* {step === 3 && <UpdateForm onNext={() => handleNextStep(3, '')} email={mail} />} */}
          {step === 2 && mail && <VerifyOTP onNext={() => handleNextStep(2, '')} mail={mail} />}
          {step === 3 && mail && <UpdateForm onNext={() => handleNextStep(3, '')} email={mail} />}

        </div>
      </div>
    </div>
  );
}
