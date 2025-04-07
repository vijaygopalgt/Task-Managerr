import React, { useEffect, useState } from "react";
import TaskItem from "./Taskitem";
import FilterButtons from "./Filterbutton";
import useTaskStore from "../storage/taskStore";

const TaskList = () => {
  const { tasks, loadTasks } = useTaskStore();
  const [loading, setLoading] = useState(true);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    loadTasks(); // Load tasks when the component mounts
  }, [loadTasks]);

  useEffect(() => {
    setFilteredTasks(tasks); // Initially display all tasks
    setLoading(false);
  }, [tasks]);

  const handleFilterChange = (newFilter) => {
    setActiveFilter(newFilter);
    if (newFilter === "all") {
      setFilteredTasks(tasks);
    } else if (newFilter === "completed") {
      setFilteredTasks(tasks.filter((task) => task.completed === true));
    } else if (newFilter === "pending") {
      setFilteredTasks(tasks.filter((task) => task.completed !== true));
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading tasks...</p>;
  }

  if (filteredTasks.length === 0) {
    return (
      <>
        <FilterButtons onFilterChange={handleFilterChange} />
        <p className="text-center text-gray-500">No tasks available.</p>
      </>
    );
  }

  return (
    <div>
      <FilterButtons onFilterChange={handleFilterChange} />
      <ul className="space-y-4">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
