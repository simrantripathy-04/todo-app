import './style/App.css'
import {NavBar} from './components/NavBar'
import { Routes,Route } from 'react-router-dom'
import { AddTask } from './components/AddTask'
import { List } from "./components/List";
import { UpdateTask } from './components/UpdateTask';
import { SignUp } from './components/SignUp';
import { Login } from './components/Login';
import { Protected } from './components/Protected';
function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Protected><List/></Protected>} ></Route>
        <Route path="/add" element={<Protected><AddTask/></Protected>} ></Route>
        <Route path="/Signup" element={<SignUp/>} ></Route>
        <Route path="/login" element={<Login/>} ></Route>
        <Route path="/update/:id" element={<UpdateTask/>} ></Route>
      </Routes>
 
    </>
  )
}

export default App
