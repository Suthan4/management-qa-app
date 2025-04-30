// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { useAuth } from "@/context/authContext";
// import { useToast } from "@/hooks/useToast";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Loader2 } from "lucide-react";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// const loginSchema = z.object({
//   email: z.string().email({ message: "Please enter a valid email" }),
//   password: z
//     .string()
//     .min(6, { message: "Password must be at least 6 characters" }),
// });

// type LoginFormValues = z.infer<typeof loginSchema>;

// export function LoginForm() {
//   const { login } = useAuth();
//   const router = useRouter();
//   const { toast } = useToast();
//   const [isLoading, setIsLoading] = useState(false);

//   const form = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   async function onSubmit(data: LoginFormValues) {
//     setIsLoading(true);

//     try {
//       await login(data.email, data.password);
//       toast({
//         title: "Login successful",
//         description: "Welcome back!",
//       });
//       router.push("/documents");
//     } catch (error) {
//       toast({
//         title: "Login failed",
//         description:
//           error instanceof Error
//             ? error.message
//             : "Please check your credentials and try again",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div className="w-full max-w-md px-8 py-10 bg-card rounded-xl shadow-lg border">
//       <div className="space-y-2 text-center mb-8">
//         <h1 className="text-3xl font-bold">Welcome back</h1>
//         <p className="text-muted-foreground">
//           Enter your credentials to access your account
//         </p>
//       </div>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="you@example.com"
//                     type="email"
//                     autoComplete="email"
//                     disabled={isLoading}
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <div className="flex items-center justify-between">
//                   <FormLabel>Password</FormLabel>
//                   <Link
//                     href="/forgot-password"
//                     className="text-xs text-muted-foreground hover:text-primary transition-colors"
//                   >
//                     Forgot password?
//                   </Link>
//                 </div>
//                 <FormControl>
//                   <Input
//                     placeholder="******"
//                     type="password"
//                     autoComplete="current-password"
//                     disabled={isLoading}
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button type="submit" className="w-full" disabled={isLoading}>
//             {isLoading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Logging in...
//               </>
//             ) : (
//               "Log in"
//             )}
//           </Button>
//         </form>
//       </Form>

//       <div className="mt-8 text-center text-sm">
//         <p className="text-muted-foreground">
//           Don&apos;t have an account?{" "}
//           <Link
//             href="/signup"
//             className="font-medium hover:text-primary transition-colors"
//           >
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// Demo accounts for different roles
const DEMO_ACCOUNTS = {
  admin: "admin@example.com",
  user: "user@example.com",
  editor: "editor@example.com",
};

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);

    try {
      await login(data.email, data.password);
      toast({
        title: "Login successful",
        description: `Welcome back! You are logged.`,
      });
      router.push("/documents");
    } catch (error) {
      toast({
        title: "Login failed",
        description:
          error instanceof Error
            ? error.message
            : "Please check your credentials and try again",
      });
            setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  console.log("selectedValue", form.watch("email"));

  return (
    <div className="w-full max-w-md px-8 py-10 bg-card rounded-xl shadow-lg border">
      <div className="space-y-2 text-center mb-8">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Role selection */}
          {/* <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={handleRoleChange}
                  defaultValue={"admin"}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="admin">
                      <div className="flex items-center">
                        <span className="font-medium">Administrator</span>
                        <span className="ml-2 px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                          Full Access
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="user">
                      <div className="flex items-center">
                        <span className="font-medium">Standard User</span>
                        <span className="ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          Limited Access
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="editor">
                      <div className="flex items-center">
                        <span className="font-medium">Editor</span>
                        <span className="ml-2 px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Content Access
                        </span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    type="email"
                    autoComplete="email"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <Input
                    placeholder="******"
                    type="password"
                    autoComplete="current-password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <p className="text-xs text-muted-foreground mt-1">
                  (Any password with 6+ characters will work in demo mode)
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              `Log in`
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-8 text-center text-sm">
        <p className="text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium hover:text-primary transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
