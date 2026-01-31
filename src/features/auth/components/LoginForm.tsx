import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "../hooks/useAuth";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react"; // Icon for loading state
import { Link } from "@tanstack/react-router";

// 1. Define the Validation Schema
const loginSchema = z.object({
  identifier: z.string().min(1, "Email or Username is required"), // Backend accepts both
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Infer the TypeScript type from the schema
type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { login, isLoggingIn } = useAuth();

  // 2. Initialize the Form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // 3. Handle Submission
  const onSubmit = (data: LoginFormValues) => {
    login(data); // Calls our useAuth mutation
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
    <Card className="w-[350px] shadow-lg">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
  <CardDescription>Enter your credentials to access the hive.</CardDescription>
  </CardHeader>
  <CardContent>
  <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

    {/* Identifier Field */}
    <FormField
  control={form.control}
  name="identifier"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email or Username</FormLabel>
  <FormControl>
  <Input placeholder="user@example.com" {...field} />
  </FormControl>
  <FormMessage />
  </FormItem>
)}
  />

  {/* Password Field */}
  <FormField
    control={form.control}
  name="password"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Password</FormLabel>
    <FormControl>
    <Input type="password" placeholder="••••••" {...field} />
  </FormControl>
  <FormMessage />
  </FormItem>
)}
  />

  {/* Submit Button */}
  <Button type="submit" className="w-full" disabled={isLoggingIn}>
    {isLoggingIn ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Logging in...
        </>
) : (
    "Sign In"
  )}
  </Button>
  </form>
  </Form>

  {/* Footer Link */}
  <div className="mt-4 text-center text-sm text-gray-500">
    Don't have an account?{" "}
  <Link to="/register" className="text-blue-600 hover:underline">
    Register here
  </Link>
  </div>
  </CardContent>
  </Card>
  </div>
);
};