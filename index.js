import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'
import fs from 'fs'
import path from 'path'

const app = express()
const port = 3000

const imageDir = path.join(process.cwd(), 'public', 'images')
const imageFiles = fs.readdirSync(imageDir).filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file))

function getRandomImage() {
  if (imageFiles.length === 0) {
    return '/images/first.jpg'
  }
  const randomFile = imageFiles[Math.floor(Math.random() * imageFiles.length)]
  return `/images/${randomFile}`
}

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    const image = getRandomImage()

    try {
        const response = await axios.get('https://api.kanye.rest/')
        const result = response.data
        console.log("Quote fetched!")
        res.render('index.ejs', { data: result.quote, image })
    } catch (error) {
        console.log(error.message)
        res.render('index.ejs', { error: error.message, image })
    }
})

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})