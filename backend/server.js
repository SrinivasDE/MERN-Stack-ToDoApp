const express = require("express");
const dotenv = require('dotenv');
const port = process.env.PORT || 5000
const mongoose = require("mongoose");
const TaskSchema = require("./module");
const cors = require('cors');
const path = require("path");

const app = express();
dotenv.config();

mongoose
  .connect(
    process.env.MONGO_URL,
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

//   ---------------deployment--------------

__dirname = path.resolve();
if(process.env.NODE_ENV ===  'production'){
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    app.get('*', (req, res) => {
        res.send(path.resolve(__dirname, "frontend", "build", "index.html"));
    })
}else{
     app.get('/', (req, res) => {
        res.send("API is running..");
     });
}




//   ---------------deployment--------------




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
