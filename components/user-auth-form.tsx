"use client";

import { buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
});
type FormData = z.infer<typeof userAuthSchema>;

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  signUp?: boolean;
  signIn?: boolean;
}

export function UserAuthForm({ className, signUp, signIn, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false);
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    if (signIn) {
      const signInResult = await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
        },
        {
          onError: () => {
            toast.error("Invalid email or password", {
              position: "bottom-left",
            });
          },
          onSuccess: () => {
            router.push("/dashboard");
          },
        }
      );

      console.log(signInResult);
    }

    if (signUp) {
      const signUpResult = await authClient.signUp.email(
        {
          email: data.email,
          name: firstName + " " + lastName,
          password: data.password,
        },
        {
          onSuccess: () => {
            router.push("/dashboard");
          },
        }
      );

      console.log(signUpResult);
    }

    setIsLoading(false);
  }

  async function onSignInGithub() {
    setIsGitHubLoading(true);
    // TODO: Add signin using preferred provider
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsGitHubLoading(false);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            {signUp && (
              <div className="flex flex-row gap-4">
                <Input
                  onChange={(e) =>
                    setFirstName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
                  }
                  className="bg-primary/10 backdrop-blur-md"
                  placeholder="first name"
                  type="text"
                  value={firstName}
                />
                <Input
                  onChange={(e) =>
                    setLastName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
                  }
                  className="bg-primary/10 backdrop-blur-md"
                  placeholder="last name"
                  type="text"
                  value={lastName}
                />
              </div>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="email"
                      type="email"
                      autoCapitalize="none"
                      className="bg-primary/10 backdrop-blur-md"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading || isGitHubLoading}
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
                  <FormControl>
                    <Input
                      id="password"
                      placeholder="password"
                      type="password"
                      className="bg-primary/10 backdrop-blur-md"
                      autoCapitalize="none"
                      disabled={isLoading || isGitHubLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="submit"
              className={cn(
                buttonVariants(),
                "border-b-4 border-black/20 active:border-b-0 transition-all"
              )}
              disabled={isLoading || isGitHubLoading}
            >
              {" "}
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {signUp ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
