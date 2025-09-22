"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signupAction } from "@/actions/auth/signup/action";
import { useForm } from "react-hook-form";

type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
    clearErrors,
  } = useForm<SignUpFormValues>();
  const router = useRouter();

  const password = watch("password");

  const onSubmit = async (data: SignUpFormValues) => {
    clearErrors("root");
    try {
      await signupAction(data);
      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        setError("root", {
          type: "server",
          message: err.message || "Something went wrong",
        });
      } else {
        setError("root", { type: "server", message: "Something went wrong" });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create your account
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-center space-x-2 mb-4">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                {...register("terms", {
                  required: "You must accept the terms",
                })}
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-600">{errors.terms.message}</p>
            )}

            {/* Server Error */}
            {errors.root && (
              <div className="text-red-600 text-sm text-center">
                {errors.root.message}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
