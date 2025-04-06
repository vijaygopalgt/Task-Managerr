import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth"; // Import Firebase signOut function
import TaskForm from "../components/Taskform";
import TaskList from "../components/tasklist";
import localforage from "localforage";
import { auth } from "../firebase/firebase"; // Import Firebase Auth instance
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(
    () => JSON.parse(localStorage.getItem("darkMode")) || false
  );
  const [filter, setFilter] = useState("all"); // State to manage the filter
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Load tasks from localforage
    const loadTasks = async () => {
      try {
        const savedTasks = await localforage.getItem("tasks");
        if (savedTasks) {
          setTasks(savedTasks); // Set the tasks state if available
        }
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    // Save tasks to localforage
    localforage.setItem("tasks", tasks);
  }, [tasks]);

  useEffect(() => {
    // Save dark mode preference to localStorage
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Filter tasks based on selected filter
  const filteredTasks =
    filter === "all"
      ? tasks
      : filter === "completed"
      ? tasks.filter((task) => task.completed === true)
      : tasks.filter((task) => task.completed === false);

  // Log out function
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      console.log("User logged out");
      // Redirect to login page after log out
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className={`${darkMode ? "dark bg-gray-900 text-gray-900" : "bg-gray-100"} min-h-screen`}>
      <div className="container mx-auto p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className={`${darkMode ? "text-white" : "text-gray-900"} text-3xl font-bold`}>
            Task Manager
          </h1>
          <div className="flex items-center space-x-4">
            <button
              className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded"
              onClick={() => setDarkMode((prev) => !prev)}
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
            <TaskForm tasks={tasks} setTasks={setTasks} />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </header>

        {/* Render the filtered task list */}
        <TaskList tasks={filteredTasks} />
      </div>
    </div>
  );
};

export default TaskManager;
