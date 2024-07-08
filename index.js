const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model');
const app = express()
   
    
   //middleware
app.use(express.json());
app.use (express.urlencoded({extended: false}));

   
  //routes

  app.use("/api/products",productRoutes);


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




//update product
   
  app.put('/api/product/:id', async (req, res) => {
   
    try{
      const {id} =req.params;
      const product = await Product.findByIdAndUpdate(id, req.body);

      if(!product){
        return res.status(404).json({message: 'Product not found'});
      }
      
      const updatedProduct = await Product.findById(id);
      res.status(200).json(updatedProduct);

    }catch(error){
     res.status(500).json({error: error.message});
    }
    
    
  });


  //delete product
   
  app.delete('/api/product/:id', async (req, res) => {
   
    try{
      const {id} =req.params;
      const product =await Product.findByIdAndUpdate(id);

      if(!product){
        return res.status(404).json({message: 'Product not found'});
      }
      
      
      res.status(200).json({message: 'Product deleted successfully'});

    }catch(error){
     res.status(500).json({message: error.message});
    }
    
    
  });




mongoose.connect("mongodb+srv://nethmina1028:Q5VEv6bpArzR7UEW@backenddb.6dfxsrk.mongodb.net/NodeAPI?retryWrites=true&w=majority&appName=BackendDB")
.then(()=>{
  console.log('Connected to the database');
})
.catch(()=>{
    console.log('Connection failed');
});