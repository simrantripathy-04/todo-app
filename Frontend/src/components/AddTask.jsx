import { useState } from 'react';
import '../style/addtask.css';
import { useNavigate } from 'react-router-dom';
 
 export function AddTask(){
    const[taskdata,setTaskData]=useState({});
    const navigate = useNavigate();
    const handleaddTask=async (e)=>{
        e.preventDefault()
        console.log(taskdata);
        let result = await fetch('http://localhost:3200/add-task',{
        method:"post",
       body:JSON.stringify(taskdata),
       credentials:'include',
       headers:{
        'Content-Type':'application/json'
       }
     })
     result=await result.json()
     if(result.success){
        navigate("/")
        console.log("new task added");
        
     }else{
        alert('try after sometimes')
     }
         
    }
    return(
        <div className="container">
            <h1>Add New Task</h1>
            <form>
                <label htmlFor="">Title</label>
                <input onChange={(event)=>setTaskData({...taskdata,title:event.target.value})} type="text" name="title" placeholder="Enter task title"></input>
                <label htmlFor="">Description</label>
                <textarea onChange={(event)=>setTaskData({...taskdata,description:event.target.value})}  rows={4} type="text" name="description" placeholder="Enter task description"></textarea>
                <button onClick={handleaddTask} className="submit">Add New Task</button>
            </form>
        </div>
    )
}