import React, { useState } from 'react';
import LoginForm from './components/loginform';
import CreateProfile from './components/createprofile';

import NotificationAccess from './components/notifaction';
import FirstOTP from './components/firstotp';
import SecondOTP from './components/secondotp';

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const Login: React.FC = () => {
  const [step, setStep] = useState<Step>(1);

  const goToStep = (stepNumber: Step) => {
    setStep(stepNumber);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <LoginForm onSuccess={() => goToStep(2)} />;
      case 2:
        return <FirstOTP onSuccess={() => goToStep(3)} />;
      case 3:
        return <CreateProfile onSuccess={() => goToStep(4)} />;
      case 4:
        return <SecondOTP onSuccess={() => goToStep(5)} />;
      case 5:
        return <NotificationAccess onSuccess={() => goToStep(6)} />;
      case 6:
        window.location.href = '/';
        return null;
      default:
        return <LoginForm onSuccess={() => goToStep(2)} />;
    }
  };

  return (
    <div className="w-full ">
      {renderStep()}
    </div>
  );
};

export default Login;