
"use client";

import Link from "next/link";
import { useState } from "react";
import {
    UserRound,
    Mail,
    LockKeyhole,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupForm() {
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const fullName = formData.get("fullName") as string;
        const email = formData.get("email") as string;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const { error } = await authClient.signUp.email({
                name: fullName,
                email,
                password,
                callbackURL: "/signin"
            });

            if (error) {
                alert(error.message || "Failed to create account");
                return;
            }

            alert("Account created successfully!");

            router.push("/signin");
            router.refresh();

        } catch (error) {
            console.error("Signup error:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="mt-10">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl">Create Account</h1>
                <p className="text-sm text-[#6c696d]">Start your adventure with Wanderlust</p>
            </div>
            <div className="border border-gray-100 bg-white shadow-md mt-10 mb-10 sm:p-9 w-full max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-sm font-medium">
                            Full Name
                        </Label>

                        <div className="relative">
                            <UserRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
                            <Input
                                id="fullName"
                                name="fullName"
                                type="text"
                                placeholder="Enter your name"
                                required
                                className="h-[42px] rounded-none border-gray-200 bg-[#f8f9fa] pl-10 shadow-none focus-visible:ring-1"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                            Email Address
                        </Label>

                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />

                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                required
                                className="h-[42px] rounded-none border-gray-200 bg-[#f8f9fa] pl-10 shadow-none focus-visible:ring-1"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">
                            Password
                        </Label>

                        <div className="relative">
                            <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-[42px] rounded-none border-gray-200 bg-[#f8f9fa] pl-10 pr-12 shadow-none focus-visible:ring-1"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium">
                            Confirm Password
                        </Label>
                        <div className="relative">
                            <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />

                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="h-[42px] rounded-none border-gray-200 bg-[#f8f9fa] pl-10 pr-12 shadow-none focus-visible:ring-1"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500"
                            >
                                {showConfirmPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="h-[49px] w-full rounded-none bg-[#17a2b8] text-white hover:bg-[#138496]"
                    >
                        Create Account
                    </Button>
                </form>

                <div className="my-4 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-sm text-gray-500">Or sign up with</span>
                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                <Button
                    type="button"
                    variant="outline"
                    className="h-[49px] w-full rounded-none border-gray-200 bg-white font-normal hover:bg-gray-50"
                >
                    <span className="mr-1 text-xl font-bold text-[#4285F4]">G</span>
                    Sign Up With Google
                </Button>

                <p className="mt-5 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link
                        href="/signin"
                        className="font-semibold text-[#17a2b8] hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
