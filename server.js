require("dotenv").config() // This line loads the environment variables from the .env file

const express = require("express")
const axios = require("axios")
const cors = require("cors")

const app = express()
const PORT = 3000

// Accessing environment variables
const TMDB_BASE_URL = process.env.TMDB_BASE_URL
const TMDB_API_KEY = process.env.TMDB_API_KEY
const VIDSRC_BASE_URL = process.env.VIDSRC_BASE_URL

app.use(cors())

// Route to fetch movie data and corresponding videos
app.get("/movies/:id", async (req, res) => {
  try {
    const tmdbResponse = await axios.get(
      `${TMDB_BASE_URL}/movie/${req.params.id}?api_key=${TMDB_API_KEY}`,
    )
    const movie = tmdbResponse.data

    const vidsrcResponse = await axios.get(`${VIDSRC_BASE_URL}${req.params.id}`)
    const videos = vidsrcResponse.data.results

    res.json({ movie, videos })
  } catch (error) {
    console.error("Error fetching data:", error)
    res.status(500).json({ error: "Failed to fetch data" })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
