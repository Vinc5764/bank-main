"use client";
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
import { useEffect, useState } from "react";
import useTokenStore from "@/lib/store";
import axios from "axios";
import Current from "./Current";

export default function CustomerHome() {
  const [fetchData, setFetchedData] = useState<any>({});
  const { datas } = useTokenStore();
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://bank-payment-server.onrender.com/users/reports`,
          {
            params: {
              accountNumber: datas?.account?.accountNumber,
            },
          }
        );
        setIsLoading(false);
        setFetchedData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [datas?.account?.accountNumber]);

  const classifyTransaction = (transaction: any) => {
    if (transaction.dateWithdrawn) {
      return {
        type: "Withdrawal",
        amount: transaction.amount,
      };
    } else if (transaction.dateDeposited) {
      return {
        type: "Deposit",
        amount: transaction.amount,
      };
    }
    return {
      type: "Unknown",
      amount: 0,
    };
  };

  const recentTransactions = fetchData?.allTransactions
    ?.slice(-3)
    .map((transaction: any) => {
      const classifiedTransaction = classifyTransaction(transaction);
      return (
        <div
          key={transaction._id}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            {classifiedTransaction.type === "Deposit" ? (
              <ArrowDownIcon className="h-5 w-5 text-green-500" />
            ) : (
              <ArrowUpIcon className="h-5 w-5 text-red-500" />
            )}
            <div>{classifiedTransaction.type}</div>
          </div>
          <div
            className={
              classifiedTransaction.type === "Deposit"
                ? "text-green-500 font-medium"
                : "text-red-500 font-medium"
            }
          >
            {classifiedTransaction.type === "Deposit"
              ? `+$${classifiedTransaction?.amount?.toFixed(2)}`
              : `-$${classifiedTransaction?.amount?.toFixed(2)}`}
          </div>
        </div>
      );
    });

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <main className="flex-1 p-4 sm:p-6">
        {isloading ? (
          <Current />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="shadow-md border-none">
              <CardHeader>
                <CardTitle className=" text-blue-900 text-4xl  font-bold bg-clip-text  from-blue-500 via-purple-500 to-pink-500">
                  Citti Savings
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-blue-300 to-blue-500">
                  ₵ {fetchData?.totals?.checking?.toFixed(2) || 0.0}
                </div>
                {/* <Link href="/dashboard/deposits" prefetch={false}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-none hover:opacity-90"
                  >
                    Deposit
                  </Button>
                </Link> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className=" text-blue-900 text-4xl  font-bold bg-clip-text  from-blue-500 via-purple-500 to-pink-500">
                  Citti Shares
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                {/* <div className="text-4xl font-bold">
                  ₵{fetchData?.totals?.investing?.toFixed(2) ?? 0.0}
                </div> */}
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-blue-300 to-blue-500">
                  ₵ {fetchData?.totals?.investing?.toFixed(2) || 0.0}
                </div>
                {/* <Link
                  href="/dashboard/withdraw"
                  className="text-primary"
                  prefetch={false}
                >
                  <Button variant="outline" size="sm">
                    Deposit
                  </Button>
                </Link> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className=" text-blue-900 text-4xl  font-bold bg-clip-text  from-blue-500 via-purple-500 to-pink-500">
                  Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">{recentTransactions}</div>
              </CardContent>
              <CardFooter>
                <Link href="#" className="text-primary" prefetch={false}>
                  View all transactions
                </Link>
              </CardFooter>
            </Card>
            {/* <Card>
              <CardHeader>
                <CardTitle>Savings Account</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-4xl font-bold">
                  ${fetchData?.totals?.savings?.toFixed(2) ?? 0.0}
                </div>
              </CardContent>
            </Card> */}
            <Card>
              <CardHeader>
                <CardTitle className=" text-blue-900 text-4xl  font-bold bg-clip-text  from-blue-500 via-purple-500 to-pink-500">
                  Total Balance
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-blue-300 to-blue-500">
                  ₵ {fetchData?.totals?.checking?.toFixed(2) || 0.0}
                </div>
                {/* <Link
                  href="/dashboard/deposits"
                  className="text-primary"
                  prefetch={false}
                >
                  <Button variant="outline" size="sm">
                    Deposit
                  </Button>
                </Link>
                <Link
                  href="/dashboard/withdraw"
                  className="text-primary"
                  prefetch={false}
                >
                  <Button variant="outline" size="sm">
                    withdraw
                  </Button>
                </Link> */}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

function ArrowDownIcon(props: any) {
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

function ArrowUpIcon(props: any) {
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
