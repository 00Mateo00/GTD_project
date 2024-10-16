import React from "react";
import { useEffect, useState } from "react";
export const VerTareas = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/get/tasks/Dumper")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTasks(data);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);
  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <p>titulo: {task.title}</p>
            <p>descripcion: {task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
