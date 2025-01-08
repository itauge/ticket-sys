import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            username: string;
            role: string;
        } & DefaultSession["user"];
    }
    
    interface User {
        id: number;
        username: string;
        role: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: string;
    }
}

