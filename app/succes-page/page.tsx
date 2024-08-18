// app/success-page/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import SuccessPage from "@/components/SuccessPage";
const baseURL =
  "http://localhost:3001" || "https://bank-server-7h17.onrender.com";

const page = () => {
  const router: any = useRouter();
  const [paymentStatus, setPaymentStatus] = useState<string>("Verifying...");

  useEffect(() => {
    // Extract query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const reference = urlParams.get("reference");

    const verifyPayment = async () => {
      try {
        if (reference) {
          const response = await axios.get(`${baseURL}/deposit/verify`, {
            params: {
              reference,
            },
          });

          if (response.data.status === "success") {
            setPaymentStatus("Payment Successful!");
          } else {
            setPaymentStatus("Payment Verification Failed!");
          }
        }
      } catch (error) {
        console.error("Error verifying payment: ", error);
        setPaymentStatus("Error during payment verification.");
      }
    };

    verifyPayment();
  }, [router.query]); // React to changes in query parameters

  return (
    <div>
      <h1>{paymentStatus}</h1>
      {/* Additional UI or redirection logic */}
      <SuccessPage />
    </div>
  );
};

export default page;
