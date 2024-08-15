import React from "react";

function NewPlantForm({ onAddPlant }) {
  function handleSubmit(event) {
    event.preventDefault();
    const newPlant = {
      name: event.target.name.value,
      image: event.target.image.value,
      price: parseFloat(event.target.price.value),
    };
    onAddPlant(newPlant);
    event.target.reset();
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" />
        <input type="text" name="image" placeholder="Image URL" />
        <input type="number" name="price" step="0.01" placeholder="Price" />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
