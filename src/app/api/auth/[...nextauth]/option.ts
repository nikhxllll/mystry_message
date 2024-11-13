import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import bcryptjs from "bcryptjs"
import { dbconnect } from "@/lib/dbConnect";
import UserModel from "@/models/User";

export const authOptions : NextAuthOptions = {providers: [
    CredentialsProvider({
        id : "credentials",
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text"},
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials)
]
}