import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface LoginFormProps {
  onSuccess: () => void;
}

interface FormValues {
  phoneNumber: string;
  agreeTerms: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const formik = useFormik<FormValues>({
    initialValues: {
      phoneNumber: '',
      agreeTerms: false,
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number')
        .required('Phone number is required'),
      agreeTerms: Yup.boolean()
        .oneOf([true], 'You must agree to the terms'),
    }),
    onSubmit: (values: FormValues) => {
      localStorage.setItem('phoneNumber', values.phoneNumber);
      localStorage.setItem('userPhone', values.phoneNumber);
      onSuccess();
    },
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
    formik.setFieldValue('phoneNumber', value);
  };

  return (
    <div className="w-full px-4">
      <div className="flex gap-4 mb-8">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 font-semibold text-sm">
          <span className="text-xl">🇺🇸</span>
          <span>English</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-500 text-sm">
          <span className="text-xl">🇮🇷</span>
          <span>فارسی</span>
        </div>
      </div>

      <p className="text-lg font-bold text-gray-900 mb-2">Phone number</p>
      <p className="text-sm text-gray-500 leading-relaxed mb-6">
        Enter your mobile number and we'll send you<br />
        a verification code to confirm
      </p>

      <form onSubmit={formik.handleSubmit}>
        <div className="relative">
          <div className={`flex items-center border-2 rounded-xl overflow-hidden transition-colors ${
            formik.touched.phoneNumber && formik.errors.phoneNumber 
              ? 'border-red-500' 
              : 'border-gray-200 focus-within:border-blue-600'
          }`}>
            <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-50 border-r border-gray-200 font-semibold text-gray-900 text-sm min-w-[70px]">
              <span className="text-xl">🇺🇸</span>
              <span>+1</span>
            </div>
            <input
              type="text"
              name="phoneNumber"
              placeholder="0000000000"
              value={phoneNumber}
              onChange={handlePhoneChange}
              onBlur={formik.handleBlur}
              className="flex-1 px-4 py-3 outline-none text-sm tracking-wider bg-white text-gray-900 placeholder:text-gray-300"
              maxLength={10}
            />
          </div>
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <div className="text-red-500 text-xs mt-1.5">{formik.errors.phoneNumber}</div>
          )}
        </div>

        <div className="mt-5 mb-7">
          <label className="flex items-start gap-3 text-xs text-gray-500 leading-relaxed cursor-pointer">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formik.values.agreeTerms}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="hidden"
            />
            <span className={`min-w-[20px] h-5 border-2 rounded-md flex items-center justify-center transition-all flex-shrink-0 mt-0.5 ${
              formik.values.agreeTerms 
                ? 'bg-blue-600 border-blue-600' 
                : 'border-gray-300 bg-white'
            }`}>
              {formik.values.agreeTerms && (
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            By authorising CheQ, I can view all of my full<br />
            loan details, bill and credit information
          </label>
          {formik.touched.agreeTerms && formik.errors.agreeTerms && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.agreeTerms}</div>
          )}
        </div>

        <button
          type="submit"
          disabled={!formik.isValid || !formik.dirty}
          className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all ${
            formik.isValid && formik.dirty
              ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Get OTP
        </button>
      </form>
    </div>
  );
};

export default LoginForm;