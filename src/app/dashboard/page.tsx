"use client";

// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  // const { data: session, status } = useSession();

  return (
    <div className="full-vh flex-center">
      <div>
        <h1>Welcome!</h1>
        <p>You are now signed in to SentioPulse.</p>
      </div>
    </div>
  );
}
