import express from "express";
import { connection, collectionName} from "./dbconfig.js";
import cors from 'cors';
import {  ObjectId } from "mongodb";
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(cookieParser());

app.post("/Signup",async(req,res)=>{
const userData = req.body;
if(userData.email && userData.password){
const db = await connection();
const collection= db.collection('users');
const result = await collection.insertOne(userData);

if(result){
    jwt.sign(userData,'Google',{expiresIn:'5d'},(error,token)=>{
    res.send({
        success:true,
        msg:'signup done',
        token
    })
    
})
}
}else{
    res.send({
        success:false,
        msg:'signup not  done',
    })
}
})

app.post("/Login",async(req,res)=>{
const userData = req.body;
if(userData.email && userData.password){
const db = await connection();
const collection= db.collection('users');
const result = await collection.findOne({email:userData.email,password:userData.password});

if(result){
    jwt.sign(userData,'Google',{expiresIn:'5d'},(error,token)=>{
    res.send({
        success:true,
        msg:'login done',
        token
    })
    
})
}else{
    res.send({
        success:false,
        msg:'user not found',
    })
}
}else{
    res.send({
        success:false,
        msg:'login not  done',
    })
}
})

app.post("/add-task",verifyJWTToken,async(req,res)=>{
    const db = await connection();
    const collection= db.collection(collectionName);
    const result=await collection.insertOne(req.body);
    console.log(req.body);
    
    if(result){
        res.send({message:"New task added",
            success:true,
            result
        })
    }else{ 
        res.send({message:"Task not Added",
            success:false})}
  
})

app.get("/tasks",verifyJWTToken,async(req,res)=>{
    const db = await connection();
    console.log("cookies test",req.cookies.token);
    
    const collection= db.collection(collectionName);
    const result=await collection.find().toArray();
    
     if(result){
        res.send({message:"task list fetched",
            success:true,
            result
      
        })
    }else{ 
        res.send({message:"error try after sometimes",
            success:false})}
  
})


app.get("/tasks/:id",verifyJWTToken,async(req,res)=>{
    const db = await connection();
    const id = req.params.id
    const collection= db.collection(collectionName);
    const result=await collection.findOne({_id:new ObjectId(id)});
    
     if(result){
        res.send({message:"task list fetched",
            success:true,
            result
      
        })
    }else{ 
        res.send({message:"error try after sometimes",
            success:false})}
  
})

app.put("/update-task",verifyJWTToken,async(req,res)=>{
    const db = await connection();
    const collection= db.collection(collectionName);
    const {_id,...fields}=req.body;
    const update = {$set:fields}
    
    const result=await collection.updateOne({_id:new ObjectId(_id)},update)
    
     if(result){
        res.send({message:"task data updated",
            success:true,
            result
      
        })
    }else{ 
        res.send({message:"error try after sometimes",
            success:false})}
  
})

app.delete("/delete/:id",verifyJWTToken,async(req,res)=>{
    const db = await connection();
    const id = req.params.id
    const collection= db.collection(collectionName);
    const result=await collection.deleteOne({_id:new ObjectId(id)});
    
     if(result){
        res.send({message:"task deleted",
            success:true,
            result
        })
    }else{ 
        res.send({message:"error try after sometimes",
            success:false})}
  
})

app.delete("/delete-multiple",verifyJWTToken,async(req,res)=>{
    const db = await connection();
    const ids = req.body
    const deleteTaskIds = ids.map((item)=>new ObjectId(item))
    console.log(ids);
    
    const collection= db.collection(collectionName);
    const result=await collection.deleteMany({_id:{$in:deleteTaskIds}});
    
     if(result){
        res.send({message:"task deleted",
            success:result
            
        })
    }else{ 
        res.send({message:"error try after sometimes",
            success:false})}
  
})


function verifyJWTToken(req,res,next){
  //  console.log("verifyJWTToken",req.cookies.token);
     const token = req.cookies.token;
     jwt.verify(token,'Google',(error,decoded)=>{
        if(error){
            return res.send({
                message:'invalid token',
                success:false
            })
        }
        next()
        
     })
   
}


app.listen(3200)