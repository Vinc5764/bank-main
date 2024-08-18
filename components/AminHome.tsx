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
import CurrentTariffsSkeleton from "./DashSkele";
import { SkeletonDemo } from "./Skeleton";
import noDataImage from "@/public/last image.png"; // Assuming you have this image in your public folder
import Image from "next/image";
const baseURL =
   "https://bank-server-7h17.onrender.com";

export default function AdminHome() {
  const [reports, setReports] = useState([]);
  const [results, setResults] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/admin/homepage`);
        const res = await axios.get(`${baseURL}/admin/reports`);
        setIsLoading(false);
        setResults(response.data);

        const combinedReports: any = [
          ...res.data.deposits.map((deposit: any) => ({
            ...deposit,
            type: "Deposit",
          })),
          ...res.data.withdrawals.map((withdrawal: any) => ({
            ...withdrawal,
            type: "Withdrawal",
          })),
        ];

        setReports(combinedReports);

        if (!response || !res) {
          throw new Error("Failed to fetch data");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    (async () => await fetchData())();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
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
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
                  Dasshboard
                </h2>
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
      </header> */}
      <main className="grid flex-1 items-start gap-4  sm:px-6 sm:py-0 md:gap-8">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                <h2 className="mt-6  text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
                  Dashboard
                </h2>
              </CardTitle>
              <CardDescription>
                Overview of your bank's activity and member details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <CurrentTariffsSkeleton />
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className=" text-blue-900 text-2xl  font-bold bg-clip-text  from-blue-500 via-purple-500 to-pink-500">
                        Total Members
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-blue-300 to-blue-500">
                        {results.users ?? 0}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className=" text-blue-900 text-2xl  font-bold bg-clip-text  from-blue-500 via-purple-500 to-pink-500">
                        Total Transactions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-blue-300 to-blue-500">
                        $
                        {results?.totalWithdrawals + results?.totalDeposits ??
                          0}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className=" text-blue-900 text-2xl  font-bold bg-clip-text  from-blue-500 via-purple-500 to-pink-500">
                        Total Deposits
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-blue-300 to-blue-500">
                        ${results?.totalDeposits ?? 0}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className=" text-blue-900 text-2xl  font-bold bg-clip-text  from-blue-500 via-purple-500 to-pink-500">
                        Total Withdrawals
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-blue-300 to-blue-500">
                        ${results?.totalWithdrawals ?? 0}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
          <Card className=" w-[380px] md:w-full">
            <CardHeader>
              <CardTitle className=" text-blue-900 text-2xl  font-bold bg-clip-text  from-blue-500 via-purple-500 to-pink-500">
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent className=" overflow-x-auto">
              {isLoading ? (
                <SkeletonDemo />
              ) : reports.length === 0 ? (
                <div className="flex flex-col my-8 gap-y-8 items-center justify-center">
                  <Image
                    src={noDataImage}
                    alt="No data fetched"
                    className="w-1/3 lg:w-1/12"
                  />
                  <p className="text-xl font-bold">No data fetched</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account Number</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((transaction: any, index: any) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {transaction.accountNumber}
                          </div>
                        </TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>
                          {new Date(
                            transaction.dateDeposited ||
                              transaction.dateWithdrawn
                          ).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${
                              transaction.status === "pending"
                                ? "bg-yellow-500"
                                : transaction.status === "success"
                                ? " bg-green-500"
                                : "bg-red-500"
                            } text-white`}
                          >
                            {transaction.status ?? "rejected"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
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
      className="lucide lucide-activity"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
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
      className="lucide lucide-banknote"
    >
      <rect width="20" height="12" x="2" y="6" rx="2" ry="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
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
      className="lucide lucide-layout-dashboard"
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
      className="lucide lucide-menu"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
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
      className="lucide lucide-users"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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
      className="lucide lucide-trash"
    >
      <path d="M3 6h18" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}
