"use client";

import { Button } from "@/components/ui/button"
import { FcGoogle } from 'react-icons/fc';
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react";



export default function Login() {
    const { data: session } = useSession();

    if (session) {
        return (
            <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
                Signed in as {session.user?.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        );
    }
    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <Button variant={"outline"} onClick={() => signIn("google")}> <FcGoogle /> Signin with Google</Button>
        </div>
    );
}