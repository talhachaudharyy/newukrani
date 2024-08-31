var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require('mongoose')


const app = express()
// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://talha:talha@cluster0.1lmmm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.post("/postdata", (req, res) => {
    var name = req.body.name;
    var age = req.body.age;
    var email = req.body.email;

    var data = {
        "name": name,
        "age": age,
        "email" : email
    }

    db.collection("users").insertOne(data, (err, collection)=> {
        if(err){
            throw err;
        }
        console.log("Record saved successfully")
    })

    return res.direct("success.html")
})

app.get("/", (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
    })

    return res.redirect('index.html')
}).listen(3000)

console.log("Listen on post 3000")
