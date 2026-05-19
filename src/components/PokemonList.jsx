import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getPokemonsWithDetails, getAllTypes } from "../api/api";
import { useTeam } from "../context/TeamContext";
import SearchBar from "./SearchBar";
import PokemonCard from "./PokemonCard";
import '../styles/PokemonList.css';

export default function PokemonList() {
  const navigate = useNavigate();
  const { toggleLike, team } = useTeam();
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isShinyOnly, setIsShinyOnly] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [types, setTypes] = useState([]);
  const [error, setError] = useState("");

  // Cargar Pokémon iniciales
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError("");
        
        // Cargar Pokémon iniciales (primeros 150)
        const pokemonData = await getPokemonsWithDetails(150, 0);
        setAllPokemons(pokemonData);
        setFilteredPokemons(pokemonData);

        // Cargar tipos
        const typeList = await getAllTypes();
        setTypes(typeList);
      } catch (err) {
        setError("Error carregant Pokémon. Intenta de nou.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Filtrar Pokémon
  useEffect(() => {
    let filtered = allPokemons;

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por tipo
    if (selectedType) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((typeObj) => typeObj.type.name === selectedType)
      );
    }

    // Filtro Shiny
    if (isShinyOnly) {
      filtered = filtered.filter((pokemon) =>
        pokemon.sprites?.front_shiny && pokemon.sprites.front_shiny !== pokemon.sprites.front_default
      );
    }

    setFilteredPokemons(filtered);
  }, [searchTerm, selectedType, isShinyOnly, allPokemons]);

  if (loading) {
    return <div className="loading">Carregant Pokédex...</div>;
  }

  return (
    <section className="pokemon-list-section">
      <h2 className="section-title">Pokédex</h2>
      
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onShinyFilter={setIsShinyOnly}
        isShinyOnly={isShinyOnly}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        types={types}
        team={team}
      />

      {error && <div className="error-message">{error}</div>}

      <div className="results-info">
        Mostrant {filteredPokemons.length} de {allPokemons.length} Pokémon
      </div>

      {filteredPokemons.length === 0 ? (
        <div className="no-results">
          <p>No s'han trobat Pokémon amb aquests criteris.</p>
          <p>Prova de canviar els filtres.</p>
        </div>
      ) : (
        <div className="grid">
          {filteredPokemons.map((pokemon) => (
            <div 
              key={pokemon.id} 
              onClick={() => navigate(`/pokemon/${pokemon.name}`)}
              className="pokemon-card-wrapper"
            >
              <PokemonCard
                pokemon={pokemon}
                onLikeClick={toggleLike}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}