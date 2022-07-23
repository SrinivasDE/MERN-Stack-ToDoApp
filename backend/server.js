const express = require("express");
// const dotenv = require('dotenv').config()
// const port = process.env.PORT || 5000
const mongoose = require("mongoose");
const TaskSchema = require("./module");
const cors = require('cors')

const app = express();

mongoose
  .connect(
    "mongodb+srv://srinivas:srinivas726844@cluster0.vvda6ij.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
  )
  .then(() => console.log("DB Connected"));

  app.use(express.json())
  app.use(cors({
    origin:'*'
  }))

  app.post('/addtask',async(req,res)=>{
    const {todo} = req.body;
    try{
        const newData = new TaskSchema({
            todo : todo
        });
        await newData.save();
        return res.json(await TaskSchema.find())
    }
    catch(err){
        console.log(err)
    }
})

app.get('/gettask', async(req, res) => {
    try {
        return res.json(await TaskSchema.find())
    } catch (error) {
        console.log(error)
    }
})

app.delete('/delete/:id',async(req,res) => {
    try{
        await TaskSchema.findByIdAndDelete(req.params.id);
        return res.json(await TaskSchema.find())
    }
    catch(err){
        console.log(err)
    }
})


app.listen(5050, () => console.log(" Server running..."));
