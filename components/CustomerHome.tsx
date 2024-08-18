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
import Image from "next/image";
import noDataImage from "@/public/last image.png"; // Update this with your actual image path
import { SkeletonDemo } from "./Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const baseURL = "https://bank-server-7h17.onrender.com";

export default function CustomerHome() {
  const [fetchData, setFetchedData] = useState<any>({});
  const { datas } = useTokenStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseURL}/users/reports`, {
          params: {
            accountNumber: datas?.account?.accountNumber,
          },
        });
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
          className="flex  items-center justify-between"
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
              ? `+ ₵ ${classifiedTransaction?.amount?.toFixed(2)}`
              : `- ₵ ${classifiedTransaction?.amount?.toFixed(2)}`}
          </div>
        </div>
      );
    });

  const reports = fetchData?.allTransactions || [];

  return (
    <div className="flex  flex-col  bg-background">
      <main className=" md:w-full gap-5 p-4 sm:p-6">
        {isLoading ? (
          <Current />
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-900 font-bold bg-clip-text from-blue-500 via-purple-500 to-pink-500">
                  Citti Savings
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-blue-300 to-blue-500">
                  ₵ {fetchData?.totals?.savings?.toFixed(2) || 0.0}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-900 font-bold bg-clip-text from-blue-500 via-purple-500 to-pink-500">
                  Citti Shares
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-blue-300 to-blue-500">
                  ₵ {fetchData?.totals?.shares?.toFixed(2) || 0.0}
                </div>
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader>
                <CardTitle className="text-blue-900 font-bold bg-clip-text from-blue-500 via-purple-500 to-pink-500">
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">{recentTransactions}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-900 font-bold bg-clip-text from-blue-500 via-purple-500 to-pink-500">
                  Total Balance
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-blue-300 to-blue-500">
                  ₵{" "}
                  {(
                    (fetchData?.totals?.savings || 0) +
                    (fetchData?.totals?.shares || 0)
                  ).toFixed(2)}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      <Card className="w-[390px] md:w-full mt-10">
        <CardHeader>
          <CardTitle className="text-blue-900 text-lg sm:text-2xl font-bold bg-clip-text from-blue-500 via-purple-500 to-pink-500">
            All Transactions
          </CardTitle>
        </CardHeader>
        <div className="overflow-x-auto ">
          <CardContent>
            {isLoading ? (
              <SkeletonDemo />
            ) : reports.length === 0 ? (
              <div className="flex flex-col my-8 gap-y-8 items-center justify-center">
                <Image
                  src={noDataImage}
                  alt="No data fetched"
                  className="w-2/3 lg:w-1/4"
                />
                <p className="text-lg sm:text-xl font-bold">No data fetched</p>
              </div>
            ) : (
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Account Number</TableHead>
                    <TableHead>Amount(GHS)</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((transaction: any, index: any) => {
                    const classifiedTransaction =
                      classifyTransaction(transaction);

                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {transaction.accountNumber}
                          </div>
                        </TableCell>
                        <TableCell>{classifiedTransaction.amount}.00</TableCell>
                        <TableCell>{classifiedTransaction.type}</TableCell>{" "}
                        <TableCell>{transaction.account}</TableCell>
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
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </div>
      </Card>
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
      <path d="M12 19V6"></path>
      <path d="M5 12l7 7 7-7"></path>
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
      <path d="M12 5v13"></path>
      <path d="M19 12l-7-7-7 7"></path>
    </svg>
  );
}
