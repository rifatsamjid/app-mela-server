const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 4000
require("dotenv").config();

app.use(cors())
app.use(express.json())



const user = process.env.DB_USER;
const pass = process.env.DB_PASS


const uri = `mongodb+srv://${user}:${pass}@cluster1.jkfjkqt.mongodb.net/?appName=Cluster1`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


let db;


async function run() {
    try {

        await client.connect();
        const db = client.db("appMelaDB")
        const appCollection = db.collection("apps");

        app.get('/', (req, res) => {
            res.send("Hello This is my app mela server")
        })

        // api sent
        app.post('/apps', async (req, res) => {
            const data = req.body
            const result = await appCollection.insertOne(data)
            res.send(result)
        })

        // api get
        app.get('/apps', async (req, res) => {
            const result = await appCollection.find().toArray();
            res.send(result)
        })

        // top apps
        app.get('/top-rating', async (req, res) => {
            try {
                const result = await appCollection
                    .find({})
                    .sort({ ratingAvg: -1 })
                    .limit(6)
                    .toArray();
                res.json(result);
            } catch (error) {
                console.error("Error fetching top apps:", error);
                res.status(500).json({ error: "Failed to fetch top apps" });
            }
        });

        // app id
        app.get('/apps/:id',async(req,res)=>{
            const id = req.params.id;
            const query={_id: new ObjectId(id)}
            const result = await appCollection.findOne(query)
            res.send(result)
        })


       

    }
    finally {

    }
}
run().catch(console.dir)

// app.get('/', (req, res) => {
//     res.send("Hello This is my app mela server")
// })

// app.listen(port, () => {
//     console.log(`App Mela Server Port:${port}`)
// })