/**
 * v0 by Vercel.
 * @see https://v0.dev/t/2UZXhRN5Jr3
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Signup() {
  const [file, setFile] = useState<any>(null);
  const handleFileChange = (event:any) => {
    setFile(event.target.files[0]);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-primary-foreground">
            Sign up your bank
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Join our platform and start accepting payments today.
          </p>
        </div>
        <form className="space-y-6" action="#" method="POST">
          <div>
            <Label htmlFor="bank-name" className="sr-only">
              Bank Name
            </Label>
            <Input
              id="bank-name"
              name="bank-name"
              type="text"
              autoComplete="bank-name"
              required
              placeholder="Bank Name"
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-primary-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <Label htmlFor="email-address" className="sr-only">
              Email address
            </Label>
            <Input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-primary-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <Label htmlFor="phone-number" className="sr-only">
              Phone Number
            </Label>
            <Input
              id="phone-number"
              name="phone-number"
              type="tel"
              autoComplete="tel"
              required
              placeholder="Phone Number"
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-primary-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <Label htmlFor="address" className="sr-only">
              Address
            </Label>
            <Textarea
              id="address"
              name="address"
              rows={3}
              required
              placeholder="Address"
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-primary-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <Label
              htmlFor="permit"
              className="block text-sm font-medium text-primary-foreground"
            >
              Upload permit
            </Label>
            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
              {file ? (
                <div className="flex flex-col items-center">
                  <img
                    src={file.url}
                    alt="Uploaded file"
                    width={200}
                    height={200}
                    className="mb-4 max-h-[200px] rounded-md object-contain"
                  />
                  <p className="text-sm text-muted-foreground">
                    {file.name} ({file.size} bytes)
                  </p>
                </div>
              ) : (
                <div className="space-y-1 text-center">
                  <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="flex text-sm text-muted-foreground">
                    <label
                      htmlFor="permit"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary-foreground"
                    >
                      <span>Upload a file</span>
                      <Input
                        id="permit"
                        name="permit"
                        type="file"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              )}
            </div>
          </div>
          <div>
            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function UploadIcon(props:any) {
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
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
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
