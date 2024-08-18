"use client";

import React, { useEffect, useState } from "react";
import CustomerHome from "@/components/CustomerHome";
import useTokenStore from "@/lib/store";

// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/Dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AdminHome from "@/components/AminHome";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
const baseURL =
  "https://bank-server-7h17.onrender.com";

const HomePage = () => {
  const { userType, datas, setUserType, setNames }: any = useTokenStore();
  const [resolvedUserType, setResolvedUserType] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Set the resolved user type from the store when the component mounts
    if (userType) {
      setResolvedUserType(userType);
      if (userType === "newMember") {
        setShowModal(true);
      }
    }
  }, [userType]);

  // Handle cases where userType might not be resolved immediately
  if (resolvedUserType === null) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  const handleSave = async () => {
    try {
      // Replace this URL with the actual endpoint for updating the user's profile
      const apiUrl = `${baseURL}/users/reset`;
      console.log(datas);

      // Data to send in the request body
      const data = {
        name,
        password,
        userId: datas?.account?._id,
      };

      // Make the POST request to update the user's name and password
      const response = await axios.post(apiUrl, data);

      if (response.status === 200) {
        // Handle successful response
        setUserType("customer");
        setNames(response.data.user.name);
        console.log(response.data);

        alert("User updated successfully");
        setShowModal(false); // Close the modal after saving
      } else {
        // Handle non-200 responses
        console.error("Failed to update user", response.data);
      }
    } catch (error) {
      // Handle errors
      console.error("Error updating user", error);
    }
  };

  return (
    <div>
      {resolvedUserType === "customer" ? <CustomerHome /> : <AdminHome />}

      {showModal && (
        <Dialog open={true} onOpenChange={() => setShowModal(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Name and Reset Password</DialogTitle>
              <DialogDescription>
                Please set your name and reset your password.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSave} className="mt-4">
                Save
              </Button>
              {/* <Button onClick={() => setShowModal(false)} className="mt-4">
                Close
              </Button> */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default HomePage;
