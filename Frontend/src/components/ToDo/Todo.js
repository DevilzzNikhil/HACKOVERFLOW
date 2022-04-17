import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDeleteTaskMutation, useUpdateTaskMutation } from '../../appApi'


function Todo({ list }) {
  const { task, _id } = list;
  const id= _id
  const [deleteTask, { isError, isLoading }] = useDeleteTaskMutation();
  
  const [updatetask] = useUpdateTaskMutation();
  
  const lists = useSelector((state) => state.todo);
  const listToedit = lists.find((todo)=> todo._id == id);
  const [completed, setCompleted] = useState(!listToedit.completed);
  function handleDelete(e) {
    e.preventDefault();
    if(window.confirm("Do You Want To DELETE?"))
    {
      deleteTask(_id);
    }
  }

 
  function handlechecked() {
    if(completed){
      if(window.confirm("Is Your task  not Completed"))
      {
      setCompleted(!completed)
      updatetask({id,completed});
      }
    }

    if(!completed){
      if(window.confirm(" Is Your task  Completed"))
      {
      setCompleted(!completed)
      updatetask({id,completed});
      }
    }
   
   
  }

   



  if (isError) {
    return (
      <div>An Error Occured</div>
    )
  }
  if (isLoading) {
    return (
      <div>Loading</div>
    )
  }

  return (
    <div className="todo-row">
      <div className='text-sh '>
        <p className={completed ? "checked" : "uncheck"}>{task}</p>
        <input className="checkbox" type="checkbox" name="checkbox1" onClick={handlechecked} checked={completed? true:false}  />
      </div>
      <div>
        <button className='delete' onClick={handleDelete}>Delete</button>
      </div>

    </div>
  );
}

export default Todo