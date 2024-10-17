import React, { useState, useEffect } from "react";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";
import "./App.css";

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch Pokémon data using fetch (vanilla JS)
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const data = await response.json();
        const pokemonData = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokeDetailResponse = await fetch(pokemon.url);
            const pokeDetail = await pokeDetailResponse.json();
            return pokeDetail;
          })
        );
        setPokemonList(pokemonData);
        setFilteredPokemon(pokemonData);
      } catch (error) {
        console.error("Error fetching Pokémon data", error);
      }
    };
    fetchPokemon();
  }, []);

  // Handle search functionality
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === "") {
      setFilteredPokemon(pokemonList);
    } else {
      const filtered = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredPokemon(filtered);
    }
  };

  return (
    <div className="App">
      <h1>Pokémon Search</h1>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      <div className="pokemon-grid">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default App;
