"use client";

import { useSession, signIn, signOut } from "next-auth/react"

import { useForm, Controller, SubmitHandler} from "react-hook-form"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

import { FcGoogle } from 'react-icons/fc';


// Define Zod schema
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(4, "Password must be at least 4 characters"),
});

// Generate TypeScript type from schema
type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
    const { control, handleSubmit, formState: { errors }} = useForm<LoginFormData>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(loginSchema),
    });

    const { data: session } = useSession();

    const onSubmit: SubmitHandler<LoginFormData> = (data) => {
        console.log(data);
    };

    if (session) {
        return (
            <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
                Signed in as {session.user?.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        );
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-sm p-4">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center mb-4">
                        <h1 className="text-3xl font-medium"> Sign in </h1>
                        <p className="text-xl">Get access to more learning features</p>
                    </div>
                    <div className="text-gray-400">Don't have an account? <a href="#" className="text-[#059862]">Register</a></div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-4 ">
                    <div className="mb-4 w-full">
                        {/* <label className="block mb-1">Email</label> */}
                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Input {...field} type="email" placeholder="Email" className="w-full" />
                            )}
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="mb-4 w-full">
                        {/* <label className="block mb-1">Password</label> */}
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Input {...field} type="password"  placeholder="Password" className="w-full"/>
                            )}
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        <a className="text-sm italic hover:underline" >Forgot your password?</a>
                    </div>

                    <Button type="submit" variant={"success"} className="w-full">Login</Button>
                </form>

                <div className="relative my-4">
                    <Separator />
                    <span className="absolute inset-x-0 -top-3 flex justify-center">
                    <span className="bg-white dark:bg-neutral-900 px-2 text-sm text-muted-foreground">
                        OR
                    </span>
                    </span>
                </div>
                
                <Button variant={"outline"} onClick={() => signIn("google")}> <FcGoogle /> Signin with Google</Button>
            </Card>
        </div>
    );
}