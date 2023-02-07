const { MongoClient, ServerApiVersion } = require('mongodb');
const http = require('http');

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

        // Add a test-movie, if it doesn't exist using updateOne
        const filter = { title: "True Romance" };
        const movie = {
            $set: {
                title: "True Romance", 
                year: 1993, 
                imdb_url: "https://www.imdb.com/title/tt0108399/",
                rt_url: "https://www.rottentomatoes.com/m/true_romance",
                rating: 6    
            }
        };
        const options = { upsert: true };
        const result = await col.updateOne(filter, movie, options);
        console.log(`${result.matchedCount} document(s) matched the filter`);

        const query = {};
        const opt = {};
        const cursor = col.find(query, opt);
        
        let results = await cursor.toArray();
        console.log(results);
        if (results.length > 0) {
            makeJSON(results);    
        } else {
            makeJSON({});  
        }
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);

function makeJSON (content) {
    const hostname = '127.0.0.1';
    const port = 3000;
    
    const server = http.createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(content));
      res.end();
    });
    
    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
}

