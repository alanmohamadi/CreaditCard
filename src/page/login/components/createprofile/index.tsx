import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface CreateProfileProps {
  onSuccess: () => void;
}

interface FormValues {
  fullName: string;
  email: string;
}

const CreateProfile: React.FC<CreateProfileProps> = ({ onSuccess }) => {
  const formik = useFormik<FormValues>({
    initialValues: { fullName: '', email: '' },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .matches(/^[A-Za-z\s]+$/, 'Only letters are allowed')
        .min(2, 'Name must be at least 2 characters')
        .required('Full name is required'),
      email: Yup.string()
        .email('Please enter a valid email address')
        .required('Email address is required'),
    }),
    onSubmit: (values: FormValues) => {
      localStorage.setItem('userName', values.fullName);
      localStorage.setItem('userEmail', values.email);
      onSuccess();
    },
  });

  return (
    <div className='w-full h-full  gap-56 flex flex-col bg-[#000000]  relative'>



      <div className="w-full flex flex-col  px-4">

        <div className=' w-full flex  justify-between items-center'>
          <div className="gap-2 cursor-pointer">
            <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
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

        <h2 className="text-4xl font-bold text-white mb-2 mt-7">Create profile</h2>
        <p className="text-md text-[#EAEAEA99] leading-relaxed mb-6">
          Enter your personal details as same as given in your government ID card
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-2">

            <input
              type="text"
              name="fullName"
              placeholder="Full name (as per Gov ID)"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-4  rounded-2xl placeholder:text-gray-400 outline-none text-md text-white transition-colors bg-[#2c2b2b] ${formik.touched.fullName && formik.errors.fullName
                ? 'border-red-500'
                : ' '
                }`}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.fullName}</div>
            )}
          </div>

          <div className="mb-6">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-4 rounded-2xl outline-none text-md text-white placeholder:text-gray-400 transition-colors bg-[#2c2b2b] ${formik.touched.email && formik.errors.email
                ? 'border-red-500'
                : ''
                }`}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
            )}
          </div>

        </form>
      </div>

      <button
        type="button" 
        disabled={!formik.isValid || !formik.dirty}
        onClick={() => formik.handleSubmit()} 
        className={`w-[95%] translate-x-2.5 py-3.5 rounded-xl text-sm font-semibold transition-all ${formik.isValid && formik.dirty
          ? 'bg-gray-200 text-gray-700 cursor-pointer'
          : 'bg-[#2c2b2b] text-gray-400 cursor-not-allowed'
          }`}
      >
        Get OTP
      </button>
    </div>
  );
};

export default CreateProfile;