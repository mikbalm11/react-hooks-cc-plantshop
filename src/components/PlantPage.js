import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

const URL = "http://localhost:6001/plants";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setPlants(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  function handleAddPlant(newPlant) {
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((data) => setPlants([...plants, data]))
      .catch((error) => console.error("Error:", error));
  }

  function handleUpdatePlant(updatedPlant) {
    setPlants((plants) =>
      plants.map((plant) =>
        plant.id === updatedPlant.id ? updatedPlant : plant
      )
    );
  }

  function handleDeletePlant(id) {
    setPlants((plants) => plants.filter((plant) => plant.id !== id));
  }

  const searchedPlants = plants.filter((plant) => plant.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search search={searchTerm} onChangeSearch={setSearchTerm} />
      <PlantList plants={searchedPlants} onUpdatePlant={handleUpdatePlant} onDeletePlant={handleDeletePlant} />
    </main>
  );
}

export default PlantPage;
