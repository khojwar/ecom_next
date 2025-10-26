import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type { SessionStrategy } from "next-auth";


export const authOptions = {
    providers: [
        // Google OAuth
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        // Custom Credentials (like your own login form)
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error("Missing email or password")
                }

                const user = { id: "1", name: "tika", email: "tika@gmail.com", password: "tika" }

                if (credentials.email === user.email && credentials.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
      callbacks: {
        async jwt({ token, user }: any) {
        if (user) {
            token.id = user.id;
            token.role = user.role || "supplier";   // Add role on sign-in
        }
        return token;
        },
        async session({ session, token }: any) {
        if (session.user) {
            session.user.id = token.id as string;
            session.user.role = token.role as string;   // Make role accessible in session
        }
        return session;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    session: {
        strategy: "jwt" as SessionStrategy,
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
}
