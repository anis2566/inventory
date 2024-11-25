import { Metadata } from "next"

import { SignUpForm } from "@/features/auth/components/sign-up-form"

export const metadata: Metadata = {
    title: 'Sign Up',
    description: 'Create an account',
}

const SignUpPage = () => {
    return (
        <div className="w-full flex min-h-screen justify-center items-center px-3 md:px-0">
            <SignUpForm />
        </div>
    )
}

export default SignUpPage