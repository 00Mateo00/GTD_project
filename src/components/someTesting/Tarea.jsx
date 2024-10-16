import { useState } from "react";

export const Tarea = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior

    const taskData = [
      {
        title: title ? title : e.title,
        description: description ? description : e.description,
        label: e.label,
        id: e.id,
        origin: e.origin,
        checked: e.checked,
        day: e.day,
        time: e.time,
        subtasks: e.subtasks,
      },
    ];

    try {
      const response = await fetch("http://localhost:8080/create/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      console.log("Form submitted successfully", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input placeholder="Escribe tu nombre" name="title" id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripcion:</label>
          <input placeholder="Escribe tu descripción" name="description" id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};
