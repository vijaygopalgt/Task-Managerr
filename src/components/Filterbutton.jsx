import React, { useState } from "react";

const FilterButtons = ({ tasks, setTasks }) => {
    const [activeFilter, setActiveFilter] = useState("all");
  
    const handleFilterChange = (filter) => {
      setActiveFilter(filter);
  
      if (filter === "all") {
        setTasks(tasks);
      } else if (filter === "completed") {
        setTasks(tasks.filter((task) => task.completed === "true"));
      } else if (filter === "pending") {
        setTasks(tasks.filter((task) => task.completed !== "true"));
      }
    };
  
    return (
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {["all", "completed", "pending"].map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterChange(filter)}
            className={`px-4 py-2 rounded ${
              activeFilter === filter
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-blue-100"
            } transition`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>
    );
  };
  

export default FilterButtons;
