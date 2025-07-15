import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'

const app = express()
const port = 3000

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", async (req, res)=>{
    try{
        const response = await axios.get("https://api.kanye.rest/")
        const result = response.data
        console.log(result)
        res.render("index.ejs", { data: result.quote})
    } catch(error){
        console.log(error.message)
        res.render("index.ejs", {error: error.message})
    }
})


app.listen(port , ()=>{
    console.log(`Server running at port ${port}`)
})