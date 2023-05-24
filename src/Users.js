import axios from 'axios';
import { useState, useEffect } from 'react';
import User from "./User"
import Posts from "./Posts"
import Todos from "./Todos"
import AddUser from './AddUser';
import AddTodo from './AddTodo';
import AddPost from './AddPost';
import './style.css';

//urls
const usersUrl = 'https://jsonplaceholder.typicode.com/users'
const postsUrl = 'https://jsonplaceholder.typicode.com/posts'
const todosUrl = 'https://jsonplaceholder.typicode.com/todos'


function Users() {
    //data  
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [todos, setTodos] = useState([]);
    //counters
    const [userNextID, setUserNextID] =useState(11)
    const [todoNextID, setTodoNextID] =useState(201)
    const [postNextID, setPostNextID] =useState(101)
    // flags
    const [addPostFlag, setAddPostFlag] =useState(false)
    const [addTodoFlag, setAddTodoFlag] =useState(false)
    const [addUserFlag, setAddUserFlag] =useState(false)
    // input
    const [search, setSearch] = useState('');
 
    //id
    const [idClicked, setIdClicked] =useState(0)


    function completedTodo(todoId){
        const tempData = (todos.map((todo)=>{
            if(todoId === todo.id){
                return ({...todo,id : todoId, completed : true });
            }
            else {
            return(todo)
            }})) 
            setTodos([...tempData])
        }
        
        
    function getDataFromUser(userData) {
        const tempData = (users.map((user)=>{
             if(userData.id === user.id){
                 return ({...user, name : userData.name, email: userData.email, address:{city : userData.city, street : userData.street, zipcode: userData.zipcode}});
             }
             else {
             return(user)
             }})) 
            setUsers([...tempData])
         }

    function clicked(id){
        if (id !== idClicked){
            setIdClicked(id)
            setAddUserFlag(false)
        }
        else {
            setIdClicked(0)
        }
    }


    function deleteFromUser(id){
        if(idClicked === id){
            setIdClicked(0)
        }
        const tempData = (users.map((user)=>{
            if(id !== user.id){
                return (user);
            }
            else
             {
                return(undefined)//the one need to delete
            }
        })) 
          setUsers([...tempData.filter(x=>x!==undefined)])
    }
    //flags
    function flagAddUser() {
        setIdClicked(0)
        setAddUserFlag(true)
        setAddTodoFlag(false)
        setAddPostFlag(false)
    }
    function flagAddTodo() {
        setAddPostFlag(false)
        setAddTodoFlag(true)
        setAddUserFlag(false)
    }
    function flagAddPost() {
        setAddPostFlag(true)
        setAddTodoFlag(false)
        setAddUserFlag(false)
    }
    //users
    function addUser(userData) {
        setUsers([...users,{id : userNextID, name: userData.name, email: userData.email, address:{street:"", zipcode:"", city: ""}}])
        setUserNextID(userNextID+1)
        cancelAddUser()
    }
    function cancelAddUser() {
        setAddUserFlag(false)
    }
    //todos
    function addTodo(title) {
        setTodos([...todos,{userId: idClicked, id : todoNextID, title, completed: false}])
        setTodoNextID(todoNextID+1)
        cancelAddTodo()
    }
   
    function cancelAddTodo() {
        setAddTodoFlag(false)
    }

    //posts
    function addPost(userData) {
        setPosts([...posts,{userId: idClicked, id : postNextID, body:userData.body, title: userData.title}])
        setPostNextID(postNextID+1)
        cancelAddPost()

    }
    function cancelAddPost() {
        setAddPostFlag(false)
    }

    //axios get all data
    useEffect(()  => {
        const getData = async() => {
        const {data :usersData} = await axios.get(usersUrl);
        const {data :postsData} = await axios.get(postsUrl);
        const {data :todosData} = await axios.get(todosUrl);
        setPosts(postsData);
        setTodos(todosData);
        setUsers(usersData);
    }
    getData()
    }, [])

    return (
        <>
        <div style={{display:'inline-flex'}}>

            {/* div  left*/}
            <div key="users" className='divUsers'>
                {/* search */}
                <label >Search</label>
                <input type='text' onChange={(e) => setSearch(e.target.value)} />
                <button className="btn" onClick={() => flagAddUser()}>Add</button><br />
            {/* users */}
            {users.filter(obj=>obj.name.includes(search) || obj.email.includes(search)).map((user) =>{ 
               return(
                <div key={user.id}>
                <User key={user.id} callbackUpdate={getDataFromUser} callbackDelete={deleteFromUser} callbackIdClicked={clicked} pressedId={idClicked} props={user} propsTodos={todos} />
            </div>
            );})}
        </div >

        {/* div  right*/}
        <div style={{maxWidth: 600, maxHeight:1000}}>

            {/*todo */}
            <div style={{display:idClicked === 0 ? "none": addTodoFlag? "none":"block"}}>
                <button className= "btn" onClick={() => flagAddTodo() }>Add</button>
                <label>Todos - User {idClicked}</label>
                <Todos  pressedId={idClicked} props={todos} callbackCompletedTodo={completedTodo}/>
            </div>

            {/* add todo */}
            <div style={{  display: addTodoFlag? "block":"none"}}>
                <label >New Todo -  User {idClicked}</label>
                <AddTodo  callbackCancelAddTodo={cancelAddTodo} callbackAddTodo={addTodo}/>
            </div><br/>
            
            {/* post  */}
            <div style={{display:idClicked === 0 ? "none": addPostFlag? "none":"block"}}>   
                <button className= "btn"  onClick={() => flagAddPost() }>Add</button> 
                <label style={{display:idClicked === 0 ? "none": "block"}}>Posts - User {idClicked}</label>
                <Posts  pressedId={idClicked} props={posts}/>
            </div>
            {/*add post */}
            <div style={{  display: addPostFlag? "block":"none"}}>
                <label >New Post - User {idClicked}</label>
                <AddPost callbackAddPost={addPost} callbackCancelAddPost={cancelAddPost} />
            </div>
                {/* add user */}
                <div style={{ display:addUserFlag ? "block": "none"}}>
                <label >Add New User</label>
                <AddUser  callbackAddUser={addUser} callbackCancelAddUser={cancelAddUser} />
            </div>
        </div>
    </div>
    </>
)};
  export default Users;