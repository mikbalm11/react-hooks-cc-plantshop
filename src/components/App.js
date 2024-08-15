import React from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

/*

Hierarchy:

  - App
    - Header
    - PlantPage
      - NewPlantForm
      - PlantList
        -PlantCard
      - Search

*/

function App() {
  return (
    <div className="app">
      <Header />
      <PlantPage />
    </div>
  );
}

export default App;
