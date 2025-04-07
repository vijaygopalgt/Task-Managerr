import { create } from "zustand";
import localforage from "localforage";

localforage.config({
  name: "TaskManagerApp",
  storeName: "tasks",
});

const useTaskStore = create((set) => ({
  tasks: [],

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

  addTask: (task) =>
    set((state) => {
      const updatedTasks = [...state.tasks, task];
      localforage.setItem("tasks", updatedTasks).catch((error) => {
        console.error("Failed to update tasks in localforage:", error);
      });
      return { tasks: updatedTasks };
    }),

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

  deleteTask: (id) =>
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      localforage.setItem("tasks", updatedTasks).catch((error) => {
        console.error("Failed to update tasks in localforage:", error);
      });
      return { tasks: updatedTasks };
    }),

  filterTasks: (filter) => {
    return (get) => {
      const { tasks } = get();
      if (filter === "all") {
        return tasks;
      } else if (filter === "completed") {
        return tasks.filter((task) => task.completed === true);
      } else if (filter === "pending") {
        return tasks.filter((task) => task.completed !== true);
      }
      return tasks;
    };
  }
}));

export default useTaskStore;
