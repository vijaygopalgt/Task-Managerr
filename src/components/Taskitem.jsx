import React, { useState } from "react";
import useTaskStore from "../storage/taskStore";
import EditTaskModal from "./edit";
import localforage from 'localforage';

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useTaskStore();
  const [isEditing, setIsEditing] = useState(false);

  const toggleCompletion = () => {
    const updatedTask = { ...task, completed: !task.completed };
    updateTask(task.id, updatedTask);
    localforage.setItem("tasks", useTaskStore.getState().tasks); // Save updated tasks
  };
  
  const handleEditSave = (updatedTask) => {
    updateTask(task.id, updatedTask);
    localforage.setItem("tasks", useTaskStore.getState().tasks); // Save updated tasks
  };
  
  const handleDelete = () => {
    deleteTask(task.id);
    localforage.setItem("tasks", useTaskStore.getState().tasks); // Save updated tasks
  };
  

  return (
    <>
      <li
        className={`p-4 border rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition ${
          task.completed ? "bg-green-100" : "bg-red-100"
        }`}
      >
        {/* STATUS */}
        <div className={`text-sm font-bold min-w-[80px] ${task.completed ? "text-green-600" : "text-yellow-600"}`}>
          {task.completed ? "Completed" : "Pending"}
        </div>

        {/* TASK DETAILS */}
        <div className="flex-1 min-w-[200px]">
          <h3 className={`font-semibold text-lg ${task.completed ? "line-through text-gray-500" : "text-black"}`}>
            {task.title}
          </h3>
          <p className="text-sm text-gray-600">
            {task.description}
          </p>
        </div>

        {/* DUE DATE */}
        {task.dueDate && <div className="min-w-[120px] text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</div>}

        {/* CATEGORY */}
        {task.category && (
          <div className="min-w-[100px]">
            <span className="text-sm px-2 py-1 rounded-full bg-blue-500 text-white">
              {task.category}
            </span>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex gap-2 sm:flex-row flex-wrap">
          <button
            onClick={toggleCompletion}
            className={`${
              task.completed ? "bg-yellow-500" : "bg-green-500"
            } hover:opacity-90 text-white px-3 py-1 rounded`}
          >
            {task.completed ? "Mark as Pending" : "Mark as Completed"}
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => deleteTask(task.id)} // Ensure deleteTask function is defined properly
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </li>

      {/* Edit Modal */}
      <EditTaskModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        task={task}
        onSave={handleEditSave}
      />
    </>
  );
};

export default TaskItem;
