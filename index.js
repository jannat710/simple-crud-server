const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://jannatul0040:6DsqiN9WxP3H5iiZ@cluster0.pvt8fts.mongodb.net/?retryWrites=true&w=majority";

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

    //55-3(Mongo te data pathanor jonne)
    const userCollection = client.db('usersDB').collection('users');

    //54-4(Read Data Find find multiple user data and display on UI) http://localhost:5000/users user dekhte pabo 
    app.get('/users', async( req, res) => {
        const cursor = userCollection.find()
        const result = await cursor.toArray();
        res.send(result);
    })



    app.post('/users', async(req, res) => {
        const user = req.body;
        console.log('new user', user);
        //53.3(Mongo te data pathanor jonne)
        const result = await userCollection.insertOne(user);
        res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) =>{
    res.send('SIMPLE CRUD IS RUNNING')
})

app.listen(port, () =>{
    console.log(`SIMPLE CRUD is running on port, ${port}`)
})


// try{

// }
// catch{

// }
// finally{
    
// }