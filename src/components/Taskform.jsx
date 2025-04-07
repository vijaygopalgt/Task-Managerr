import React, { useState, useEffect } from "react";
import useTaskStore from "../storage/taskStore";
import localforage from 'localforage';


const TaskForm = () => {
  const { addTask, loadTasks } = useTaskStore();
  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    loadTasks(); // Load tasks from local storage when the component mounts
  }, [loadTasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
  
    if (!title.trim() || !dueDate) {
      alert("Task title and due date are required.");
      return;
    }
  
    const newTask = {
      id: Date.now(),
      title,
      description,
      dueDate,
      category: category || "Uncategorized",
      completed: false,
    };
  
    addTask(newTask); // Add task using the store
    localforage.setItem("tasks", useTaskStore.getState().tasks); // Save to localforage
  
    setTitle("");
    setDescription("");
    setDueDate("");
    setCategory("");
    setIsOpen(false);
  };
  

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Task
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-md relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-3 text-gray-700 dark:text-white text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center dark:text-white">Add New Task</h2>
            <form onSubmit={handleAddTask} className="space-y-4">
              <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Category</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Others">Others</option>
              </select>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskForm;
