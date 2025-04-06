import React, { useEffect, useState } from "react";
import TaskItem from "./Taskitem";
import FilterButtons from "./Filterbutton";
import useTaskStore from "../storage/taskStore";

const TaskList = () => {
  const { tasks, loadTasks } = useTaskStore();
  const [loading, setLoading] = useState(true);
  const [allTasks, setAllTasks] = useState([]); // Master list
  const [filteredTasks, setFilteredTasks] = useState([]); // Display list

  useEffect(() => {
    loadTasks()
      .then(() => {
        setAllTasks(useTaskStore.getState().tasks); // Save original
        setFilteredTasks(useTaskStore.getState().tasks); // Display all initially
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load tasks:", error);
        setLoading(false);
        alert("Could not load tasks. Please try again.");
      });
  }, [loadTasks]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading tasks...</p>;
  }

  if (filteredTasks.length === 0) {
    return (
      <>
        <FilterButtons tasks={allTasks} setTasks={setFilteredTasks} />
        <p className="text-center text-gray-500">No tasks available.</p>
      </>
    );
  }

  return (
    <div>
      <FilterButtons tasks={allTasks} setTasks={setFilteredTasks} />
      <ul className="space-y-4">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
