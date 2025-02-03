/* eslint-disable no-undef */
import express from "express";
import 'dotenv/config';  // Load environment variables
import cors from "cors"
import { MongoClient } from "mongodb";

const app = express();
app.use(express.json()); // Built-in JSON parser
app.use(cors())

const PORT = process.env.PORT || 5000; 
const dbName = 'passop';
const client = new MongoClient(process.env.MONGO_URI);
client.connect()

app.get("/",async(req, res) => {
    const db =client.db(dbName);
    const Collection =db.collection("passwords");
    const findresult =await Collection.find({}).toArray()
    res.json(findresult)
});

app.post("/",async (req, res) => {
    const password = req.body;
    const db =client.db(dbName);
    const Collection =db.collection("passwords");
    const findresult =await Collection.insertOne(password)
    res.send({success:true,result:findresult})
});

app.delete("/",async (req, res) => {
    const password = req.body;
    const db =client.db(dbName);
    const Collection =db.collection("passwords");
    const findresult =await Collection.deleteOne(password)
    res.send({success:true,result:findresult})
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
