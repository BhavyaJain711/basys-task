import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { cn } from '../../../lib/utils';
import axios from 'axios';
import { store } from '../../store';
import { setLogin } from '../../state';
import { useNavigate } from 'react-router-dom';

// Define the validation schema for the login form
const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export default function LoginFormDemo() {
    // Handle form submission
    const navigate = useNavigate();
    let userRole;
    const handleSubmit = async (values) => {
        try {
            const res = await axios.post('/auth/login', values).then((res) => {
                const { token, refreshToken, role } = res.data;
                store.dispatch(setLogin({ token, refreshToken: refreshToken, role: role || "user" }))
                userRole = role;
            })
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred. Please try again.');
        }

        if(userRole === 'doctor'){
            navigate('/home');
        }else{
            navigate('/');
        }
    };

    return (
        <Formik
            initialValues={{ email: '', password: '' }} // Initialize form fields
            validationSchema={LoginSchema} // Apply validation schema
            onSubmit={handleSubmit} // Form submission handler
        >
            {({ isSubmitting }) => (
                <Form className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                    <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                        Login to Your Account
                    </h2>
                    <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                        Please enter your email and password to log in.
                    </p>

                    <div className="my-8">
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="email">Email Address</Label>
                            <Field
                                id="email"
                                name="email"
                                autoComplete="username"
                                placeholder="example@domain.com"
                                as={Input}
                                type="email"
                                className="border"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </LabelInputContainer>

                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="password">Password</Label>
                            <Field
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                as={Input}
                                type="password"
                                autoComplete="current-password"
                                className="border"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </LabelInputContainer>

                        <button
                            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] my-4"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Log in &rarr;
                            <BottomGradient />
                        </button>
                        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
 
                        <h3 className="text-neutral-600 text-md text-center max-w-sm mt-2 dark:text-neutral-300">
                            New to our platform? Sign up now!
                        </h3>
                        <button
                            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] my-4"
                            onClick={() => navigate('/signup')}
                        >
                            Sign Up &rarr;
                            <BottomGradient />
                        </button>
                        <button
                            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] my-4"
                            onClick={() => navigate('/doctor/signup')}
                        >
                            Sign Up as Doctor &rarr;
                            <BottomGradient />
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

// Gradient effect for the button
const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

// Reusable container for labels and inputs
const LabelInputContainer = ({ children, className }) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
