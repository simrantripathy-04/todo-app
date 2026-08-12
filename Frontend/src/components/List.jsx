import { Fragment, useEffect, useState } from "react"
import "../style/list.css";
import { Link } from "react-router-dom";
 export function List(){
    const[taskdata,setTaskdata]=useState();
    const [selectedTask,setSelectedTask]=useState([]);
    useEffect(()=>{
        getListData()
    },[])
    const getListData=async()=>{
        let list= await fetch('http://localhost:3200/tasks',{
            credentials:'include'
        });
        list = await list.json()
        console.log(list);
        if(list.success){
            setTaskdata(list.result)
        }else{
            alert('Try after Sometimes')
        }
        
    }
    const deleteTask=async(id)=>{
        let item= await fetch('http://localhost:3200/delete/'+id,{method:"delete",credentials:'include'});
        item = await item.json()
        console.log(item);
        if(item.success){
           getListData()
            
        }else{
            alert('Try after Sometimes')
        }
    }

    const selectAll=(e)=>{
        
        if(e.target.checked){
            let items = taskdata.map((item)=>item._id)
            setSelectedTask(items)
        }else{
            setSelectedTask([])
        }
        
    }

    const selectSingleItem=(id)=>{
        console.log(id);
        if(selectedTask.includes(id)){
            let items = selectedTask.filter((item)=>item!=id);
            setSelectedTask(items)
            
        }else{
            setSelectedTask([id,...selectedTask])
        }
        
    }

    const deleteMultiple=async()=>{
        console.log(selectedTask);
         
        let item= await fetch('http://localhost:3200/delete-multiple',
            {credentials:'include',
                method:"delete",
                body:JSON.stringify(selectedTask),
                headers:{
                     "Content-Type":"application/json"
                }
            });
        item = await item.json()
        console.log(item);
        if(item.success){
           getListData()
            
        }else{
            alert("Try after Sometimes")
        }
        
    }
    
    return (
        <div className="list-container"  >
            <h1>To Do List</h1>
            <button onClick={deleteMultiple}   className="delete-item delete-multiple" >Delete</button>
            <ul className="task-list">
                <li className="list-header"><input onChange={selectAll} type="checkbox"></input></li>
                <li className="list-header">S.No</li>
                <li className="list-header">Title</li>
                <li className="list-header">Description</li>
                <li className="list-header">Action</li>

                {
                 taskdata &&   taskdata.map((item,index)=>(
                    <Fragment key={item._id}>
                        <li className="list-item"><input onChange={()=>selectSingleItem(item._id)} checked={selectedTask.includes(item._id)} type="checkbox"></input></li>
                        <li className="list-item">{index+1}</li>
                        <li className="list-item">{item.title}</li>
                        <li className="list-item">{item.description}</li>
                        <li className="list-item"><button onClick={()=>deleteTask(item._id)} className="delete-item" >Delete</button>
                        <Link to={"/update/"+item._id} className="update-item" >Update</Link>
                        </li>


                    </Fragment>
                 ))
                }
            </ul>
           
        </div>
    )
}