import express from "express"
import mongoose from "mongoose"
import cors from 'cors'
import dotenv from 'dotenv'
import route from "./routes/routeReq.js"
import router from "./routes/routeUser.js"


dotenv.config()

const app = express()
const PORT = process.env.PORT


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connexion à la base de données reussie")
    app.listen(PORT, () => {
      console.log(`Écoute sur le port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error("Erreur de connexion à la base de données :", error)
  })

const corsOptions = {
  origin: process.env.CORS_OPTIONS
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(route)
app.use(router)

export default app
