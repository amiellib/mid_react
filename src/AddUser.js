import './style.css';
import { useState } from 'react';


const AddUser = ({callbackAddUser,callbackCancelAddUser}) => {
    const [user,setUser] = useState({name: "", email :""});

    
    function cancelAddUser() {
        document.getElementById('Name').value = ''
        document.getElementById('Email').value = ''
        setUser({name: "", email :""})
        callbackCancelAddUser()

    }


    function addUser() {
        callbackAddUser(user)
        cancelAddUser()

    }


    return (
        <div key="addUser" className='divAdd'><br/>
            Name: <input type="text" id="Name" onChange={ e => setUser({ ...user, name : e.target.value}) }/>  <br/><br />
            Email: <input type="text" id="Email" onChange={ e => setUser({ ...user, email : e.target.value}) }/>  <br/><br />
            <button className= "btn" onClick={() => cancelAddUser()}>Cancel</button>
            <button className= "btn"  onClick={() => addUser()}>Add</button><br />
        </div>
        )}
  export default AddUser