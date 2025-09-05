"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import loginImg from "@/assets/dashboard/login-img.png"
import logo from "@/assets/dashboard/logo.png"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"
// import { useForm, SubmitHandler } from "react-hook-form"

import { useId } from "react"
import { OTPInput, SlotProps } from "input-otp"
import { cn } from "@/lib/utils"
import Link from 'next/link'
import { useResendOtpMutation, useVerifyOtpMutation } from '@/redux/api/authApi'
import { toast } from 'sonner'

export default function ResetPassword() {

  const [otp, setOtp] = useState("");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();


const handleResend = async () => {
  const userId = localStorage.getItem("resetUserId"); 
 console.log("Resend OTP for User ID:", userId);
 
  if (!userId) {
    toast.error("User ID not found. Please retry the process.");
    return;
  }

  try {
    await resendOtp(userId).unwrap(); 
    toast.success("OTP resent successfully!");
  } catch (err: any) {
    toast.error(err?.data?.message || "Failed to resend OTP");
  }
};




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter the 6-digit code");
      return;
    }

    try {
      await verifyOtp({ code: otp }).unwrap();
      toast.success("OTP verified successfully!");
      window.location.href = "/change-password"; // redirect
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid or expired code");
    }
  };


  const id = useId()



  return (
    <div className="min-h-screen bg-background">
      <div className="grid grid-cols-2">
        <Image className="h-[100vh] w-auto" src={loginImg} alt="" />
        <div className="flex flex-col items-center justify-center">
          <div className="lg:-ml-32">
            <Image src={logo} height={24} width={111} alt="" />
            <h1 className="text-[32px] font-bold text-primary">Reset Password</h1>
            <p className="text-sm text-secondary font-medium">Enter the 6-digit code sent to your email</p>
          </div>

          <Card className="w-full mt-7 p-0 !bg-transparent border-0 shadow-none lg:max-w-md md:max-w-lg">
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="verification-code">Verification Code</Label>
                    <OTPInput
                      id={id}
                      onChange={setOtp}
                      containerClassName="flex items-center gap-3 has-disabled:opacity-50"
                      maxLength={6}
                      render={({ slots }) => (
                        <div className="flex gap-2">
                          {slots.map((slot, idx) => (
                            <Slot key={idx} {...slot} />
                          ))}
                        </div>
                      )}
                    />

                    <p className="text-sm text-secondary">
                      Didn’t get it?{" "}
                      <button
                        type="button"
                        onClick={handleResend}
                        disabled={isResending}
                        className="text-primary cursor-pointer underline disabled:opacity-50"
                      >
                        {isResending ? "Resending..." : "Resend"}
                      </button>
                    </p>


                    {/* {errors.email && <span className="text-red-600">Email is required</span>} */}
                  </div>


                  <Link href={'/change-password'}>
                    <Button
                      variant="outline"
                      type="submit"
                      className="w-full text-base py-5 hover:!text-primary/85 font-bold text-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? "Verifying..." : "Submit Code"}
                    </Button>
                  </Link>

                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "border-input bg-background text-foreground flex size-12 items-center justify-center rounded-md border font-medium shadow-xs transition-[color,box-shadow]",
        { "border-ring ring-primary  z-10 ring-[3px]": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  )
}
