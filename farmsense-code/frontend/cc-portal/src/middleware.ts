import { withAuth } from "next-auth/middleware"

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
        // We can add RBAC checks here later
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)

export const config = {
    matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|login).*)"]
}
