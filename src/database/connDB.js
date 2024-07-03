import mongoose from "mongoose"

const mongo_URL =`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@lanchonetenova.wohav3t.mongodb.net/`



export async function connDB(){
    try {
        await mongoose.connect(mongo_URL)
        console.log(`servidor mongoose iniciado com sucesso`)
    } catch (error) {
        console.log(error)
    }
}