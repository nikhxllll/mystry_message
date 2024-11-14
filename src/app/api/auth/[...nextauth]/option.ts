import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import bcryptjs from "bcryptjs"
import { dbconnect } from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { error } from "console";

export const authOptions : NextAuthOptions = {providers: [
    CredentialsProvider({
        id : "credentials",
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text"},
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials:any): Promise<any>{
            await dbconnect()
            try {
                const user = await UserModel.findOne({
                    $or:[
                        {email :credentials.identifier},
                        {username : credentials.identifier}
                    ]
                })
                if(!user){
                    throw new Error("No user find with this email")
                }
                if(!user.isVerified){
                    throw new Error("Please verify your account before login")
                }
                const isPasswordCorrect:boolean = await bcryptjs.compare(credentials.password,user.password)//can cause error coz added typescript
                if(isPasswordCorrect){
                    return user
                }
                else{
                    throw new Error("Incorrect Password")
                }
            } catch (err:any) {
                throw new Error(err)
            }
        }
]
}