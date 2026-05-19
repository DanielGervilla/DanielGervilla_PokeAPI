import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getPokemonByName } from '../api/api';
import { useTeam } from '../context/TeamContext';
import '../styles/PokemonDetail.css';

export default function PokemonDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const { toggleLike, isLiked } = useTeam();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showShiny, setShowShiny] = useState(false);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        const data = await getPokemonByName(name);
        setPokemon(data);
      } catch (error) {
        console.error('Error loading Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [name]);

  if (loading) {
    return <div className="loading">Carregant detalls...</div>;
  }

  if (!pokemon) {
    return (
      <div className="error-page">
        <h2>Pokémon no trobat</h2>
        <button onClick={() => navigate('/')}>Tornar a Pokédex</button>
      </div>
    );
  }

  const hasShinySprite =
    pokemon.sprites?.front_shiny && pokemon.sprites.front_shiny !== pokemon.sprites.front_default;
  const currentSprite = showShiny && hasShinySprite ? pokemon.sprites.front_shiny : pokemon.sprites.front_default;
  const liked = isLiked(pokemon.id);

  return (
    <div className="pokemon-detail">
      <button className="back-btn" onClick={() => navigate('/')}>← Enrere</button>

      <div className="detail-container">
        <div className="detail-header">
          <h1>{pokemon.name.toUpperCase()}</h1>
          <span className="pokemon-id">#{pokemon.id.toString().padStart(4, '0')}</span>
        </div>

        <div className="detail-content">
          <div className="image-section">
            <div className="sprite-container">
              <img src={currentSprite} alt={pokemon.name} className="pokemon-sprite-large" />
            </div>

            {hasShinySprite && (
              <button
                className={`shiny-toggle ${showShiny ? 'active' : ''}`}
                onClick={() => setShowShiny(!showShiny)}
              >
                {showShiny ? 'Normal' : '✨ Veure Shiny'}
              </button>
            )}

            <button
              className={`like-btn-detail ${liked ? 'liked' : ''}`}
              onClick={() => toggleLike(pokemon.id)}
            >
              {liked ? '❤️ En Favorits' : '🤍 Afegir a Favorits'}
            </button>
          </div>

          <div className="info-section">
            {/* Tipos */}
            <div className="detail-group">
              <h3>Tipus</h3>
              <div className="types-list">
                {pokemon.types.map((typeObj) => (
                  <span key={typeObj.type.name} className={`type-badge type-${typeObj.type.name}`}>
                    {typeObj.type.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Altura y Peso */}
            <div className="detail-group">
              <h3>Mesures</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="label">Alçada</span>
                  <span className="value">{pokemon.height / 10}m</span>
                </div>
                <div className="stat-item">
                  <span className="label">Pes</span>
                  <span className="value">{pokemon.weight / 10}kg</span>
                </div>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="detail-group">
              <h3>Estadístiques Base</h3>
              <div className="stats-bars">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="stat-bar">
                    <div className="stat-label">{stat.stat.name}</div>
                    <div className="stat-bar-bg">
                      <div
                        className="stat-bar-fill"
                        style={{
                          width: `${(stat.base_stat / 150) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="stat-value">{stat.base_stat}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Habilidades */}
            <div className="detail-group">
              <h3>Habilitats</h3>
              <div className="abilities-list">
                {pokemon.abilities.map((abilityObj) => (
                  <div key={abilityObj.ability.name} className="ability-item">
                    <span className="ability-name">{abilityObj.ability.name}</span>
                    {abilityObj.is_hidden && <span className="hidden-badge">Oculta</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
