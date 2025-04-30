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
// import axios from "axios";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";

// const signupSchema = z
//   .object({
//     name: z.string().min(2, { message: "Name must be at least 2 characters" }),
//     email: z.string().email({ message: "Please enter a valid email" }),
//     password: z
//       .string()
//       .min(8, { message: "Password must be at least 8 characters" }),
//     confirmPassword: z.string(),
//     role: z.enum(["admin", "user", "editor"], {
//       required_error: "Please Select an role",
//     }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"],
//   });

// type SignupFormValues = z.infer<typeof signupSchema>;

// export function SignupForm() {
//   const { signup } = useAuth();
//   const router = useRouter();
//   const { toast } = useToast();
//   const [isLoading, setIsLoading] = useState(false);

//   const form = useForm<SignupFormValues>({
//     resolver: zodResolver(signupSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       role: "user",
//     },
//   });

//   async function onSubmit(data: SignupFormValues) {
//     setIsLoading(true);

//     try {
//       const res = await axios.post(
//         "https://6789c95bdd587da7ac27a32b.mockapi.io/users",
//         {
//           name: data.name,
//           email: data.email,
//           password: data.password,
//           role: data.role,
//         }
//       );
//       toast({
//         title: "Account created",
//         description: "Welcome to DocuAI!",
//       });
//       router.push("/login");
//     } catch (error) {
//       toast({
//         title: "Signup failed",
//         description:
//           error instanceof Error ? error.message : "Please try again",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div className="w-full max-w-md px-8 py-10 bg-card rounded-xl shadow-lg border">
//       <div className="space-y-2 text-center mb-8">
//         <h1 className="text-3xl font-bold">Create an account</h1>
//         <p className="text-muted-foreground">
//           Sign up to start using our platform
//         </p>
//       </div>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Name</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="John Doe"
//                     autoComplete="name"
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
//                 <FormLabel>Password</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="********"
//                     type="password"
//                     autoComplete="new-password"
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
//             name="confirmPassword"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Confirm Password</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="********"
//                     type="password"
//                     autoComplete="new-password"
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
//             name="role"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Account Type</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                   disabled={isLoading}
//                 >
//                   <FormControl>
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Select your role" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="user">
//                       <div className="flex items-center">
//                         <span className="font-medium">Standard User</span>
//                         <span className="ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
//                           Limited Access
//                         </span>
//                       </div>
//                     </SelectItem>
//                     <SelectItem value="editor">
//                       <div className="flex items-center">
//                         <span className="font-medium">Editor</span>
//                         <span className="ml-2 px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
//                           Content Access
//                         </span>
//                       </div>
//                     </SelectItem>
//                     <SelectItem value="admin">
//                       <div className="flex items-center">
//                         <span className="font-medium">Administrator</span>
//                         <span className="ml-2 px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
//                           Full Access
//                         </span>
//                       </div>
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button type="submit" className="w-full" disabled={isLoading}>
//             {isLoading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Creating account...
//               </>
//             ) : (
//               "Sign up"
//             )}
//           </Button>
//         </form>
//       </Form>

//       <div className="mt-8 text-center text-sm">
//         <p className="text-muted-foreground">
//           Already have an account?{" "}
//           <Link
//             href="/login"
//             className="font-medium hover:text-primary transition-colors"
//           >
//             Log in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Check, AlertCircle } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";
import axios from "axios";

const signupSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
    role: z.enum(["admin", "user", "editor"], {
      required_error: "Please select a role",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

type SignupStep = "validating" | "creating" | "success" | "error" | "idle";

export function SignupForm() {
  const { signup } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState<SignupStep>("idle");

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
    },
  });

  async function onSubmit(data: SignupFormValues) {
    setIsLoading(true);
    setStep("validating");
    setProgress(20);

    try {
      // Start progress animation
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      // Display initial loading toast
      toast({
        title: "Creating your account",
        description: "Please wait while we set up your account...",
      });

      setStep("creating");
      setProgress(50);

      // API call to create user
      const res = await axios.post(
        "https://6789c95bdd587da7ac27a32b.mockapi.io/users",
        {
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
        }
      );

      // Stop progress animation and set to 100%
      clearInterval(progressInterval);
      setProgress(100);
      setStep("success");

      // Success toast
      toast({
        title: "Account created successfully!",
        description: `Welcome to DocuAI! You've been registered as a ${data.role}.`,
      });

      // Short delay before redirect to ensure user sees success state
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      setStep("error");
      setProgress(100);

      // Error toast
      toast({
        title: "Signup failed",
        description:
          error instanceof Error ? error.message : "Please try again",
      });

      // Reset progress after a delay
      setTimeout(() => {
        setProgress(0);
        setStep("idle");
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  }

  // Function to render different button states based on signup step
  const renderButtonContent = () => {
    switch (step) {
      case "validating":
        return (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Validating information...</span>
          </>
        );
      case "creating":
        return (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span className="animate-pulse">Creating account...</span>
          </>
        );
      case "success":
        return (
          <>
            <Check className="mr-2 h-4 w-4" />
            <span>Account created!</span>
          </>
        );
      case "error":
        return (
          <>
            <AlertCircle className="mr-2 h-4 w-4" />
            <span>Failed to create account</span>
          </>
        );
      default:
        return "Sign up";
    }
  };

  // Function to determine button variant based on step
  const getButtonVariant = () => {
    if (step === "success") return "success";
    if (step === "error") return "destructive";
    return "default";
  };

  return (
    <div className="w-full max-w-sm p-4 bg-card rounded-xl shadow-lg border">
      <div className="space-y-2 text-center mb-8">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-muted-foreground">
          Sign up to start using our platform
        </p>
      </div>

      {/* Progress bar shown during signup process */}
      {isLoading && (
        <div className="mb-6">
          <Progress
            value={progress}
            className={`h-2 ${
              step === "success"
                ? "bg-green-100"
                : step === "error"
                ? "bg-red-100"
                : "bg-blue-100"
            }`}
          />
          <p className="text-xs text-center mt-2 text-muted-foreground">
            {step === "validating" && "Validating your information..."}
            {step === "creating" && "Creating your account..."}
            {step === "success" && "Account created successfully!"}
            {step === "error" && "There was an error creating your account."}
          </p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    autoComplete="name"
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
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
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
                    <SelectItem value="admin">
                      <div className="flex items-center">
                        <span className="font-medium">Administrator</span>
                        <span className="ml-2 px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                          Full Access
                        </span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="********"
                    type="password"
                    autoComplete="new-password"
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="********"
                    type="password"
                    autoComplete="new-password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className={`w-full ${
              step === "success"
                ? "bg-green-600 hover:bg-green-700"
                : step === "error"
                ? "bg-red-600 hover:bg-red-700"
                : ""
            }`}
            disabled={isLoading}
          >
            {renderButtonContent()}
          </Button>
        </form>
      </Form>

      <div className="mt-8 text-center text-sm">
        <p className="text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium hover:text-primary transition-colors"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}