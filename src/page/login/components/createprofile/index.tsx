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
    <div className="w-full px-4">
      <h2 className="text-xl font-bold text-gray-900 mb-1.5">Create profile</h2>
      <p className="text-sm text-gray-500 leading-relaxed mb-6">
        Enter your personal details as same as given in your government ID card
      </p>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-900 mb-1.5">
            Full name (as per Gov ID)
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Avery Quinn"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-3 border-2 rounded-xl outline-none text-sm transition-colors bg-white ${
              formik.touched.fullName && formik.errors.fullName
                ? 'border-red-500'
                : 'border-gray-200 focus:border-blue-600'
            }`}
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.fullName}</div>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-1.5">
            Email address
          </label>
          <input
            type="email"
            name="email"
            placeholder="averyquinn@gmail.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-3 border-2 rounded-xl outline-none text-sm transition-colors bg-white ${
              formik.touched.email && formik.errors.email
                ? 'border-red-500'
                : 'border-gray-200 focus:border-blue-600'
            }`}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
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

export default CreateProfile;