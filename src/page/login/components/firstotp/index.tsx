import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';

interface FirstOTPProps {
  onSuccess: () => void;
  goToStep?: (step: number) => void;
}

interface FormValues {
  otp: string[];
}

const FirstOTP: React.FC<FirstOTPProps> = ({ onSuccess, goToStep }) => {
  const phoneNumber = localStorage.getItem('phoneNumber') || '5551234567';
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
      if (otp === '1234') {
        localStorage.setItem('userOTP', otp);
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

    if (newOtp.every(digit => digit !== '')) {
      const fullOtp = newOtp.join('');
      if (fullOtp === '1234') {
        localStorage.setItem('userOTP', fullOtp);
        onSuccess();
      } else {
        setError('Invalid OTP. Please try again.');
        formik.setErrors({ otp: 'Invalid OTP' });
    
        setTimeout(() => {
          formik.setValues({ otp: ['', '', '', ''] });
          inputRefs.current[0]?.focus();
          setError('');
          formik.setErrors({});
        }, 1000);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !formik.values.otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'Enter') {
      e.preventDefault();

      if (formik.values.otp.every(digit => digit !== '')) {
        formik.handleSubmit();
      }
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

  const formattedPhone = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

  

  return (
    <div className="w-full bg-[000000] px-3">
      <div className=' w-full flex  justify-between items-center'>
        <div className="gap-2 cursor-pointer">
          <svg   width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="32" rx="16" fill="#EAEAEA" fill-opacity="0.08" />
            <path d="M19.85 15L31 15C31.2833 15 31.5208 15.0958 31.7125 15.2875C31.9042 15.4792 32 15.7167 32 16C32 16.2833 31.9042 16.5208 31.7125 16.7125C31.5208 16.9042 31.2833 17 31 17L19.85 17L22.7 19.85C22.9 20.05 22.9958 20.2833 22.9875 20.55C22.9792 20.8167 22.8833 21.05 22.7 21.25C22.5 21.45 22.2625 21.5542 21.9875 21.5625C21.7125 21.5708 21.475 21.475 21.275 21.275L16.7 16.7C16.6 16.6 16.5292 16.4917 16.4875 16.375C16.4458 16.2583 16.425 16.1333 16.425 16C16.425 15.8667 16.4458 15.7417 16.4875 15.625C16.5292 15.5083 16.6 15.4 16.7 15.3L21.275 10.725C21.475 10.525 21.7125 10.4292 21.9875 10.4375C22.2625 10.4458 22.5 10.55 22.7 10.75C22.8833 10.95 22.9792 11.1833 22.9875 11.45C22.9958 11.7167 22.9 11.95 22.7 12.15L19.85 15Z" fill="#EAEAEA" />
          </svg>
        </div>
        <div className="flex items-center rounded-200   mt-2 -translate-x-2 text-gray-300 border-gray-200 border rounded-3xl gap-2 px-1 py-1  text-blue-600 font-semibold text-sm">
          <img src="../../public/usa.png" alt="" width={25} />
          <span>English</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.9467 5.45334H7.79341H4.05341C3.41341 5.45334 3.09341 6.22667 3.54674 6.68001L7.00008 10.1333C7.55341 10.6867 8.45341 10.6867 9.00674 10.1333L10.3201 8.82L12.4601 6.68001C12.9067 6.22667 12.5867 5.45334 11.9467 5.45334Z" fill="#EAEAEA" fill-opacity="0.6" />
          </svg>

        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-2 mt-7">4 digit code</h2>
        <p className="text-md text-[#EAEAEA99] leading-relaxed">
          Please enter 4 digit OTP verification code sent to +1 {formattedPhone}
        </p>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="flex gap-3 text-amber-50 mb-2">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              ref={setInputRef(index)}
              type="text"
              maxLength={1}
              value={formik.values.otp[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-14 h-14 text-center border border-[#2c2b2b] text-2xl bg-[#2c2b2b] font-semibold rounded-xl outline-none transition-colors ${formik.errors.otp || error
                ? 'border-red-500 animate-[shake_0.3s_ease]'
                : 'border-gra00 focus:border-blue-50 focus:border-2'
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

        <div className="text-left mt-5 mb-7">
          {canResend ? (
            <button
              type="button"
              className="text-blue-600 text-sm font-semibold hover:underline bg-transparent border-none cursor-pointer"
              onClick={handleResend}
            >
              Resend code
            </button>
          ) : (
            <span className="text-gray-500 text-sm"> Having trouble? Resend code in {timer} sec</span>
          )}
        </div>
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

export default FirstOTP;