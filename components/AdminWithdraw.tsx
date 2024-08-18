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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { CircleCheckIcon } from "lucide-react";

const baseURL = "https://bank-server-7h17.onrender.com";

export default function AdminWithdrawal() {
  const [accountType, setAccountType] = useState("");
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await axios.get(`${baseURL}/admin/members`);
        setCustomers(response.data);
      } catch (error) {
        console.error("Failed to fetch customers", error);
      }
    }

    fetchCustomers();
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsModalOpen(true); // Open the confirmation modal
  };

  const handleConfirmWithdrawal = async () => {
    setLoading(true);
    setIsModalOpen(false); // Close the modal before processing

    try {
      const response = await axios.post(`${baseURL}/withdrawal/manual`, {
        account: accountType,
        amount,
        email,
        accountNumber: selectedCustomer,
      });

      setIsSuccessModalOpen(true); // Open the success modal
    } catch (error) {
      console.error("Withdrawal failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
              Withdraw Customer Funds
            </h2>
          </CardTitle>
          <CardDescription>
            Enter the details for your Withdrawal.
          </CardDescription>
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
              {loading ? <Spinner /> : "Withdraw"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <CircleCheckIcon className="size-12 text-green-500" />
            <p className="text-lg font-medium">
              Are you sure you want to proceed with the withdrawal?
            </p>
          </div>
          <DialogFooter>
            <Button onClick={handleConfirmWithdrawal} disabled={loading}>
              {loading ? <Spinner /> : "Confirm"}
            </Button>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <CircleCheckIcon className="size-12 text-green-500" />
            <p className="text-lg font-medium">Withdrawal successful!</p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button">OK</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
