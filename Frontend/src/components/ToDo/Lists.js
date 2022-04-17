import React, { useState } from 'react'
import { useCreateTaskMutation, useGetAllUserListsQuery} from '../../appApi';
import { useNavigate } from 'react-router-dom';
import "../Css/todolist.css"
import Todo from './Todo';

function Lists() {

    const [task, setTask] = useState("");
    const [createTask] = useCreateTaskMutation();
    const { data: userlists, isLoading, isError } = useGetAllUserListsQuery();
    let navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (!task) {
            return alert("Please Wrote Task")
        }
        createTask({ task });
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
        <>
        <div className='bg-h'>
            <div className='todo-app'>

                <form onSubmit={handleSubmit} name="myform" className="todo-form" >
                    <h1>My Task For Today</h1>

                    <input style={{ color:"black",fontSize:"1.5em", textAlign:"center" }} className='todo-input'   type="text" placeholder="Add a Task" value={task} name="myinput" onChange={(e) => setTask(e.target.value)} />

                    <button className='todo-button' type="submit">
                        Submit
                    </button>
                </form>
                {userlists.slice(0).reverse().map((list,index) => 
                    <Todo list={list} key={index}/>
                )}
                
            </div>
            </div>
        </>
    )
}

export default Lists