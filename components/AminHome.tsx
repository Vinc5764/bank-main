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

export default function AdminHome() {
  const [reports, setReports] = useState([]);
  const [results, setResults] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://bank-payment-server.onrender.com/admin/homepage`
        );
        const res = await axios.get(
          `https://bank-payment-server.onrender.com/admin/reports`
        );
        setIsLoading(false);
        setResults(response.data);

        const combinedReports:any = [
          ...res.data.deposits.map((deposit:any) => ({
            ...deposit,
            type: "Deposit",
          })),
          ...res.data.withdrawals.map((withdrawal:any) => ({
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
              {isLoading ? (
                <CurrentTariffsSkeleton />
              ) : (
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
                        ${results?.totalWithdrawals ?? 0}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <SkeletonDemo />
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
    >
      <path d="M22 12h-2.48a2 2 0 0 1-1.77-1.06l-3.27-6.11a2 2 0 0 0-1.77-1.06h-.18a2 2 0 0 0-1.77 1.06L7.88 8.94a2 2 0 0 1-1.77 1.06H2"></path>
      <polyline points="12 3 12 12 15 9 18 12"></polyline>
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
      <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
      <path d="M6 10h0"></path>
      <path d="M18 10h0"></path>
      <path d="M12 10v4"></path>
      <path d="M9 13h6"></path>
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
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
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
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
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
      <path d="M17 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M7 21v-2a4 4 0 0 1 3-3.87"></path>
      <path d="M12 10a4 4 0 0 0 0-8 4 4 0 0 0 0 8z"></path>
      <path d="M17 8a4 4 0 1 1-8 0"></path>
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
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="9" y1="9" x2="15" y2="15"></line>
      <line x1="15" y1="9" x2="9" y2="15"></line>
    </svg>
  );
}
