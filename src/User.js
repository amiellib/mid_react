import { useState, useEffect } from 'react';
import React from 'react'
import './style.css';


const User = ({props, callbackUpdate, callbackDelete, callbackIdClicked, pressedId, propsTodos}) => {
  const [clicked, setClicked] = useState(false);                                 
  const [otherData, setOtherData]= useState(false);
  const [colorFlag, setColorFlag] =useState(true)
  const [user, setUser] = useState({id:props.id, name:props.name, email:props.email, address:
  {city:props.address.city, street:props.address.street, zipcode:props.address.zipcode}});  
                             

  useEffect(()  => {
    setClicked(pressedId === user.id ) 
  }, [pressedId, user.id])


  useEffect(() => {
    setColorFlag(true)
    function allDone(){
      (propsTodos.filter(obj=>obj.userId===props.id).map((todo)=>{
          if(todo.completed !== true){
            setColorFlag(false)
      }}))}
      allDone()
 }, [propsTodos,props.id])


  const deleteUser= () => {
    callbackDelete(user.id);
  }


  const updateUser = () => {
    callbackUpdate(user);
  }


  const clickedID = () => {
    callbackIdClicked(user.id);
  }


  return (
    <div style={{border: colorFlag? "solid 4px green": "solid 4px red" ,background: clicked ? "orange" : "white", margin:20}} >
        <div style={{ margin:20}}>
          <label onClick={() => clickedID() }>ID:</label> {user.id}<br/><br/>
          Name: <input type="text" value={user.name} onChange={ e => setUser({ ...user, name : e.target.value}) }/>  <br/>
          Email: <input type="text" value={user.email} onChange={ e => setUser({ ...user, email : e.target.value}) }/>  <br/>
          <button onClick={() => setOtherData(false) } onMouseOver={() => setOtherData(true)}className= "btnOther" >Other Data</button >  
        </div>
        <div  style={{border: "solid 4px" , display: otherData? "block" : "none", borderRadius: 10, margin:20} }>
          Street: <input type="text" value={user.address.street} onChange={ e =>  setUser({ ...user, address :{street: e.target.value}}) }   />  <br/>
          City: <input type="text" value={user.address.city}  onChange={ e => setUser({ ...user, address :{city: e.target.value}}) }  />  <br/>
          Zip code: <input type="text" value={user.address.zipcode}  onChange={ e => setUser({ ...user, address :{zipcode: e.target.value}})}  />  <br/>
        </div>
        <button className= "btn" onClick={updateUser}>Update</button>
        <button className= "btn" onClick={deleteUser}>Delete</button> <br/>
    </div>
  )
}

export default User