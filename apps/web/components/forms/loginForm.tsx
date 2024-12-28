"use client";

"use client"; // Indicates that this component will use client-side rendering
import { useForm } from "react-hook-form"; // Importing useForm for form handling
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form"; // Importing UI components for the form
import { toast } from "@repo/ui/components/ui/use-toast"; // Custom hook for managing toast notifications
import { Input } from "@repo/ui/components/ui/input"; // Importing Input component for text inputs
import { Button } from "@repo/ui/components/ui/button"; // Importing Button component for actions
import { useState, useEffect } from "react"; // Importing hooks for managing state and lifecycle
import { loginSchema, LoginSchemaType } from "@repo/ui/schema/login";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { loginWithCreds } from "@/actions/auth";

export default function LoginForm() {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = form;
  const formData = watch();

  async function onSubmit(values: LoginSchemaType) {
    try {
      const validate = await loginWithCreds(values);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive",
      });
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" {...field} className="px-2" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} className="px-2" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            variant="outline"
            className="w-full mt-4 flex items-center justify-center bg-black text-white"
            type="submit"
            disabled={!form.formState.isValid}
            // onClick={() => setIsLoading(true)}
          >
            Save
          </Button>
          {/* </div> */}
        </form>
      </Form>
    </div>
  );
}
