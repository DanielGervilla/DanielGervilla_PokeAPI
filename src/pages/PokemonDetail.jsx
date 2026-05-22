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

  const statTranslations = {
    hp: 'PS',
    attack: 'Atac',
    defense: 'Defensa',
    'special-attack': 'Atac Esp.',
    'special-defense': 'Defensa Esp.',
    speed: 'Velocitat'
  };

  return (
    <div className="pokemon-detail" style={{ fontFamily: 'monospace' }}>
      <button className="back-btn" onClick={() => navigate('/')} style={{ border: '2px solid black', borderRadius: '0', boxShadow: '3px 3px 0px black', marginBottom: '20px' }}>← TORNAR</button>

      <div className="detail-container" style={{ border: '4px solid black', borderRadius: '0', backgroundColor: '#efefef', boxShadow: '10px 10px 0px rgba(0,0,0,0.2)' }}>
        <div className="detail-header" style={{ borderBottom: '4px solid black', padding: '1rem' }}>
          <h1>{pokemon.name.toUpperCase()}</h1>
          <span className="pokemon-id" style={{ backgroundColor: 'black', color: 'white', padding: '2px 10px' }}>ID: {pokemon.id.toString().padStart(4, '0')}</span>
        </div>

        <div className="detail-content">
          <div className="image-section">
            <div className="sprite-container" style={{ 
              backgroundColor: 'white', 
              backgroundImage: 'linear-gradient(180deg, #fff 0%, #eee 100%)',
              border: '4px solid black', 
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)'
            }}>
              <img src={currentSprite} alt={pokemon.name} className="pokemon-sprite-large" />
            </div>

            {hasShinySprite && (
              <button
                className={`shiny-toggle ${showShiny ? 'active' : ''}`}
                onClick={() => setShowShiny(!showShiny)}
                style={{ border: '2px solid black', borderRadius: '0', marginTop: '10px' }}
              >
                {showShiny ? 'Normal' : '✨ Veure Shiny'}
              </button>
            )}

            <button
              className={`like-btn-detail ${liked ? 'liked' : ''}`}
              onClick={() => toggleLike(pokemon.id)}
              style={{ border: '2px solid black', borderRadius: '0', width: '100%', marginTop: '10px' }}
            >
              {liked ? 'En Favorits' : 'Afegir a Favorits'}
            </button>
          </div>

          <div className="info-section">
            {/* Tipos */}
            <div className="detail-group">
              <h3>Tipus</h3>
              <div className="types-list">
                {pokemon.types.map((typeObj) => (
                  <span key={typeObj.type.name} className={`type-badge type-${typeObj.type.name}`} style={{ borderRadius: '0', border: '1px solid black' }}>
                    {typeObj.type.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Altura y Peso */}
            <div className="detail-group">
              <h3>Mesures</h3>
              <div className="stats-grid">
                <div className="stat-item" style={{ border: '1px solid black', padding: '5px' }}>
                  <span className="label">Alçada</span>
                  <span className="value">{pokemon.height / 10}m</span>
                </div>
                <div className="stat-item" style={{ border: '1px solid black', padding: '5px' }}>
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
                    <div className="stat-label" style={{ fontSize: '0.8rem' }}>{statTranslations[stat.stat.name] || stat.stat.name}</div>
                    <div className="stat-bar-bg" style={{ border: '2px solid black', borderRadius: '0', height: '15px' }}>
                      <div
                        className="stat-bar-fill"
                        style={{
                          backgroundColor: 'black',
                          width: `${(stat.base_stat / 150) * 100}%`,
                          height: '100%'
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
