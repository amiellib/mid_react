import './style.css';
import { useState } from 'react';
const AddTodo = ({callbackAddTodo, callbackCancelAddTodo}) => {
  

    const [title,setTitle] = useState("");


    function cancelAddTodo() {
        document.getElementById('Title').value = ''
        setTitle("")
        callbackCancelAddTodo()
    }


    function addTodo() {
        callbackAddTodo(title)
        cancelAddTodo()   
    }


    return (
        <div key="addTodo" className='divAdd'>
            Title: <input type="text" id="Title" onChange={ e => setTitle(e.target.value) }/>  <br/><br />
            <button className= "btn" onClick={() => cancelAddTodo()}>Cancel</button>
            <button className= "btn"  onClick={() => addTodo()}>Add</button><br />
        </div>
        )}
  export default AddTodo