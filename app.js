const http = require('http');
let url = require('url');

//const { MongoClient, ServerApiVersion } = require('mongodb');
//const uri = "mongodb+srv://testuser:enkelt%40passord@cluster0.aar6pkz.mongodb.net/?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const hostname = '127.0.0.1';
const port = 3000;

let sendData = (res, body) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(body));
    res.end();
}

const server = http.createServer((req, res) => {
    let reqUrlString = req.url;
    let path = url.parse(reqUrlString, true).pathname;
    //console.log({reqUrlString, path});

    if (path === "/") {
        sendData (res, "Use endpoints GET /list or POST /add");
    } else if (path === "/list") {
        // Find and list all movies
        sendData (res, "Will list all movies");
    } else if (path === "/add") {
        // Check POST data and use update one with upstream set to true 
        // to insert (or update) movie
        let method = req.method;
        if (method === "POST" || method === "PUT") {
            sendData (res, "Will add movie, if data object is posted correctly");
        } else {
            sendData (res, "You need to use POST (or PUT) here..."); 
        }
    } else {
        // Catch all for un-recognized paths
        sendData (res, { 404: path});
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
  

    // let method = req.method;
    // if (method == "POST") {
    //     let body = [];
    //     req.on('error', (err) => { console.error(err); })
    //        .on('data', (chunk) => { body.push(chunk); })
    //        .on('end', () => { 
    //             body = Buffer.concat(body).toString(); 
    //             //body = Buffer.concat(body); 
    //             sendPage(res, {reqUrlString, method, body}) ;
    //         });
        
    // } else {
    //     sendPage(res, {reqUrlString, method, a:"GET"});
    // }



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

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

//run().catch(console.dir);

