"use client";

import * as React from "react";
import axios from "axios";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { CircleCheckIcon } from "lucide-react";
import Spinner from "./Spinner";

const baseURL = "https://bank-server-7h17.onrender.com";

export default function AdminWithdrawal() {
  const [accountType, setAccountType] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [customers, setCustomers] = React.useState<any>([]);
  const [selectedCustomer, setSelectedCustomer] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await axios.get(`${baseURL}/admin/members`);
        setCustomers(
          response.data.map((customer: any) => ({
            value: customer.accountNumber,
            label: customer.accountNumber,
          }))
        );
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
      await axios.post(`${baseURL}/withdrawal/manual`, {
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
            <div className="space-y-2 flex flex-col">
              <Label htmlFor="customer">Select Customer</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className=" justify-between"
                  >
                    {selectedCustomer
                      ? customers.find(
                          (customer: any) => customer.value === selectedCustomer
                        )?.label
                      : "Select customer..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className=" p-0">
                  <Command>
                    <CommandInput placeholder="Search customer..." />
                    <CommandList>
                      <CommandEmpty>No customer found.</CommandEmpty>
                      <CommandGroup>
                        {customers.map((customer: any) => (
                          <CommandItem
                            key={customer.value}
                            value={customer.value}
                            onSelect={(currentValue) => {
                              setSelectedCustomer(
                                currentValue === selectedCustomer
                                  ? ""
                                  : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedCustomer === customer.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {customer.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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
