import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "../components/TodoTasks.css";
function TodoTasks({ tasks = [], onEditTask }) {
    const dispatch = useDispatch();
    const [checkedItems, setCheckedItems] = useState([]);

    const handleCheckboxChange = (index) => {
        const newCheckedItems = [...checkedItems];
        if (newCheckedItems.includes(index)) {
            newCheckedItems.splice(newCheckedItems.indexOf(index), 1);
        } else {
            newCheckedItems.push(index);
        }
        setCheckedItems(newCheckedItems);
    };

    return (
        <div className='mainTodoTaskCont'>  

            {Array.isArray(tasks) && tasks.map((task, index) => (
                <div key={index} style={{ textDecoration: checkedItems.includes(index) ? 'line-through' : 'none' }} className='todoTasksDiv'>
                    <input type="checkbox"
                        checked={checkedItems.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                    />
                    <span className='numberSpan'>{index + 1}</span>
                    <span className='taskSpan'>{task}</span>
                    <FaEdit  onClick={() => onEditTask(index, task)} className='edit'style={{color:"green"}}/>
                    <MdDelete  onClick={() => dispatch({ type: "deleteTask", index })} style={{color:"red"}} className='delete'/>
                </div>
            ))} 

        </div>
    );
}

export default TodoTasks;
