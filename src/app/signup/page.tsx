
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  UserRound,
  Mail,
  LockKeyhole,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log({
      fullName,
      email,
      password,
    });
  };

  return (
    <div className="w-1/2 border border-gray-100 bg-white p-8 shadow-md sm:p-9  mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Full Name */}
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

        {/* Email */}
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

        {/* Password */}
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

        {/* Confirm Password */}
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

        {/* Create Account Button */}
        <Button
          type="submit"
          className="h-[49px] w-full rounded-none bg-[#17a2b8] text-white hover:bg-[#138496]"
        >
          Create Account
        </Button>
      </form>

      {/* Divider */}
      <div className="my-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-sm text-gray-500">Or sign up with</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Google Signup */}
      <Button
        type="button"
        variant="outline"
        className="h-[49px] w-full rounded-none border-gray-200 bg-white font-normal hover:bg-gray-50"
      >
        <span className="mr-1 text-xl font-bold text-[#4285F4]">G</span>
        Sign Up With Google
      </Button>

      {/* Sign In Link */}
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
  );
}
