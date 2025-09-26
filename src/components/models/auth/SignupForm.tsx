"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signupAction } from "@/actions/auth/signup/action";
import { useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/shared/Form/FormInput";
import { FormCheckbox } from "@/components/shared/Form/FormCheckbox";
import { signupSchema, SignupInput } from "@/actions/auth/signup/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FormButton } from "@/components/shared/Form/FormButton";

export function SignupForm() {
  const form = useForm<SignupInput>({
    mode: "onChange",
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: true,
    },
  });
  const router = useRouter();

  const { execute, isExecuting } = useAction(signupAction, {
    onSuccess: () => {
      toast.success("Account created successfully!");
      form.reset();
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
            Create your account
          </CardTitle>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(execute)}>
            <CardContent className="space-y-4">
              <FormInput
                control={form.control}
                name="name"
                label="Full Name"
                placeholder="John Doe"
                required
              />
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
                placeholder="Create a strong password"
                type="password"
                required
              />
              <FormInput
                control={form.control}
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
                required
              />
              <FormCheckbox
                control={form.control}
                name="terms"
                label={
                  <span>
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-blue-600 hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-blue-600 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                }
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
                Create account
              </FormButton>
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
        </Form>
      </Card>
    </div>
  );
}
