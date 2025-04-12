
const express = require('express')
const mongoose = require( 'mongoose')
const routers =require('./routers/routers')
const expenseRouters = require('./routers/expenseRouters')

const app  = express();

// Middlware 
app.use( express.json())

const port = 9000
// Connection with DB "Loca DB"
mongoose.connect('mongodb://admin:admin@localhost:27017/Expense?authSource=admin')

const db = mongoose.connection;
db.on('error' , ()=>{
    console.log( 'Connection error' )
})

db.once('open', ()=>{
    console.log('Connected to DB! ' )
})

app.use(routers);
app.use(expenseRouters);

app.listen( port, ()=>{
    console.log(` I listiong on Port ${port} `);
} )