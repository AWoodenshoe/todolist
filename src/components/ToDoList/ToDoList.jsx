import React, { use, useState } from 'react';
import confetti from 'canvas-confetti';
import ProgressBar from "../ProgressBar/ProgressBar.jsx";
import { motion } from "framer-motion";
import styles from './ToDoList.module.css';


function ToDoList() {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTasks] = useState("");
    const [id, setId] = useState(0);
    const [priority, setPriority] = useState("medium");

    function handleInputChange(event) {
        setNewTasks(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, { id: id, text: newTask, completed: false, priority: priority }]);
            console.log(tasks);
            setNewTasks("");
            setId(i => i + 1);
        }
    }

    function deleteTask(id) {
        setTasks(t => t.filter(task => task.id !== id)); 
        setId(i => i - 1);
    }

    function moveTaskUp(id) {
        const index = tasks.findIndex(task => task.id === id);
        if(index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(id) {
        const index = tasks.findIndex(task => task.id === id);
        if(index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function toggleComplete(id) {
        setTasks(tasks => tasks.map((task, i) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
        
        const taskToCheck = tasks.find(task => task.id === id);

        if (taskToCheck && !taskToCheck.completed) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
    }

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    function handlePriorityChange(event) {
        setPriority(event.target.value);
    }

    return(
    <div className={styles.toDoList}>
        <h1>To-Do List</h1>
        <ProgressBar totalTasks={totalTasks} completedTasks={completedTasks}/>

        <div className={styles.inputWrapper}>
            <div className={styles.inputTask}>
                <input 
                    type="text"
                    placeholder="Enter a task..."
                    value={newTask}
                    onChange={handleInputChange}/>
                <select required className={styles.select} value={priority} onChange={handlePriorityChange}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <button
                className={styles.addButton}
                onClick={addTask}>
                Add
            </button>
        </div>

        <ol>
            {tasks.map(task => 
                <motion.li key={task.id} className={`${styles.task} ${styles[task.priority]}`} layout transition={{type: "tween", ease:"easeInOut", duration: 0.15}} whileHover={{ y: -5}}>
                        <span 
                            className={`${styles.text} ${task.completed ? styles.completed : ''}`} 
                            onClick={() => toggleComplete(task.id)}>
                            {task.text}
                        </span>
                        <button className={styles.deleteButton} onClick={() => deleteTask(task.id)}>🗑️</button>
                        <button className={styles.moveButton} onClick={() => moveTaskUp(task.id)}>☝️</button>
                        <button className={styles.moveButton} onClick={() => moveTaskDown(task.id)}>👇</button>
                </motion.li>
            )}
        </ol>
    </div>
    );
}

export default ToDoList;