import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Tech ID", type: "text", placeholder: "TECH-001" },
                password: { label: "Passcode", type: "password" }
            },
            async authorize(credentials, req) {
                // Mock authentication for MVP Phase 1
                if (credentials?.username === "sysadmin" && credentials?.password === "farmsense2026") {
                    return { id: "1", name: "System Admin", role: "admin" }
                }
                if (credentials?.username?.startsWith("TECH") && credentials?.password === "blitz") {
                    return { id: "2", name: credentials.username, role: "technician" }
                }
                return null
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role
            }
            return token
        },
        async session({ session, token }) {
            if (session?.user) {
                (session.user as any).role = token.role
            }
            return session
        }
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET || 'farmsense-tactical-secret-2026-v1-mvp'
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
