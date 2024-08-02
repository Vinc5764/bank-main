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
import useTokenStore from "@/lib/store";

export default function CreateMembers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [csvFile, setCsvFile] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  // const { token, userType, clearToken, name } = useTokenStore();
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
        "https://9a14-197-251-205-122.ngrok-free.app/admin/members",
        {
          name,
          email,
          password,
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
        // Filter out rows where name, email, password, selectedBank, or accountNumber is empty
        const validData = results.data.filter(
          (row: any) =>
            row.name &&
            row.email &&
            row.password &&
            row.selectedBank &&
            row.accountNumber
        );

        console.log("Filtered Results:", validData);

        try {
          const response = await axios.post(
            "http://localhost:3001/admin/bulkmembers",
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
    <div className="flex h-screen w-full flex-col">
      <main className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Create Member</CardTitle>
              <CardDescription>
                Add a new member to your organization.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter name"
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
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                    />
                  </div>
                  {/* <div className="space-y-2">
                    <Label htmlFor="selectedBank">Selected Bank</Label>
                    <Input
                      id="selectedBank"
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      placeholder="Enter selected bank"
                    />
                  </div> */}
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="Enter account number"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCreateMember} className="w-full">
                {loading ? <Spinner /> : "Create Member"}
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Bulk Create Members</CardTitle>
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
              <Button onClick={handleCreateMembersInBulk} className="w-full">
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
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
