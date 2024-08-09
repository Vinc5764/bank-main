"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Spinner from "@/components/Spinner";
import useTokenStore from "@/lib/store";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const { setToken } = useTokenStore();
  const { token } = useTokenStore();

  const r = useRouter();

  useEffect(() => {
    if (!token) {
      r.push("/sign-in");
    } else {
      r.push("/dashboard");
    }
  }, [token, r]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    setEmailError(null);
    setPasswordError(null);
    try {
      setIsLoading(true);
      const response: any = await fetch(
        "https://bank-payment-server.onrender.com/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer f3eac184635c8886dcb0a2b1f1dcdf35b5b2ae778d1c36f95245ba58278df78222e9d5ec48532a14608d1b3c3665f9def41f`,
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      const res = await response.json();

      setIsLoading(false);
      const token = res?.token;

      setToken(token, res?.accountType, res?.account?.name, res);

      if (res.token) {
        r.push("/dashboard/");
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);

      if (error.response) {
        const { status, data } = error.response;
        if (status === 404) {
          setEmailError("This User does not exist");
        } else if (status === 400) {
          setPasswordError("Incorrect password");
        } else {
          setError("Login failed. Please try again.");
        }
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <form
      className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900"
      onSubmit={handleSubmit}
    >
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
            Login
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">User Id</Label>
              <Input
                id="text"
                type="text"
                placeholder="simon123"
                onChange={(e) => setEmail(e.target.value)}
                className={`${
                  emailError ? "border-red-500" : "border-transparent"
                } focus:border-transparent focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50`}
                required
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className={`${
                  passwordError ? "border-red-500" : "border-transparent"
                }`}
                required
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white"
            >
              {isLoading ? <Spinner /> : "Login"}
            </Button>
            <Button
              variant="outline"
              className="w-full border border-transparent text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
            >
              Login with Google
            </Button>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
          )}
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href={`/sign-up/banks`}
              className="underline text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default Page;
