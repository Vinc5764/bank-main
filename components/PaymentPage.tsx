"use client";

import { useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Spinner from "./Spinner";
import useTokenStore from "@/lib/store";
const baseURL = "https://bank-server-7h17.onrender.com";

export default function Withdrawal() {
  // State variables for form inputs
  const [accountType, setAccountType] = useState("");
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { datas } = useTokenStore();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${baseURL}/deposit`, {
        account: accountType,
        amount,
        email,
        accountNumber: datas?.account?.accountNumber,
      });

      console.log(response);

      if (response.data.data.data.authorization_url) {
        window.location.href = response.data.data.data.authorization_url;
      } else {
        console.error("Authorization URL not found in the response.");
      }

      console.log(" successful:", response.data);
    } catch (error) {
      console.error("Withdrawal failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid  gap-8   items-center justify-center mx-auto p-6">
      {/* <Card>
        <CardHeader>
          <CardTitle>Your Card</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCardIcon className="w-6 h-6" />
              <span className="font-medium">Visa</span>
            </div>
            <div className="text-muted-foreground">**** **** **** 4532</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">Cardholder Name</div>
            <div>John Doe</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">Expires</div>
            <div>12/24</div>
          </div>
        </CardContent>
      </Card> */}
      <Card>
        <CardHeader>
          <CardTitle className="mt-6  text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
            Deposit Funds
          </CardTitle>
          <CardDescription>Enter the details for your Deposit.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="account-type">Account Type</Label>
                <Select value={accountType} onValueChange={setAccountType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* <SelectItem value="checking">Checking</SelectItem> */}
                    <SelectItem value="savings">Citti Savings</SelectItem>
                    <SelectItem value="shares">Citti Shares</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white"
              size="lg"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Deposit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function CreditCardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}
