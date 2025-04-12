const express = require('express');
const authMiddleware = require('../Middlewars');
const expense = require('../models/expense')
const users = require('../models/users');

const router = express.Router();

// endpoint to Add new expense
router.post('/addexpense',authMiddleware,async(req, res)=>{
    try {
        const newExpense = new expense(req.body)
        await newExpense.save()
        res.status(200).send('creat successfuly')
    } catch (err) {
        res.status(500).json({error : err.message})
    }
    

} )
// this endpoint retun all the expense in DB
router.get('/getexpense',authMiddleware,async(req, res)=>{
    try {
        const findallExpense = await expense.find();
        res.status(200).send(findallExpense);
    } catch (err) {
        res.status(500).json({error : err.message})  
    }
}  )
// the delete the expense from the DB, must put the right name of the expense in the body request 
router.delete('/deleteEx', authMiddleware,async(req, res)=>{
    try {
        const {name} = req.body;
        const Expen = await expense.findOneAndDelete({name: name })
        if(!Expen){ res.status(404).send(`Not found any expense called ${name}  `) }
        res.status(200).send(`delete the ${name} expense  successfuly`);
    } catch (err) {
        res.status(500).json({error : err.message}) 
    }
} )
// endpoint to filter the expense by the time( last week, month.....)
router.get('/filterBytime',authMiddleware ,async(req,res)=>{
    try {
        const { range } = req.body;     
        let startDate;
        const now = new Date();
        startDate = new Date(now);
        switch(range){
            case  'week': 
                startDate.setDate(now.getDate() - 7);
                break;
            case 'month':
                startDate.setMonth( now.getMonth()-1)
                break;
            case '3 month':
                startDate.setMonth(now.getMonth() -3 )
                break;
            case 'year':
                startDate.setFullYear( now.getFullYear()-1)
                break;
            case 'hour':
                startDate.setHours( now.getHours()-1)
                break;    
            case '':
                res.status(400).json({ message: "Invalid range value" });
                break;
        }
    
        const results = await expense.find({
          createdAt: {
            $gte: startDate,
            $lte: now
          }
        });
    
        res.json(results);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
      }
    
})
module.exports= router;