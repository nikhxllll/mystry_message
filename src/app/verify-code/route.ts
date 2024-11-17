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
            await user.save()
            return Response.json({
                success : true,
                message : "Account verified successfully"
            },{status : 200}) 

        } else if(!isCodeNotExpired){
            return Response.json({
                success : false,
                message : "Verification code has expired please sign up again to get a new code"
            },{status : 400}) 

        } else{
            return Response.json({
                success : false,
                message : "verification code is not valid"
            },{status : 400}) 
        }

    } catch (error) {
        console.error("Error verifying code", error)
        return Response.json({
            success : false,
            message : "Error verifying code"

        },{status : 400})   
    }
}