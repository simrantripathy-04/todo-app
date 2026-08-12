import { useEffect, useState } from 'react';
import '../style/addtask.css';
import { useNavigate, useParams } from 'react-router-dom';
 
 export function UpdateTask(){
    const[taskdata,setTaskData]=useState({});
    const navigate = useNavigate();
    const {id}=useParams()

    useEffect(()=>{
        getTask(id)
    },[])

    const getTask=async(id)=>{
        let task = await fetch("http://localhost:3200/tasks/"+id,{
            credentials:'include'
        });
        task = await task.json();
        if (task.result) {
           setTaskData(task.result) 
        }
    }

    const updateTask=async(e)=>{
         e.preventDefault();
        console.log("function called",taskdata);
        let task = await fetch("http://localhost:3200/update-task",{
            credentials:'include',
            method:"put",
            body:JSON.stringify(taskdata),
            headers:{
                "Content-Type":"application/json"
            }
        });
        task= await task.json()
        if(task){
            navigate("/")
        }
    }
    
    return(
        <div className="container">
            <h1>Update Task</h1>
            <form>
                <label htmlFor="">Title</label>
                <input  value={taskdata?.title || ""}   onChange={(event)=>setTaskData({...taskdata,title:event.target.value})} type="text" name="title" placeholder="Enter task title"></input>
                <label htmlFor="">Description</label>
                <textarea  value={taskdata?.description || ""}  onChange={(event)=>setTaskData({...taskdata,description:event.target.value})}  rows={4} type="text" name="description" placeholder="Enter task description"></textarea>
                <button onClick={updateTask} className="submit">Update Task</button>
            </form>
        </div>
    )
}