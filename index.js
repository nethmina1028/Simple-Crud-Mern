const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model');
const app = express()

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');

    });

app.get('/', (req, res) => {
    res.send('hello from node api');
});

app.get('/api/products', async (req, res) => {
    try{
        const product =  await Product.find({});
        res.status(200).json(product);
 
    }catch(error){
     res.status(500).json({error: error.message});
    }
 });

 
 app.get('/api/product/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const product =  await Product.findById(id);
        res.status(200).json(product);
    }catch(error){
     res.status(500).json({error: error.message});
    }
 });

app.post('/api/products', async (req, res) => {
   try{
       const product =  await Product.create(req.body);
       res.status(200).json(product);

   }catch(error){
    res.status(500).json({error: error.message});
   }
});

mongoose.connect("mongodb+srv://nethmina1028:Q5VEv6bpArzR7UEW@backenddb.6dfxsrk.mongodb.net/NodeAPI?retryWrites=true&w=majority&appName=BackendDB")
.then(()=>{
  console.log('Connected to the database');
})
.catch(()=>{
    console.log('Connection failed');
});