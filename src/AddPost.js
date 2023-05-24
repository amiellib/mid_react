import './style.css';
import { useState } from 'react';
const AddPost = ({callbackAddPost, callbackCancelAddPost}) => {
  

    const [post,setPost] = useState({title:"", body:""});


    function cancelAddPost() {
        document.getElementById('TitlePost').value = ''
        document.getElementById('Body').value = ''
        setPost({title:"", body:""})
        callbackCancelAddPost()
    }


    function addPost() {
        callbackAddPost(post)
        cancelAddPost()
    }


    return (
        <div key="addPost" className='divAdd'>
            Title: <input type="text" id="TitlePost" onChange={  e => setPost({ ...post, title : e.target.value})  }/>  <br/><br />
            Body: <input type="text" id="Body" onChange={ e => setPost({ ...post, body : e.target.value})  }/>  <br/><br />
            <button className= "btn" onClick={() => cancelAddPost()}>Cancel</button>
            <button className= "btn"  onClick={() => addPost()}>Add</button><br />
        </div> 
        )}
  export default AddPost