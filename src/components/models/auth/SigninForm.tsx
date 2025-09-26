"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signinAction } from "@/actions/auth/signin/action";
import { useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/shared/Form/FormInput";
import { signinSchema, SigninInput } from "@/actions/auth/signin/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FormButton } from "@/components/shared/Form/FormButton";

export function SigninForm() {
  const form = useForm<SigninInput>({
    mode: "onChange",
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const { execute, isExecuting } = useAction(signinAction, {
    onSuccess: () => {
      toast.success("Signed in successfully!");
      router.push("/");
    },
    onError: (error) => {
      const fieldErrors = error.error.validationErrors?.fieldErrors;
      const errorMessage =
        error.error.serverError ??
        (fieldErrors
          ? Object.entries(fieldErrors)
              .map(([key, value]) => `${key}: ${value}`)
              .join(", ")
          : "An unknown error occurred");
      toast.error(errorMessage);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Sign in to Sentiopulse
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(execute)}>
            <CardContent className="space-y-4">
              <FormInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="john@example.com"
                type="email"
                required
              />
              <FormInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                type="password"
                required
              />
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <FormButton
                className="w-full"
                loading={isExecuting}
                disabled={
                  !form.formState.isValid ||
                  !form.formState.isDirty ||
                  isExecuting
                }
              >
                Sign in
              </FormButton>
              <p className="text-center text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
