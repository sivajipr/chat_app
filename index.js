const express = require('express')
const cors = require('cors')
const multer = require('multer')
const { MongoClient } = require("mongodb");

const app = express();

app.use(cors({
    origin : ['http://localhost:4200', 'http://localhost:8000']
}))

const uri = "mongodb+srv://sivaji:rLf3eIIT6WWqF1RG@cluster0.3zfhf7x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);
var database, veg, todo;
async function run(){
    database = client.db('todoappdb');
    todo = database.collection('todoappcollection');
    veg = await todo.find({}).toArray((err, res)=>{
        if (err) console.log(err)
        console.log('Responseee', res)
    })
    console.log('runnionininnini3')
    console.log('jsbjdbshdfkdfskj', veg)

}

console.log('Listening to the port 8000')
app.listen(8000, run)
app.get('/', async (req, res)=>{
    data = await todo.find({}).toArray()
    res.send(data)
})
app.post('/add', multer().none(), async (req, res)=>{
    console.log('Goping to add the to do listtt', req)
    let count = await todo.count();
    console.log('count is', count)
    await todo.insertOne({
        id: count+1,
        name: req.body.name,
        desc: req.body.desc
    })
    res.json('Added Successfully')
})

app.delete('/delete', async (req, res)=>{
    console.log('delete initiated', req.query.id)
    await todo.deleteOne({
        id: parseInt(req.query.id)
    })
    res.json('Deleted Successfully')
})