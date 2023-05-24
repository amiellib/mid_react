import './style.css';

const Posts = ({pressedId, props}) => {
  return (
    <div  className="sideR" >
      {props.map((post) =>{ 
        if(post?.userId === pressedId ){
        return(
        <div key={post.id} className="divInfo">
          <label>Title: </label>{post.title} <br/><br/>
          <label>Body: </label>{post.body}<br/>
        </div>
        );}})}
    </div>
    )}
export default Posts