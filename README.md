# Movies NodeJS + MongoDB

Example-project for making a very basic NodeJS + MongoDB app.

1. Initialize Node: `npm init -y`
1. Install mongodb: `npm i mongodb --save-dev`
1. Add start-script to package.json: `"start": "node app.js"`
1. Sign up for [MongoDB Atlas](https://www.mongodb.com/atlas) with GitHub (or your preferred method), and make a cluster and (at least one DB user)
1. Add starter code to app.js
    * Replace `<username>`, `<password>`, and `<cluster.hash>` with your own, you'll find the `uri` (sans Password) on Atlas under `Database Deployments` > `<Your Cluster>` > `Connect` > `Connect your application`:
    ```js
    const { MongoClient, ServerApiVersion } = require('mongodb');

    const uri = "mongodb+srv://<username>:<password>@<cluster.hash>.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    async function run() {
        try {
            await client.connect();
            console.log("Connected correctly to server");
            // Do stuff here
            
        } catch (err) {
            console.log(err.stack);
        }
        finally {
            await client.close();
        }
    }

    run().catch(console.dir);
    ```
1. Run the code, using `node app.js` or `npm start`
    * Make sure you get `Connected correctly to server` on the console
1. Add database details: 
    ```js
            // Do stuff here
            // Connect to this database, make it if it doesn't exist
            const db = client.db("node_testing");
            // Use this collection, make it if it doesn't exist
            const col = db.collection("movies");
    ```
