import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import { use } from "react"


export async function POST(request:Request) {
    await dbConnect()
    
    
    try {
        const {username,code} = request.json()
        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({
            username : decodedUsername
        })

        if(!user){
            console.error("Error verifying code", error)
            return Response.json({
                success : false,
                message : "Error verifying code"
    
            },{status : 400}) 
        }

        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true
            
        }
    } catch (error) {
        console.error("Error verifying code", error)
        return Response.json({
            success : false,
            message : "Error verifying code"

        },{status : 400})   
    }
}