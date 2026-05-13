const express = require("express")
const jwt = require("jsonwebtoken")

const router = express.Router()

const articles = []

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: "Token manquant" })
  }

  const token = authHeader.split(" ")[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: "Token invalide" })
  }
}

router.get("/", (req, res) => {
  res.json(articles)
})

router.get("/my", authenticate, (req, res) => {
  const myArticles = articles.filter((a) => a.authorId === req.user.id)
  res.json(myArticles)
})

router.get("/:id", (req, res) => {
  const article = articles.find((a) => a.id === parseInt(req.params.id))
  if (!article) {
    return res.status(404).json({ message: "Article introuvable" })
  }
  res.json(article)
})

router.post("/", authenticate, (req, res) => {
  const { title, content } = req.body
  const newArticle = {
    id: articles.length + 1,
    title,
    content,
    author: req.user.email,
    authorId: req.user.id,
    createdAt: new Date()
  }
  articles.push(newArticle)
  res.status(201).json(newArticle)
})

router.put("/:id", authenticate, (req, res) => {
  const article = articles.find((a) => a.id === parseInt(req.params.id))
  if (!article) {
    return res.status(404).json({ message: "Article introuvable" })
  }
  if (article.authorId !== req.user.id) {
    return res.status(403).json({ message: "Non autorisé" })
  }
  const { title, content } = req.body
  article.title = title
  article.content = content
  res.json(article)
})

router.delete("/:id", authenticate, (req, res) => {
  const index = articles.findIndex((a) => a.id === parseInt(req.params.id))
  if (index === -1) {
    return res.status(404).json({ message: "Article introuvable" })
  }
  if (articles[index].authorId !== req.user.id) {
    return res.status(403).json({ message: "Non autorisé" })
  }
  articles.splice(index, 1)
  res.json({ message: "Article supprimé" })
})

module.exports = router