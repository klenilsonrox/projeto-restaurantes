import express from "express"
import cors from "cors"
import { connDB } from "./database/connDB.js"
import routerProducts from "./controllers/ProductController.js"
import routerRestaurante from "./controllers/RestaurantesController.js"
import routerAuth from "./controllers/UserController.js"


const app = express()

app.use(express.json())
app.use(cors())

app.use("/api", routerProducts)
app.use("/api", routerRestaurante)
app.use("/api", routerAuth)

connDB()

app.listen(process.env.PORT || 3001,() =>{
    console.log("servidor rodando")
} )