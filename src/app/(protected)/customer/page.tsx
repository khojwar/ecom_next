"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Customer() {
    const { data: session, status } = useSession()
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/login');
        }
    }, [status, router]);

    const handleSignOut = () => {
        signOut()
            .then(() => {
                router.push('/login');
            });
    }

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
        return null;
    }

    if (status === "authenticated" && (session?.user?.role === "customer" || session?.user?.role === "admin")) {
        return (
            <div>
                <p>Signed in as {session?.user?.email}</p>
                <p>Your role is: {session?.user?.role} </p>
                <p>Welcome to the customer dashboard!</p>

                <Button variant="link" onClick={handleSignOut}>Sign out</Button>
            </div>
        )
    } else {
        router.push('/login');
        return null;
    }

}
