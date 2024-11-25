"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { registerSchema } from "../schemas";
import { useRegister } from "../api/use-register";

export const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const { mutate, isPending } = useRegister({ callbackUrl: callbackUrl || "/" });

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof registerSchema>) {
        mutate(values);
    }

    return (
        <Card className="w-full max-w-[450px] rounded-sm">
            <CardHeader>
                <CardTitle className="text-xl">Create your account</CardTitle>
                <CardDescription>
                    Join us today and start your journey with our platform.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Name"
                                            {...field}
                                            disabled={isPending}
                                            autoComplete="name"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Email"
                                            {...field}
                                            disabled={isPending}
                                            autoComplete="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                placeholder="Password"
                                                {...field}
                                                type={showPassword ? "text" : "password"}
                                                disabled={isPending}
                                            />
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-0 top-0"
                                                onClick={togglePassword}
                                                type="button"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5" />
                                                ) : (
                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isPending}>
                            Continue
                        </Button>
                    </form>
                </Form>
                <div className="flex items-center">
                    <div className="h-[1px] w-full bg-slate-500" />
                    <Badge variant="outline">OR</Badge>
                    <div className="h-[1px] w-full bg-slate-500" />
                </div>
                {/* <Button
                    variant="outline"
                    className="relative flex w-full items-center justify-center"
                    disabled={isPending}
                >
                    <FcGoogle className="absolute left-5" size={20} />
                    Continue with Google
                </Button> */}
            </CardContent>
            <CardFooter className="flex items-center text-sm">
                <p className="text-muted-foreground">Already have an account?</p>
                <Button
                    variant="link"
                    className="text-md font-bold tracking-wider text-sky-600"
                    asChild
                    disabled={isPending}
                >
                    <Link href="/auth/sign-in">Sign In</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};
