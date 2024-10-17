import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { cn } from '../../../lib/utils';
import { store } from '../../store';
import { setLogin } from '../../state';
import axios from 'axios';
import Swal from 'sweetalert2';

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  repeatPassword: Yup.string()
});

export default function SignupFormDemo() {
  const handleSubmit = async (values) => {
    if (values.password !== values.repeatPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password mismatch',
        text: 'The passwords you entered do not match',
      });
      return;
    }
    const res = await axios.post('/auth/doctor/register', values);
    console.log(res.data);
    if(res.status === 201){
      Swal.fire({
        icon: 'success',
        title: 'Account created',
        text: 'Your account has been created successfully, redirecting to login page',
        timer: 3000,
      });

      setTimeout(() => {
        window.location.href = '/login';
      }, 3500);
    }


  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Doctor Account Creation
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Create your account to continue
          </p>

          <div className="my-8">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="name">Name</Label>
                <Field
                  id="name"
                  name="name"
                  placeholder="Tyler"
                  as={Input}
                  className="border"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </LabelInputContainer>

              {/* <LabelInputContainer>
                <Label htmlFor="lastName">Last name</Label>
                <Field
                  id="lastName"
                  name="lastName"
                  placeholder="Durden"
                  as={Input}
                  className="border"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </LabelInputContainer> */}
            </div>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Field
                id="email"
                name="email"
                autoComplete='username'
                placeholder="projectmayhem@fc.com"
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
                autoComplete="new-password"
                className="border"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Repeat Password</Label>
              <Field
                id="repeatPassword"
                name="repeatPassword"
                placeholder="••••••••"
                as={Input}
                type="password"
                autoComplete="new-password"
                className="border"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
              disabled={isSubmitting}
            >
              Sign up &rarr;
              <BottomGradient />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
