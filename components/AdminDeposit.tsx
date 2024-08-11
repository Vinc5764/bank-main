"use client";

import { useState, useEffect } from "react";
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
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export default function AdminDeposit() {
  // State variables for form inputs
  const [accountType, setAccountType] = useState("");
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<any>([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  console.log(selectedCustomer);

  useEffect(() => {
    // Fetch customers from the backend
    async function fetchCustomers() {
      try {
        const response = await axios.get(
          "https://bank-payment-server.onrender.com/admin/members"
        );
        setCustomers(response.data);
      } catch (error) {
        console.error("Failed to fetch customers", error);
        // toast.error("Failed to fetch customers!");
      }
    }

    fetchCustomers();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3001/deposit", {
        account: accountType,
        amount,
        email,
        accountNumber: selectedCustomer,
      });

      console.log(response);

      if (response.data.data.authorization_url) {
        window.location.href = response.data.data.authorization_url;
      } else {
        console.error("Authorization URL not found in the response.");
        // toast.error("Authorization URL not found in the response.");
      }

      console.log(" successful:", response.data);
      // toast.success("Deposit initiated successfully!");
    } catch (error) {
      console.error("Withdrawal failed", error);
      // toast.error("Deposit failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto p-6">
      {/* <ToastContainer /> */}
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="mt-6  text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
              Deposit Customer Funds
            </h2>
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
                    <SelectItem value="checking">Checking</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
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
            {/* <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div> */}
            <div className="space-y-2">
              <Label htmlFor="customer">Select Customer</Label>
              <Select
                value={selectedCustomer}
                onValueChange={setSelectedCustomer}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer: any) => (
                    <SelectItem
                      key={customer.id}
                      value={customer.accountNumber}
                    >
                      {customer.accountNumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white"
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
