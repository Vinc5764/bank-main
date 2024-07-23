"use client";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/UsCx6XsExpU
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
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

export default function CreateMembers() {
  const [userid, setUserid] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [csvFile, setCsvFile] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://bank-payment-server.onrender.com/api/getMembers`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);

        // setFetchedData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    (async () => await fetchData())();
  }, []);

  const handleCreateMember = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://bank-payment-server.onrender.com/admin/members",
        {
          userid: userid,
          email: email,
          password: password,
        }
      );
      const token = response.data.token;
      // localStorage.setItem("token", token);
      console.log(response.data);
      setIsModalOpen(true); // Open the modal on success
      // router.push("/"); // Redirect after successful registration
    } catch (error) {
      console.error("Sign-up failed", error);
    }
  };

  const handleCreateMembersInBulk = async (e: any) => {
    e.preventDefault();

    if (!csvFile) {
      console.error("No file selected");
      return;
    }

    Papa.parse(csvFile, {
      header: true,
      complete: async (results: any) => {
        // Filter out rows where userid is empty
        const validData = results.data.filter((row: any) => row.userid);

        console.log("Filtered Results:", validData);

        try {
          const response = await axios.post(
            "https://4195-102-176-65-181.ngrok-free.app/admin/bulkmembers",
            validData
          );
          console.log("Backend Response:", response.data);
          setIsModalOpen(true); // Open the modal on success
        } catch (error) {
          console.error("Bulk upload failed", error);
        }
      },
      error: (error: any) => {
        console.error("CSV parsing error", error);
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
                    <Label htmlFor="userid">User ID</Label>
                    <Input
                      id="userid"
                      value={userid}
                      onChange={(e) => setUserid(e.target.value)}
                      placeholder="Enter user ID"
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
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCreateMember} className="w-full">
                Create Member
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
                Upload and Create Members
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

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/qtFhYqwDhEd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

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

// function XIcon(props:any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 6 6 18" />
//       <path d="m6 6 12 12" />
//     </svg>
//   )
// }

function FilePenIcon(props: any) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function MountainIcon(props: any) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function TrashIcon(props: any) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function XIcon(props: any) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
