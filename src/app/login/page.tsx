"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, LockKeyhole } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const email = formData.get("email") as string;

        try {
            setLoading(true);

            const { error } = await authClient.signIn.email({
                email,
                password,
                callbackURL: "/",
                rememberMe,
            });

            if (error) {
                alert(error.message || "Invalid email or password");
                return;
            }

            router.push("/");
            router.refresh();

        } catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8f9fa] px-4 py-10">

            <div className="mb-5 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-[#171717] sm:text-4xl">
                    Welcome Back
                </h1>

                <p className="mt-1 text-sm text-[#6c696d]">
                    Resume your adventure with Wanderlust
                </p>
            </div>

            <div className="w-full max-w-md border border-gray-100 bg-white p-6 shadow-md sm:p-7">

                <form onSubmit={handleSubmit} className="space-y-3">

                    <div className="space-y-1.5">
                        <Label
                            htmlFor="email"
                            className="text-sm font-medium text-black"
                        >
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
                                className="h-[34px] rounded-none border-gray-200 bg-[#f8f9fa] pl-10 text-sm shadow-none focus-visible:ring-1"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label
                            htmlFor="password"
                            className="text-sm font-medium text-black"
                        >
                            Password
                        </Label>

                        <div className="relative">
                            <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />

                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-[34px] rounded-none border-gray-200 bg-[#f8f9fa] pl-10 pr-12 text-sm shadow-none focus-visible:ring-1"
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

                    <div className="flex items-center justify-between text-sm">

                        <label className="flex cursor-pointer items-center gap-2 text-[#6c696d]">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="size-3.5 accent-[#17a2b8]"
                            />
                            Remember me
                        </label>

                        <Link
                            href="/forgot-password"
                            className="font-medium text-[#17a2b8] hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="h-[39px] w-full rounded-none bg-[#17a2b8] text-white hover:bg-[#138496]"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </Button>

                </form>

                <div className="my-3 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200" />

                    <span className="text-sm text-gray-500">
                        Or continue with
                    </span>

                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                <Button
                    type="button"
                    variant="outline"
                    className="h-[39px] w-full rounded-none border-gray-200 bg-white font-normal text-black hover:bg-gray-50"
                    onClick={() =>
                        authClient.signIn.social({
                            provider: "google",
                            callbackURL: "/",
                        })
                    }
                >
                    <span className="mr-1 text-lg font-bold text-[#4285F4]">
                        G
                    </span>
                    Sign Up With Google
                </Button>

                <p className="mt-4 text-center text-sm text-[#6c696d]">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/signup"
                        className="font-semibold text-[#17a2b8] hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

            </div>
        </div>
    );
}