const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send("Hello This is my app mela server")
})

app.listen(port, () => {
    console.log(`App Mela Server Port:${port}`)
})