import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getPokemonsWithDetails, getAllTypes } from "../api/api";
import { useTeam } from "../context/TeamContext";
import SearchBar from "./SearchBar";
import PokemonCard from "./PokemonCard";
import '../styles/PokemonList.css';

export default function PokemonList() {
  const navigate = useNavigate();
  const { toggleLike, team, likes, isLiked } = useTeam();
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isShinyOnly, setIsShinyOnly] = useState(false);
  const [isFavoritesOnly, setIsFavoritesOnly] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [types, setTypes] = useState([]);
  const [error, setError] = useState("");

  const teamColors = {
    blue: '#3b82f6',
    yellow: '#eab308',
    red: '#ef4444',
  };
  const accentColor = teamColors[team] || '#ef4444';

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

    // Filtro Favoritos
    if (isFavoritesOnly) {
      filtered = filtered.filter((pokemon) => isLiked(pokemon.id));
    }

    setFilteredPokemons(filtered);
  }, [searchTerm, selectedType, isShinyOnly, isFavoritesOnly, allPokemons, isLiked]);

  if (loading) {
    return <div className="loading">Carregant Pokédex...</div>;
  }

  return (
    <section className="pokemon-list-section">
      <div className="list-header" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <h2 
          className="section-title" 
          style={{ 
            margin: 0, 
            textTransform: 'uppercase', 
            fontWeight: '900', 
            fontSize: '3rem', 
            color: 'black', 
            backgroundColor: 'white',
            padding: '10px 30px',
            border: '5px solid black',
            boxShadow: `8px 8px 0px ${accentColor}`,
            transform: 'skew(-2deg)'
          }}
        >
          POKÉDEX
        </h2>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onShinyFilter={setIsShinyOnly}
        isShinyOnly={isShinyOnly}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        types={types}
        team={team}
        isFavoritesOnly={isFavoritesOnly}
        onFavoritesFilter={setIsFavoritesOnly}
        favoritesCount={(likes || []).length}
      />

      {error && <div className="error-message">{error}</div>}

      {(searchTerm || selectedType || isShinyOnly || isFavoritesOnly) && (
        <button 
          onClick={() => {
            setSearchTerm("");
            setSelectedType("");
            setIsShinyOnly(false);
            setIsFavoritesOnly(false);
          }}
          style={{ marginBottom: '20px', background: 'none', border: 'none', color: accentColor, textDecoration: 'underline', cursor: 'pointer', fontWeight: '600', padding: 0 }}
        >
          Neteja tots els filtres
        </button>
      )}

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
                isShinyOnly={isShinyOnly}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}