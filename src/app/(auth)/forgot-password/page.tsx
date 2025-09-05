"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import loginImg from "@/assets/dashboard/login-img.png";
import logo from "@/assets/dashboard/logo.png";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { toast } from "sonner";

type Inputs = {
  email: string;
};

export default function ForgotPassword() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

const onSubmit: SubmitHandler<Inputs> = async (data) => {
  try {
    await forgotPassword({ email: data.email }).unwrap();

    toast.success("Check your email for the 6-digit reset code"); 
    window.location.href = "/reset-password";
  } catch (error: any) {
    toast.error(error?.data?.message || "Something went wrong"); 
  }
};


  return (
    <div className="min-h-screen bg-background">
      <div className="grid grid-cols-2">
        <Image className="h-[100vh] w-auto" src={loginImg} alt="" />
        <div className="flex flex-col items-center justify-center">
          <div className="lg:ml-4">
            <Image src={logo} height={24} width={111} alt="" />
            <h1 className="text-[32px] font-bold text-primary">
              Forgot your admin password?
            </h1>
            <p className="text-sm text-secondary font-medium">
              Enter your email and we’ll send you a 6-digit code
            </p>
          </div>

          <Card className="w-full mt-7 p-0 !bg-transparent border-0 shadow-none lg:max-w-md md:max-w-lg">
            <CardContent className="px-0">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      {...register("email", { required: "Email is required" })}
                      id="email"
                      type="email"
                      className="py-5 bg-transparent rounded-lg"
                      placeholder="Enter your admin email address"
                    />
                    {errors.email && (
                      <span className="text-primary">{errors.email.message}</span>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    type="submit"
                    className="w-full text-base py-5 font-bold text-primary hover:!text-primary/85 bg-foreground"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Code"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
