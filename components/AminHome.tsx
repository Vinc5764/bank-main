/**
 * v0 by Vercel.
 * @see https://v0.dev/t/jum4yag2Cnm
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
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
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import axios from "axios";

const recentTransactions = [
  {
    member: { name: "John Doe", email: "johndoe@example.com" },
    amount: "$500",
    type: "Deposit",
    date: "2023-04-15",
    status: "Pending",
  },
  {
    member: { name: "Jane Smith", email: "janesmith@example.com" },
    amount: "$250",
    type: "Withdrawal",
    date: "2023-04-12",
    status: "Approved",
  },
  {
    member: { name: "Bob Johnson", email: "bobjohnson@example.com" },
    amount: "$1,000",
    type: "Deposit",
    date: "2023-04-10",
    status: "Approved",
  },
  {
    member: { name: "Sarah Lee", email: "sarahlee@example.com" },
    amount: "$300",
    type: "Withdrawal",
    date: "2023-04-08",
    status: "Approved",
  },
];

export default function AdminHome() {
  const [reports, setRports] = useState([]);
  const [results, setResults] = useState<any>([]);
  const pendingWithdrawals = [
    {
      member: { name: "John Doe", email: "johndoe@example.com" },
      amount: "$500",
      date: "2023-04-15",
    },
    {
      member: { name: "Jane Smith", email: "janesmith@example.com" },
      amount: "$250",
      date: "2023-04-12",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://bank-payment-server.onrender.com/admin/homepage`
        );
        const res = await axios.get(
          `https://bank-payment-server.onrender.com/admin/reports`
        );

        console.log(response);
        setResults(response.data);
        setRports(res.data.deposits);

        if (!response || !res) {
          throw new Error("Failed to fetch data");
        }

        //  setFetchedData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    (async () => await fetchData())();
  }, []);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                prefetch={false}
              >
                <BanknoteIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Bank Admin</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-foreground"
                prefetch={false}
              >
                <LayoutDashboardIcon className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <UsersIcon className="h-5 w-5" />
                Members
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <ActivityIcon className="h-5 w-5" />
                Transactions
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <DeleteIcon className="h-5 w-5" />
                Withdrawals
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild></DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Admin</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>
                Overview of your bank's activity and member details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Members</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-semibold">
                      {results.users}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Total Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-semibold">
                      ${results?.totalWithdrawals + results?.totalDeposits}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Total Deposits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-semibold">
                      ${results?.totalDeposits}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Total Withdrawals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-semibold">
                      ${results?.totalWithdrawals}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((transaction:any, index:any) => (
                    <TableRow key={index}>
                      <TableCell>
                        {/* <div className="font-medium">{transaction.account}</div> */}
                        <div className="text-sm text-muted-foreground">
                          {transaction.email}
                        </div>
                      </TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{transaction.account}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <Badge
                          className=" bg-green-500 text-white"
                          variant={
                            transaction.status === "Approved"
                              ? "outline"
                              : "secondary"
                          }
                        >
                          {transaction.status ?? "success"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="grid auto-rows-max items-start gap-4 md:gap-8">
          {/* <Card>
            <CardHeader>
              <CardTitle>Pending Withdrawals</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingWithdrawals.map((withdrawal, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">
                          {withdrawal.member.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {withdrawal.member.email}
                        </div>
                      </TableCell>
                      <TableCell>{withdrawal.amount}</TableCell>
                      <TableCell>{withdrawal.date}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" color="red">
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card> */}
          {/* <Card>
            <CardHeader>
              <CardTitle>Member Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Button>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Member
                </Button>
                <Button variant="outline">
                  <UsersIcon className="mr-2 h-4 w-4" />
                  View Members
                </Button>
                <Button variant="outline">
                  <FilePenIcon className="mr-2 h-4 w-4" />
                  Update Members
                </Button>
              </div>
            </CardContent>
          </Card> */}
          {/* <Card>
            <CardHeader>
              <CardTitle>Transaction Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Button variant="outline">
                  <ActivityIcon className="mr-2 h-4 w-4" />
                  View Transactions
                </Button>
                <Button variant="outline">
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Export Transactions
                </Button>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </main>
    </div>
  );
}

function ActivityIcon(props: any) {
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
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  );
}

function BanknoteIcon(props: any) {
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
      <rect width="20" height="12" x="2" y="6" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  );
}

function DeleteIcon(props: any) {
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
      <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
      <line x1="18" x2="12" y1="9" y2="15" />
      <line x1="12" x2="18" y1="9" y2="15" />
    </svg>
  );
}

function DownloadIcon(props: any) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

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

function LayoutDashboardIcon(props: any) {
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
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}

function MenuIcon(props: any) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function PlusIcon(props: any) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function SearchIcon(props: any) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UsersIcon(props: any) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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
