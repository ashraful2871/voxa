"use client"
import React from 'react'
import { TbEyeFilled } from "react-icons/tb";
import { PiEyeSlashFill } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Swal from "sweetalert2";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import loginImg from "@/assets/dashboard/login-img.png"
import logo from "@/assets/dashboard/logo.png"
import Image from 'next/image';
import { useChangePasswordMutation } from '@/redux/api/authApi';

type Inputs = {
    newPassword: string;
    confirmPassword: string;
};

export default function ChangePassword() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

const onSubmit: SubmitHandler<Inputs> = async (data) => {
  if (data.newPassword !== data.confirmPassword) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Passwords do not match",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  const userId = localStorage.getItem("resetUserId");
  if (!userId) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "User not found. Please retry the process.",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  try {
    await changePassword({ userId, newPassword: data.newPassword }).unwrap();

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Password changed successfully",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      window.location.href = "/login";
    });
  } catch (err: any) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: err?.data?.message || "Failed to reset password",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};



  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  return (
    <div className="min-h-screen bg-background">
      <div className="grid grid-cols-2">
        <Image className="h-[100vh] w-auto" src={loginImg} alt="" />
        <div className="flex flex-col items-center justify-center">
          <div className="lg:ml-9">
            <Image src={logo} height={24} width={111} alt="" />
            <h1 className="text-[32px] font-bold text-primary">Reset Password</h1>
            <p className="text-sm text-secondary font-medium">Please enter your new password below. Make sure it’s strong and secure</p>
          </div>
          <Card className="w-full mt-7 p-0 !bg-transparent border-0 shadow-none lg:max-w-md md:max-w-lg">
            <CardContent className='px-0'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">

                  <div className="grid gap-2">
                    <Label htmlFor="newPassword">
                      New Password (Min. 8 characters)
                    </Label>

                    <div className="relative">
                      <Input
                        id="newPassword"
                        {...register("newPassword", {
                          required: true,
                          // minLength: 8,
                          // maxLength: 20,
                          // pattern:
                          //   /(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z])/,
                        })}
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="py-5 !bg-transparent rounded-lg"
                      />

                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-gray-300"
                      >
                        {showNewPassword ? <TbEyeFilled /> : <PiEyeSlashFill />}
                      </button>
                    </div>

                    {/* Error messages OUTSIDE the relative container */}
                    {errors.newPassword?.type === "required" && (
                      <span className="text-primary text-sm">
                        New password is required
                      </span>
                    )}
                    {errors.newPassword?.type === "minLength" && (
                      <span className="text-primary text-sm">
                        Password must be at least 8 characters
                      </span>
                    )}
                    {errors.newPassword?.type === "maxLength" && (
                      <span className="text-primary text-sm">
                        Password must be less than 20 characters
                      </span>
                    )}
                    {errors.newPassword?.type === "pattern" && (
                      <span className="text-primary text-sm">
                        Must contain uppercase, lowercase, number, and special character
                      </span>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        {...register("confirmPassword", {
                          // required: true,
                          // minLength: 8,
                          // maxLength: 20,
                          // pattern:
                          //   /(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z])/,
                        })}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter your password"
                        className="py-5 !bg-transparent rounded-lg"
                      />


                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 text-lg top-1/2 -translate-y-1/2 text-gray-300"
                      >
                        {showConfirmPassword ? <TbEyeFilled /> : <PiEyeSlashFill />}
                      </button>
                    </div>

                    {errors.confirmPassword?.type === "required" && (
                      <span className="text-red-600">Re-enter password is required</span>
                    )}
                  </div>


                    <Button type="submit" variant={'outline'} className=" text-base py-5 font-bold text-primary hover:!text-primary/85">
                      Reset Password
                    </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
