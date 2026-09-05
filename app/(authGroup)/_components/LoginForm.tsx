"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { loginAction } from "../_actions/authActions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const [state, action, isPending] = useActionState(loginAction, false);
  useEffect(() => {
    if (!state) return;
    if (!state.success) toast.error(state.message || "login error");
    if (state.success) toast.success(state.message || "login succeeded");
  }, [state]);

  return (
    <form action={action}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <span className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </span>
          </div>
          <Input name="password" id="password" type="password" required />
        </Field>
        <Field>
          <Button type="submit">{isPending ? "Submitting..." : "Login"}</Button>
          <Button variant="outline" type="button">
            Login with Google
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account? <Link href="register">Sign Up</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
