import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import ProgressBar from "./ProgressBar.jsx";

function ToDoList() {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTasks] = useState("");

    function handleInputChange(event) {
        setNewTasks(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, { text: newTask, completed: false }]);
            setNewTasks("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks); 
    }

    function moveTaskUp(index) {
        if(index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if(index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function toggleComplete(index) {
        setTasks(tasks => tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        ));
    
        if (!tasks[index].completed) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    return(
    <div className="to-do-list">
        <h1>To-Do-List</h1>
        <ProgressBar progress={progress} />

        <div>
            <input 
                type="text"
                placeholder="Enter a task..."
                value={newTask}
                onChange={handleInputChange}/>
            <button
                className="add-button"
                onClick={addTask}>
                Add
            </button>
        </div>

        <ol>
            {tasks.map((task, index) => 
                <li key={index}>
                    <span 
                        className={`text ${task.completed ? "completed" : ""}`} 
                        onClick={() => toggleComplete(index)}
                    >
                        {task.text}
                    </span>
                    <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
                    <button className="move-button" onClick={() => moveTaskUp(index)}>👇</button>
                    <button className="move-button" onClick={() => moveTaskDown(index)}>☝️</button>
                </li>
            )}
        </ol>
    </div>
    );
}

export default ToDoList;