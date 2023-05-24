import './style.css';


const Todos = ({pressedId, props, callbackCompletedTodo}) => {
  return (
    <div className="sideR" >
        {props.map((todo) =>{ //filter?
           if(todo.userId === pressedId ){
            return(
             <div key={todo.id} className="divInfo">
        <label>Title: </label>{todo.title} <br/><br/>
        <label>Completed: </label>{String(todo.completed)} 
        <button className= "btn" style={{ display: todo.completed? "none" : "block"}} 
        onClick={()=>callbackCompletedTodo(todo.id)}>Mark Completed</button>
        </div>
        );}})}
                </div>
                )
}
export default Todos