"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/utils/upload";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";

export default function Signup() {
  const [file, setFile] = useState<any>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = async (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      try {
        const response = await uploadFile(selectedFile);
        setFileUrl(response.secure_url); // Adjust this based on Cloudinary response structure
        setFile(selectedFile);
        console.log(response);
      } catch (error) {
        console.error("File upload failed:", error);
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted

    const data = {
      ...formData,
      bankPermit: fileUrl,
      userType: "bank",
    };

    try {
      const response = await fetch(
        "https://bank-server-7h17.onrender.com/admin/bank/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("Bank signed up successfully");
        setLoading(false);
        router.push("/"); // Redirect to the login page on successful signup
      } else {
        console.error("Failed to sign up bank");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
            Sign up your bank
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join our platform and start accepting payments today.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Form fields */}
          <div>
            <Label htmlFor="name" className="sr-only">
              Bank Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Bank Name"
              value={formData.name}
              onChange={handleInputChange}
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-primary-foreground placeholder-gray-700 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <Label htmlFor="email" className="sr-only">
              Email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-primary-foreground placeholder-gray-700 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-primary-foreground placeholder-gray-700 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber" className="sr-only">
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              autoComplete="tel"
              required
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-primary-foreground placeholder-gray-700 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
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
              value={formData.address}
              onChange={handleInputChange}
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-primary-foreground placeholder-gray-700 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <Label
              htmlFor="permit"
              className="block text-sm font-medium text-gray-700"
            >
              Upload permit
            </Label>
            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
              {file ? (
                <div className="flex flex-col items-center">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Uploaded file"
                    width={200}
                    height={200}
                    className="mb-4 max-h-[200px] rounded-md object-contain"
                  />
                  <p className="text-sm text-gray-600">
                    {file.name} ({file.size} bytes)
                  </p>
                </div>
              ) : (
                <div className="space-y-1 text-center">
                  <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="permit"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
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
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              )}
            </div>
          </div>
          <div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white"
            >
              {loading ? <Spinner /> : "Sign Up"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function UploadIcon(props: any) {
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
