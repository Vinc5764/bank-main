/**
 * v0 by Vercel.
 * @see https://v0.dev/t/9jaUQ69sLz2
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
          <CheckIcon className="h-8 w-8 text-white" />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Payment Successful
        </h1>
        <p className="mt-4 text-muted-foreground">
          Thank you for your payment. Your order is being processed and will be
          shipped soon.
        </p>
      </div>
      <div className="mt-8 w-full max-w-md space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Order Number:</span>
              <span>123456789</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Payment Method:</span>
              <span>Visa ending in 1234</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Amount:</span>
              <span className="font-medium">$99.99</span>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-center">
          <Link
            href="#"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

function CheckIcon(props: any) {
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
      <path d="M20 6 9 17l-5-5" />
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
