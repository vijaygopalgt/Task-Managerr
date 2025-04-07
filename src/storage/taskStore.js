import { create } from "zustand";
import localforage from "localforage";

localforage.config({
  name: "TaskManagerApp",
  storeName: "tasks",
});

const useTaskStore = create((set) => ({
  tasks: [],
  
  // Load tasks from localforage on startup
  loadTasks: async () => {
    try {
      const savedTasks = await localforage.getItem("tasks");
      if (savedTasks) {
        set({ tasks: savedTasks });
      }
    } catch (error) {
      console.error("Failed to load tasks from localforage:", error);
    }
  },
  
  // Add a new task and update localforage
  addTask: (task) =>
    set((state) => {
      const updatedTasks = [...state.tasks, task];
      localforage.setItem("tasks", updatedTasks).catch((error) => {
        console.error("Failed to update tasks in localforage:", error);
      });
      return { tasks: updatedTasks };
    }),

  // Update a task and store the updated list in localforage
  updateTask: (id, updatedTask) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? updatedTask : task
      );
      localforage.setItem("tasks", updatedTasks).catch((error) => {
        console.error("Failed to update tasks in localforage:", error);
      });
      return { tasks: updatedTasks };
    }),

  // Delete a task and update localforage
  deleteTask: (id) =>
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      localforage.setItem("tasks", updatedTasks).catch((error) => {
        console.error("Failed to update tasks in localforage:", error);
      });
      return { tasks: updatedTasks };
    }),
}));

export default useTaskStore;
