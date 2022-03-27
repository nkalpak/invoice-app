import { PageCard } from "../../../components/card";
import { TextField } from "../../../components/text-field";
import { PrimaryButton } from "../../../components/button";
import { SmallForm } from "../../../components/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export function Login() {
  const formMethods = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <PageCard sx={{ width: "100%" }}>
      <SmallForm
        sx={{ width: "100%" }}
        onSubmit={formMethods.handleSubmit((data) => {
          console.log("John data", data);
        })}
        title="Login"
        SubmitButton={
          <PrimaryButton sx={{ width: "100%" }}>Login</PrimaryButton>
        }
      >
        <TextField
          label="Email"
          {...formMethods.register("email")}
          error={formMethods.formState.errors.email}
        />

        <TextField
          label="Password"
          type="password"
          {...formMethods.register("password")}
          error={formMethods.formState.errors.password}
        />
      </SmallForm>
    </PageCard>
  );
}
