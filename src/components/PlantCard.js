import React, { useState } from "react";

function PlantCard({ plant, onUpdatePlant, onDeletePlant }) {
  const { id, name, image, price } = plant;
  const [inStock, setInStock] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(price);

  function handleInStock() {
    setInStock(!inStock);
  }

  function handlePriceClick() {
    setIsEditing(true);
  }

  function handlePriceChange(event) {
    setNewPrice(event.target.value);
  }

  function handlePriceUpdate(event) {
    if (event.key === "Enter") {
      setIsEditing(false);

      fetch(`http://localhost:6001/plants/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/JSON",
        },
        body: JSON.stringify({ price: parseFloat(newPrice) }),
      })
        .then((response) => response.json())
        .then((updatedPlant) => {
          onUpdatePlant(updatedPlant);
        })
        .catch((error) => console.error("Error:", error));
    }
  }

  function handleDeleteClick() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        onDeletePlant(id);
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      {isEditing ? (
        <input
          type="number"
          value={newPrice}
          onChange={handlePriceChange}
          onKeyDown={handlePriceUpdate} // I wanted enter key to update the price
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      ) : (
        <p onClick={handlePriceClick}>Price: {price}</p>
      )}
      {inStock ? (
        <button className="primary" onClick={handleInStock}>In Stock</button>
      ) : (
        <button onClick={handleInStock}>Out of Stock</button>
      )}
      <button onClick={handleDeleteClick}>🌱</button>
    </li>
  );
}

export default PlantCard;
