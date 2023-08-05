const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// middleware 
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uj4yqjv.mongodb.net/?retryWrites=true&w=majority`;

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

        const userCollection = client.db("sportsDB").collection('users');
        const instructorCollection = client.db("sportsDB").collection('instructors');
        const classCollection = client.db("sportsDB").collection('classes');
        const cartCollection = client.db("sportsDB").collection('carts');



        // users related apis 
        app.get('/users', async (req, res) => {
            const result = await userCollection.find().toArray();
            res.send(result);
        })


        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            const query = { email: user.email };
            const existingUser = await userCollection.findOne(query);
            console.log('existingUser', existingUser);
            if (existingUser) {
                return res.send({ message: 'User already exist' })
            }
            const result = await userCollection.insertOne(user);
            res.send(result);
        })


        app.get('/users/:email', async (req, res) => {
            const email = req.params.email;
            console.log(user);
            const query = { email: email };
            const result = await userCollection.findOne(query);
            res.send(result)
        })




        // instructor related apis
        app.get('/instructors', async (req, res) => {
            const result = await instructorCollection.find().toArray();
            res.send(result);
        })




        // classes related apis
        app.get('/classes', async (req, res) => {
            const result = await classCollection.find().toArray();
            res.send(result);
        })


        app.post('/classes', async (req, res) => {
            const cls = req.body;
            console.log(cls);
            const result = await classCollection.insertOne(cls);
            res.send(result);
        })

        app.patch('/classes/approve/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    status: 'approved'
                }
            };
            const result = await classCollection.updateOne(filter, updateDoc);
            res.send(result);
        })
        app.patch('/classes/denied/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    status: 'denied'
                }
            };
            const result = await classCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        // cart collection apis
        app.get('/carts', async (req, res) => {
            const email = req.query.email;
            console.log(email);
            if (!email) {
                res.send([]);
            }
            const query = { email: email };
            const result = await cartCollection.find(query).toArray();
            res.send(result);
        })


        app.post('/carts', async (req, res) => {
            const classCart = req.body;
            console.log(classCart);
            const result = await cartCollection.insertOne(classCart);
            res.send(result);
        })

        app.delete('/carts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await cartCollection.deleteOne(query);
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('genius is playing');
});

app.listen(port, () => {
    console.log(`Sports genius is playing on port: ${port}`);
});




// const corsConfig = {
//     origin: '',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE']
// }
// app.use(cors(corsConfig))
// app.options("", cors(corsConfig))

// "methods": ["GET", "POST", "PATCH", "DELETE", "OPTIONS"]
