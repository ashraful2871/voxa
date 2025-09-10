"use client";
import React, { useEffect, FC } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "@/utils/auth";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): FC<P> => {
  const WithAuthComponent: FC<P> = (props) => {
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated()) {
        router.replace("/login"); // redirect to login if not authenticated
      }
    }, [router]);

    // Show nothing while checking auth
    if (!isAuthenticated()) return null;

    return React.createElement(WrappedComponent, props);
  };

  return WithAuthComponent;
};

export default withAuth;
