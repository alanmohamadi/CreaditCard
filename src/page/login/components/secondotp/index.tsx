
import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';

interface SecondOTPProps {
  onSuccess: () => void;
}

interface FormValues {
  otp: string[];
}

const SecondOTP: React.FC<SecondOTPProps> = ({ onSuccess }) => {
  const [timer, setTimer] = useState<number>(30);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const formik = useFormik<FormValues>({
    initialValues: { otp: ['', '', '', ''] },
    validate: (values) => {
      const errors: Partial<Record<keyof FormValues, string>> = {};
      if (values.otp.some(d => d === '')) {
        errors.otp = 'Please enter all 4 digits';
      }
      return errors;
    },
    onSubmit: (values: FormValues) => {
      const otp = values.otp.join('');
      if (otp === '5678') {
        localStorage.setItem('finalOTP', otp);
        onSuccess();
      } else {
        setError('Invalid OTP. Please try again.');
        formik.setErrors({ otp: 'Invalid OTP' });
      }
    },
  });

  const handleChange = (index: number, value: string) => {
    const newOtp = [...formik.values.otp];
    newOtp[index] = value.replace(/\D/g, '');
    formik.setFieldValue('otp', newOtp);
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
    if (formik.errors.otp || error) {
      setError('');
      formik.setErrors({});
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !formik.values.otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (canResend) {
      setTimer(30);
      setCanResend(false);
      setError('');
      formik.setValues({ otp: ['', '', '', ''] });
      inputRefs.current[0]?.focus();
    }
  };

  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    inputRefs.current[index] = el;
  };

  return (
    <div className="w-full px-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2">4 digit code</h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          Please enter 4 digit OTP verification code sent to your email
        </p>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="flex gap-3 justify-center mb-2">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              ref={setInputRef(index)}
              type="text"
              maxLength={1}
              value={formik.values.otp[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-14 h-14 text-center text-2xl font-semibold border-2 rounded-xl outline-none transition-colors ${
                formik.errors.otp || error
                  ? 'border-red-500 animate-[shake_0.3s_ease]'
                  : 'border-gray-200 focus:border-blue-600'
              }`}
              autoFocus={index === 0}
            />
          ))}
        </div>

        {(error || formik.errors.otp) && (
          <div className="text-red-500 text-sm text-center mt-2 mb-3">
            {error || formik.errors.otp}
          </div>
        )}

        <div className="text-center mt-5 mb-7">
          {canResend ? (
            <button
              type="button"
              className="text-blue-600 text-sm font-semibold hover:underline bg-transparent border-none cursor-pointer"
              onClick={handleResend}
            >
              Resend code
            </button>
          ) : (
            <span className="text-gray-500 text-sm">Resend code in {timer} sec</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Verify
        </button>
      </form>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default SecondOTP;