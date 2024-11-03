import mongoose, { Connection } from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection : ConnectionObject = {}

async function dbconnect(){
    if(connection.isConnected){
        console.log("Already connected")
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "",{})
        
        connection.isConnected=db.connections[0].readyState

        console.log("Mongo DB connected successfully!")
    } catch (error) {
        console.log("Database connection failed",error)
        process.exit(1)//exit the process gracefully
    }
}

export default dbconnect()// export the function