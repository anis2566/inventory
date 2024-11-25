import { Metadata } from "next"

import { SignInForm } from "@/features/auth/components/sign-in-form"

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account',
}

const SignInPage = () => {
  return (
    <div className="w-full flex min-h-screen justify-center items-center px-3 md:px-0">
      <SignInForm />
    </div>
  )
}

export default SignInPage
