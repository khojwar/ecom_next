"use client";

import { Button } from "@/components/ui/button"
import { FcGoogle } from 'react-icons/fc';
import { useSession, signIn, signOut } from "next-auth/react"
import { useForm, Controller, SubmitHandler} from "react-hook-form"

interface ICredentials {
    email: string;
    password: string;
}

export default function Login() {
    const { control, handleSubmit, formState: { errors }} = useForm<ICredentials>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { data: session } = useSession();

    const onSubmit: SubmitHandler<ICredentials> = (data) => {
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
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-4  border shadow-2xl rounded-2xl p-4 m-4">
                      <Controller
                        name="email"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <input {...field} type="email" className="border rounded p-2" placeholder="abc@gmail.com" />
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <input {...field} type="password" className="border rounded p-2" placeholder="Password123#"/>
                        )}
                    />

                    <input type="submit" value="Submit" />
                
            </form>
            <hr />
            <Button variant={"outline"} onClick={() => signIn("google")}> <FcGoogle /> Signin with Google</Button>
        </div>
    );
}