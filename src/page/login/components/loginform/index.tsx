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
        <div className="w-full h-full gap-67 flex flex-col bg-[#000000]  relative">

            <div className="flex gap-4 flex-col ">
                <div className=' w-full flex  justify-between items-center'>
                    <div className=" gap-2 px-3 ">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30.4001 11.8809L26.7673 5.58917L19.6001 9.72809V1.60001H12.4001V9.72557L5.23286 5.58917L1.6001 11.8798L8.73674 16L1.6001 20.1202L5.23286 26.4108L12.4001 22.273V30.4H19.6001V22.2719L26.7684 26.4108L30.4001 20.1191L23.266 16L30.4001 11.8809Z" fill="#EAEAEA" />
                        </svg>
                    </div>
                    <div className="flex items-center rounded-200   -translate-x-5 text-gray-300 border-gray-200 border rounded-3xl gap-2 px-1 py-1  text-blue-600 font-semibold text-sm">
                        <img src="../../public/usa.png" alt="" width={25} />
                        <span>English</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.9467 5.45334H7.79341H4.05341C3.41341 5.45334 3.09341 6.22667 3.54674 6.68001L7.00008 10.1333C7.55341 10.6867 8.45341 10.6867 9.00674 10.1333L10.3201 8.82L12.4601 6.68001C12.9067 6.22667 12.5867 5.45334 11.9467 5.45334Z" fill="#EAEAEA" fill-opacity="0.6" />
                        </svg>

                    </div>
                </div>

                <div className="flex-1 flex flex-col px-3 justify-centr items-">
                    <div className="w-full  max-w-md">
                        <p className="text-4xl font-bold text-left text-[#EAEAEA] mb-2 mt-2 ">Phone number</p>
                        <p className="text-sm text-[#EAEAEA99] leading-relaxed mb-6 text-left">
                            Enter your mobile number and we'll send you<br />
                            a verification code to confirm
                        </p>

                        <form onSubmit={formik.handleSubmit} className="w-full ">
                            <div className="relative">
                                <div className={`flex items-center gap-2  rounded-xl overflow-hidden transition-colors ${formik.touched.phoneNumber && formik.errors.phoneNumber
                                    ? 'border-red-500'
                                    : ' focus-within:border-blue-600'
                                    }`}>
                                    <div className="flex items-center justify-center rounded-2xl gap-1.5 px-4 py-3 bg-[#2c2b2b] text-white border-gray-200 font-semibold  text-sm min-w-[70px]">
                                        <img src="../../public/usa.png" alt="" width={25} />

                                        <span>+1</span>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.9467 5.45334H7.79341H4.05341C3.41341 5.45334 3.09341 6.22667 3.54674 6.68001L7.00008 10.1333C7.55341 10.6867 8.45341 10.6867 9.00674 10.1333L10.3201 8.82L12.4601 6.68001C12.9067 6.22667 12.5867 5.45334 11.9467 5.45334Z" fill="#EAEAEA" fill-opacity="0.6" />
                                        </svg>
                                    </div>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        placeholder="000 000 0000"
                                        value={phoneNumber}
                                        onChange={handlePhoneChange}
                                        onBlur={formik.handleBlur}
                                        className="flex-1 px-4 py-4 rounded-2xl outline-none text-sm tracking-wider bg-[#2c2b2b]  text-white placeholder:text-gray-400 placeholder:font-bold"
                                        maxLength={10}
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                    />
                                </div>
                                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                    <div className="text-red-500 text-xs mt-1.5">{formik.errors.phoneNumber}</div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className=" pb-6 w-full max-w-md mx-auto">
                <div className="mb-4">
                    <label className="flex  items-start pl-3 gap-3 text-xs text-[#adacac] leading-relaxed cursor-pointer">
                        <input
                            type="checkbox"
                            name="agreeTerms"
                            checked={formik.values.agreeTerms}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="hidden"
                        />
                        <span className={`min-w-[20px] h-5 border-2  rounded-md flex items-center justify-center transition-all  mt-0.5 ${formik.values.agreeTerms
                            ? 'bg-blue-600 border-blue-600'
                            : 'border-gray-300 bg-whit'
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
                    onClick={() => formik.handleSubmit()}
                    disabled={!formik.isValid || !formik.dirty}
                    className={`w-[95%]  translate-x-2.5 py-3.5 rounded-xl text-sm  font-semibold transition-all ${formik.isValid && formik.dirty
                        ? 'bg-gray-200 text-gray-700 cursor-pointer'
                        : ' bg-[#2c2b2b] text-gray-400 cursor-not-allowed'
                        }`}
                >
                    Get OTP
                </button>
            </div>
        </div>
    );
};

export default LoginForm;