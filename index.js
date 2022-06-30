const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json())


const uri = "mongodb+srv://Todo_admin:uVw2IQSdc31FQNhq@cluster0.1xmqi.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const todosCollection = client.db('Todo_app').collection('todos');

    app.get('/items', async (req, res) => {
        const query = {};
        const cursor = todosCollection.find(query);
        const products = (await cursor.toArray());
        res.send(products)
      })
    
  }
  finally {

  }

}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Todo app!')
})

app.listen(port, () => {
  console.log(`hello i am from ${port}`)
})

