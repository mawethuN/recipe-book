import "./style.css";
import React, { useState } from "react";
import data from "./TemplateData.json";

/*
In this function, The states for the data or template data will be imported.
Under this function there are 5 const variables.
1) The fist declares the searchTerm for the Search Bar.
2) The second declares the filter to be used within the search bar when looking up items.
3) The third is to declare the use of filter buttons.
4) The fourth is to declare the favourites function.
*/
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [favorites, setFavorites] = useState([]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };
/*
This section is for the filter buttons. When pressed, the buttons will filter the items
according to the diet. This fuction will add and remove objects that do not belong in that category
by declaring which is active and inactive.
*/

/*
Undeneath the filter items section is the search and favourites function whereby the user will type
an input and the output will be what the button has found to match the description or name of the item.
*/
  return (
    <div className="templateContainer">
      <div className="filterButtons">
        <button
          className={`filterButton ${filter === "All" ? "active" : ""}`}
          onClick={() => handleFilterChange("All")}
        >
          All
        </button>
        <button
          className={`filterButton ${filter === "Meat" ? "active" : ""}`}
          onClick={() => handleFilterChange("Meat")}
        >
          Meat
        </button>
        <button
          className={`filterButton ${filter === "Vegan" ? "active" : ""}`}
          onClick={() => handleFilterChange("Vegan")}
        >
          Vegan
        </button>
        <button
          className={`filterButton ${filter === "Seafood" ? "active" : ""}`}
          onClick={() => handleFilterChange("Seafood")}
        >
          Seafood
        </button>
        <button
          className={`filterButton ${filter === "Dessert" ? "active" : ""}`}
          onClick={() => handleFilterChange("Dessert")}
        >
          Dessert
        </button>
        <button
          className={`filterButton ${filter === "Favorites" ? "active" : ""}`}
          onClick={() => handleFilterChange("Favorites")}
        >
          Favorites
        </button>
      </div>
      <div className="searchInput_Container"> 
        <input
          id="searchInput"
          type="text"
          placeholder="Search"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>
      <div className="template_Container">
        {data
          .filter((val) => {
            if (filter === "Favorites") {
              return favorites.includes(val.id);
            }
            if (filter !== "All" && val.diet !== filter) {
              return false;
            }
            if (searchTerm === "") {
              return true;
            }
            return val.title.toLowerCase().includes(searchTerm.toLowerCase());
          })
          .map((val) => {
            return (
              <div className="template" key={val.id}>
                <img src={val.image} alt="" />
                <h3>{val.title}</h3>
                <p className="diet">{val.diet}</p>
                <p className="descr">{val.descr}</p>
                <button onClick={() => toggleFavorite(val.id)}>
                  {favorites.includes(val.id) ? "Unfavorite" : "Favorite"}
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;


