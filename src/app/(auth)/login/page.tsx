/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TbEyeFilled } from "react-icons/tb";
import { PiEyeSlashFill } from "react-icons/pi";

import loginImg from "@/assets/dashboard/login-img.png";
import logo from "@/assets/dashboard/logo.png";
import { useLoginMutation } from "@/redux/api/authApi";
import { setUser } from "@/redux/features/authSlice";
type Inputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    try {
      const result = await login(data).unwrap();
      console.log("Login successful:", result.data);

      // Cookies.set("accessToken", result.data.accessToken, {
      //   expires: 7, // 7 days
      //   secure: process.env.NODE_ENV === "production",
      //   sameSite: "strict",
      // });

      // Dispatch setUser with the token from response
      // Assuming your API returns { token: "...", user: {...} }
      dispatch(
        setUser({
          accessToken: result.data.accessToken,
          user: result.data,
        })
      );

      // If there's a refresh token, you can also set it
      if (result.refresh_token) {
        // You might need to import and dispatch setRefreshToken
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully logged in",
        showConfirmButton: false,
        timer: 1500,
      });

      localStorage.setItem("userId", result?.data?.id);

      // Retrieve it for logging
      // const userId = localStorage.getItem("userId");

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        window.location.href = "/admin/overview";
      }, 1000);
    } catch (error: any) {
      console.error("Login failed:", error);
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: error?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:block">
          <Image
            className="h-[100vh] w-full object-cover"
            src={loginImg}
            alt="Login Image"
            priority
          />
        </div>
        <div className="flex flex-col items-center justify-center px-4 py-8">
          <div className="lg:-ml-[85px] mb-8 text-center lg:text-left">
            <Image src={logo} height={24} width={111} alt="Logo" />
            <h1 className="text-[32px] font-bold text-primary mt-4">
              Admin Login
            </h1>
            <p className="text-sm text-secondary font-medium">
              Admin access only. All actions are logged for security.
            </p>
          </div>

          <Card className="w-full p-0 !bg-transparent border-0 shadow-none lg:max-w-md md:max-w-lg">
            <CardContent className="px-0">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  {/* Email */}
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your admin email address"
                      className="py-5 bg-transparent rounded-lg"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* Password */}
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="py-5 bg-transparent rounded-lg pr-10"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                          },
                          maxLength: {
                            value: 20,
                            message: "Password must be less than 20 characters",
                          },
                        })}
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <TbEyeFilled /> : <PiEyeSlashFill />}
                      </button>
                    </div>
                    {errors.password && (
                      <span className="text-red-500 text-sm">
                        {errors.password.message}
                      </span>
                    )}
                    <Link
                      href="/forgot-password"
                      className="ml-auto text-sm text-primary underline-offset-4 hover:underline mt-1"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="outline"
                    className="w-full text-base py-5 font-bold text-primary hover:!text-primary/85 bg-foreground"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Log In"}
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
