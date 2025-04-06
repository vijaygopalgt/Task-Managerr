import React, { useState, useEffect } from "react";

const EditTaskModal = ({ isOpen, onClose, task, onSave }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [category, setCategory] = useState(task.category);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setCategory(task.category);
  }, [task]);

  const handleSave = () => {
    const updatedTask = {
      ...task,
      title,
      description,
      dueDate,
      category,
    };
    onSave(updatedTask);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Edit Task</h2>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
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
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 rounded text-white">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 rounded text-white">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
