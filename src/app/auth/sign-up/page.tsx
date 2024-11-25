import { Metadata } from "next"
import { Suspense } from "react"

import { SignUpForm } from "@/features/auth/components/sign-up-form"

export const metadata: Metadata = {
    title: 'Sign Up',
    description: 'Create an account',
}

const SignUpPage = () => {
    return (
        <div className="w-full flex min-h-screen justify-center items-center px-3 md:px-0">
            <Suspense fallback={<div>Loading...</div>}>
                <SignUpForm />
            </Suspense>
        </div>
    )
}

export default SignUpPage