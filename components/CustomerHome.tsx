'use client'

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/iaWvTIKlHth
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

export default function CustomerHome() {
   useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await fetch(`http://localhost:3000/users/details`);
         if (!response.ok) {
           throw new Error("Failed to fetch data");
         }
         const data = await response.json();
         console.log(data);

         //  setFetchedData(data);
       } catch (error) {
         console.error("Error fetching data:", error);
       }
     };

     (async () => await fetchData())();
   }, []);
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <main className="flex-1 p-4 sm:p-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Account Balance</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-4xl font-bold">$5,234.56</div>
              <Link href="/dashboard/deposits" className="text-primary" prefetch={false}>
              <Button variant="outline" size="sm">
                Deposit
              </Button>
                
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pending Withdrawals</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-4xl font-bold">$1,200.00</div>
              <Link href="/dashboard/withdraw" className="text-primary" prefetch={false}>
              <Button variant="outline" size="sm">
                Withdraw
              </Button>
                
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ArrowDownIcon className="h-5 w-5 text-green-500" />
                    <div>Deposit</div>
                  </div>
                  <div className="text-green-500 font-medium">+$500.00</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ArrowUpIcon className="h-5 w-5 text-red-500" />
                    <div>Withdrawal</div>
                  </div>
                  <div className="text-red-500 font-medium">-$200.00</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ArrowDownIcon className="h-5 w-5 text-green-500" />
                    <div>Deposit</div>
                  </div>
                  <div className="text-green-500 font-medium">+$1,000.00</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="#" className="text-primary" prefetch={false}>
                View all transactions
              </Link>
            </CardFooter>
          </Card>
        </div>
        {/* <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Deposit Funds</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Deposit
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Withdraw Funds</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Withdraw
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ArrowDownIcon className="h-5 w-5 text-green-500" />
                    <div>Deposit</div>
                  </div>
                  <div className="text-green-500 font-medium">+$500.00</div>
                  <div className="text-xs text-muted-foreground">
                    2023-04-15
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ArrowUpIcon className="h-5 w-5 text-red-500" />
                    <div>Withdrawal</div>
                  </div>
                  <div className="text-red-500 font-medium">-$200.00</div>
                  <div className="text-xs text-muted-foreground">
                    2023-04-10
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ArrowDownIcon className="h-5 w-5 text-green-500" />
                    <div>Deposit</div>
                  </div>
                  <div className="text-green-500 font-medium">+$1,000.00</div>
                  <div className="text-xs text-muted-foreground">
                    2023-04-05
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="#" className="text-primary" prefetch={false}>
                View all transactions
              </Link>
            </CardFooter>
          </Card>
        </div> */}
      </main>
    </div>
  );
}

function ArrowDownIcon(props:any) {
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
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}

function ArrowUpIcon(props:any) {
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
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

function BanknoteIcon(props:any) {
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

function XIcon(props:any) {
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
