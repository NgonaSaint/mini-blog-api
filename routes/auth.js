const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const router = express.Router()

const users = []

router.post("/register", async (req, res) => {
  const { email, password } = req.body

  const existingUser = users.find((u) => u.email === email)
  if (existingUser) {
    return res.status(400).json({ message: "Email déjà utilisé" })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = {
    id: users.length + 1,
    email,
    password: hashedPassword
  }

  users.push(newUser)
  res.status(201).json({ message: "Inscription réussie" })
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  const user = users.find((u) => u.email === email)
  if (!user) {
    return res.status(400).json({ message: "Email ou mot de passe incorrect" })
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return res.status(400).json({ message: "Email ou mot de passe incorrect" })
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  )

  res.json({ token, user: { id: user.id, email: user.email } })
})

module.exports = router