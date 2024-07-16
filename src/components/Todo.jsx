
import React, { useRef, useState,useEffect } from 'react';
import "../components/Todo.css";
import Button from 'react-bootstrap/Button';
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { useDispatch, useSelector } from 'react-redux';
import TodoTasks from './TodoTasks';
function Todo() {
    const userInputValueRef = useRef();
    const dispatch = useDispatch();
    const [editIndex, setEditIndex] = useState(null);
    const userTasks = useSelector(state => state.userTaskDetails);

    useEffect(() => {
        // Fetch tasks from localStorage when component mounts
        const localStorageTasks = JSON.parse(localStorage.getItem("userTasks")) || [];
        // Dispatch action to initialize Redux state with localStorage data
        dispatch({ type: "initializeTasks", data: localStorageTasks });
    }, [dispatch]);

    const handleAddTask = () => {
        const userInputValue = userInputValueRef.current.value.trim();
        if (userInputValue) {
            if (editIndex !== null) {
                // Update existing task
                dispatch({ type: "updateTask", data: { index: editIndex, value: userInputValue } });
                setEditIndex(null);
            } else {
                // Add new task
                dispatch({ type: "addTask", data: userInputValue });
                // Update localStorage with the new task
                const localStorageTasks = JSON.parse(localStorage.getItem("userTasks")) || [];
                localStorageTasks.push(userInputValue);
                localStorage.setItem("userTasks", JSON.stringify(localStorageTasks));
            }
            userInputValueRef.current.value = '';
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    };

    const handleEditTask = (index, value) => {
        userInputValueRef.current.value = value;
        setEditIndex(index);
    };

    return (
        <div>
            <h1 className='reactHeading'>React To-Do Application</h1>
            <div className='taskBtnContainer'>
                <input
                    type="text" placeholder='Enter your tasks here...'
                    className='addInput'
                    ref={userInputValueRef}
                    onKeyDown={handleKeyDown}
                ></input>
                <Button
                    variant="primary"
                    className='addBtn'
                    id="addBtnTask"
                    onClick={handleAddTask}
                >
                    {editIndex !== null ? "Update Task" : "Add Task"}
                </Button>
            </div>
            <div id="taskAddedContainer">
                <TodoTasks tasks={userTasks} onEditTask={handleEditTask} />
            </div>
        </div>
    );
}

export default Todo;

