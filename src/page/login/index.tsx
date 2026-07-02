import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import LoginForm from './components/loginform';
import CreateProfile from './components/createprofile';
import NotificationAccess from './components/notifaction';
import FirstOTP from './components/firstotp';
import SecondOTP from './components/secondotp';
import { useAuth } from '../../core/provider/AuthContext';

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const Login: React.FC = () => {
  const [step, setStep] = useState<Step>(1);
  const { login } = useAuth();
  const navigate = useNavigate();

  const goToStep = (stepNumber: Step) => {
    setStep(stepNumber);
  };

  const handleComplete = () => {
    login();
    navigate('/', { replace: true });
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
        handleComplete();
        return null;
      default:
        return <LoginForm onSuccess={() => goToStep(2)} />;
    }
  };

  return (
    <div className="w-full">
      {renderStep()}
    </div>
  );
};

export default Login;