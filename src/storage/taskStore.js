
import { create } from "zustand";
import localforage from "localforage";

localforage.config({
  name: "TaskManagerApp",
  storeName: "tasks",
});

const useTaskStore = create((set) => ({
  tasks: [],
  
  loadTasks: async () => {
    const savedTasks = await localforage.getItem("tasks");
    if (savedTasks) set({ tasks: savedTasks });
  },
  
  addTask: (task) =>
    set((state) => {
      const updatedTasks = [...state.tasks, task];
      localforage.setItem("tasks", updatedTasks);
      return { tasks: updatedTasks };
    }),

  updateTask: (id, updatedTask) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? updatedTask : task
      );
      localforage.setItem("tasks", updatedTasks);
      return { tasks: updatedTasks };
    }),

  deleteTask: (id) =>
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      localforage.setItem("tasks", updatedTasks);
      return { tasks: updatedTasks };
    }),
}));

export default useTaskStore;
