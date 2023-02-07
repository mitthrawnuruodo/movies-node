const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://testuser:enkelt%40passord@cluster0.aar6pkz.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        // Do stuff here
        // Connect to this database, make it if it doesn't exist
        const db = client.db("node_testing");
        // Use this collection, make it if it doesn't exist
        const col = db.collection("movies");

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);
