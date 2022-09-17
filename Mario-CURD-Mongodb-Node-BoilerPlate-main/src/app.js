const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const MarioModel = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here

app.get('/mario', async (req, res) =>{
    try{
        const data = await MarioModel.find();
        res.json(data)
    }catch(err){
        message: err.message;
    }
})

app.get('/mario/:id', async (req, res) =>{
    try{
        const requiredData = await MarioModel.find({_id:req.params.id});
        // console.log(requiredData);
        if(requiredData.length == 0){
            res.json({
                statuscode:404 , 
                message:"No Data found with given ID."})
        }
        else{
            res.json({
                status:"ID found" ,
                result: requiredData
            })
        }
    }catch(err){
        res.json({
            status: "falied" ,
            message : err.message
        })
    }
})

app.post('/mario', async (req, res) =>{
    const data = req.body;
    try{
        await MarioModel.create(data)
        res.json({
            statuscode: 201 ,
            message: "Mario Character has been Successfully saved."
        })
    }catch(err){
        return res.json({
            statuscode: 400 ,   
            message: err.message
        })
    }   
})

app.patch('/mario/:id', async (req, res) =>{   
    try{

        const requiredData = await MarioModel.findById(req.params.id)
        if(requiredData == null){
            res.json({
                statuscode: 400 ,
                message: "No data found with this ID."
            })
        }else{
            await MarioModel.findByIdAndUpdate(req.params.id , req.body);
            const updatedData = await MarioModel.findById(req.params.id);
            res.json({
                status: "Success" ,
                message: "Mario Character has been updated successfully.",
                result :  updatedData ,
                // oldResponse : requiredData
            })
        }
        // console.log(requiredData);
    }catch(err){
        return res.json({
            statuscode: 400 ,
            message: err.message
        })
    }   
})

app.delete('/mario/:id', async (req, res) =>{   
    try{
        await MarioModel.findByIdAndDelete(req.params.id , req.body)
        res.json({
            statuscode: 200 ,
            message: "Mario Character has been Deleted successfully."
        })
    }catch(err){
        return res.json({
            statuscode: 400 ,
            message: err.message
        })
    }   
})


module.exports = app;