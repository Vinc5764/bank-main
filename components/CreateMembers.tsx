"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Spinner from "./Spinner";

export default function CreateMembers() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [balance, setBalance] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [csvFile, setCsvFile] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://9a14-197-251-205-122.ngrok-free.app/api/getMembers`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    (async () => await fetchData())();
  }, []);

  const handleCreateMember = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://bank-server-7h17.onrender.com/admin/members",
        {
          email,
          password,
          mobileNumber,
          balance,
          accountNumber,
        }
      );
      const token = response.data.token;
      console.log(response.data);
      setLoading(false);
      setIsModalOpen(true); // Open the modal on success
    } catch (error) {
      console.error("Sign-up failed", error);
      setLoading(false);
    }
  };

  const handleCreateMembersInBulk = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (!csvFile) {
      console.error("No file selected");
      return;
    }

    Papa.parse(csvFile, {
      header: true,
      complete: async (results: any) => {
        // Filter out rows where email, password, mobileNumber, balance, or accountNumber is empty
        const validData = results.data.filter(
          (row: any) =>
            row.email &&
            row.password &&
            row.mobileNumber &&
            row.balance &&
            row.accountNumber
        );

        console.log("Filtered Results:", validData);

        try {
          const response = await axios.post(
            "https://bank-server-7h17.onrender.com/admin/bulkmembers",
            validData
          );
          console.log("Backend Response:", response.data);
          setIsLoading(false);
          setIsModalOpen(true); // Open the modal on success
        } catch (error) {
          console.error("Bulk upload failed", error);
          setIsLoading(false);
        }
      },
      error: (error: any) => {
        console.error("CSV parsing error", error);
        setIsLoading(false);
      },
    });
  };

  return (
    <div className="flex  w-full flex-col">
      <main className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>
                <h2 className="mt-6  text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
                  Create Member
                </h2>
              </CardTitle>
              <CardDescription>
                Add a new member to your organization.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="Enter account number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobileNumber">Mobile Number</Label>
                    <Input
                      id="mobileNumber"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="Enter mobile number,Eg 0554674801"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="balance">Balance</Label>
                    <Input
                      id="balance"
                      type="number"
                      value={balance}
                      onChange={(e) => setBalance(e.target.value)}
                      placeholder="Enter balance"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleCreateMember}
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white"
              >
                {loading ? <Spinner /> : "Create Member"}
              </Button>
            </CardFooter>
          </Card>
          <Card className=" h-[50vh]">
            <CardHeader>
              <CardTitle>
                <h2 className="mt-6  text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
                  Bulk Create Members
                </h2>
              </CardTitle>
              <CardDescription>
                Upload a CSV file to create multiple members at once.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="file">Upload CSV</Label>
                    <Input
                      id="file"
                      type="file"
                      onChange={(e: any) => setCsvFile(e.target.files[0])}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleCreateMembersInBulk}
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white"
              >
                {isloading ? <Spinner /> : "Upload and Create Members"}
              </Button>
            </CardFooter>
          </Card>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <div className="flex flex-col items-center justify-center gap-4 py-8">
              <CircleCheckIcon className="size-12 text-green-500" />
              <p className="text-lg font-medium">
                Member(s) created successfully!
              </p>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button">OK</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}

function CircleCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 11l3 3L22 4M22 12A10 10 0 1112 2a10 10 0 0110 10z"
      />
    </svg>
  );
}
