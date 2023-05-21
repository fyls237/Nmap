import express from "express"
import UserModel from "../db/models/UserModel.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'

const router = express.Router()

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body


    const existingUser = await UserModel.findOne({ email })

    if (existingUser) {
      return res.status(409).json({ error: 'Cet utilisateur existe déjà' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new UserModel({
      name,
      email,
      passwordHash, 
    })

    const savedUser = await newUser.save()

    res.status(201).json(savedUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" })
  }
})

router.post('/signin', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await UserModel.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: 'Adresse e-mail incorrecte' })
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash)

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect' })
    }

    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' })

    res.status(200).json({ message: 'Connexion réussie', token })
  } catch (error) {
    console.error('Erreur lors de la connexion :', error)
    res.status(500).json({ message: 'Erreur lors de la connexion' })
  }
})





export default router
