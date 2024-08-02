"use client";
import { useState } from "react";
import Link from "next/link";
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
import axios from "axios";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

const Page = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bankType, setBankType] = useState(""); // State for bank type
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // State for loading
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Set loading to true when request starts
    try {
      const response = await axios.post("http://localhost:3001/users/signup", {
        userid: fullName,
        email: email,
        password: password,
        bankType: bankType, // Include bankType in the request
      });
      console.log(response.data);
      setLoading(false); // Set loading to false when request ends
      router.push("/"); // Redirect after successful registration
    } catch (error: any) {
      console.error("Sign-up failed", error);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  return (
    <form className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
      <Card className="mx-auto ">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="full-name">User Id</Label>
                <Input
                  id="full-name"
                  placeholder="Max"
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bank-type">Select Bank </Label>
              <select
                id="bank-type"
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setBankType(e.target.value)}
                value={bankType}
                required
              >
                <option value="">Select...</option>
                <option value="Savings">Cal Bank</option>

                {/* Add more options as needed */}
              </select>
            </div>
            <Button
              onClick={handleSubmit}
              className="w-full"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Create an account"}
            </Button>
            {/* <Button variant="outline" className="w-full">
              Sign up with GitHub
            </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href={`/`} className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default Page;
