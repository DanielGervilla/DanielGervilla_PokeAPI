import { useTeam } from '../context/TeamContext';
import '../styles/PokemonCard.css';

export default function PokemonCard({ pokemon, onLikeClick, isShinyOnly }) {
  const { isLiked, team } = useTeam();
  const liked = isLiked(pokemon.id);

  const teamColors = {
    blue: '#3b82f6',
    yellow: '#eab308',
    red: '#ef4444',
  };
  const accentColor = teamColors[team] || '#ef4444';

  const hasShinySprite =
    pokemon.sprites.front_shiny && pokemon.sprites.front_shiny !== pokemon.sprites.front_default;

  // Mostramos el sprite shiny si el filtro está activo, si no el normal
  const displaySprite = isShinyOnly && hasShinySprite ? pokemon.sprites.front_shiny : pokemon.sprites.front_default;

  return (
    <div 
      className="pokemon-card" 
      style={{ 
        border: '4px solid #000', 
        boxShadow: '6px 6px 0px #000', 
        borderRadius: '0', 
        backgroundColor: '#fff',
        transition: 'all 0.2s ease'
      }}>
      <div className="pokemon-image" style={{ 
        backgroundColor: 'white', 
        backgroundImage: 'linear-gradient(180deg, #ddd 0%, #fff 100%)',
        borderBottom: '4px solid #000', 
        padding: '10px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <img
          src={displaySprite}
          alt={pokemon.name}
          className="pokemon-sprite"
        />
      </div>

      <div className="pokemon-info">
        <h3 className="pokemon-name" style={{ fontFamily: 'monospace', fontWeight: '900', textTransform: 'uppercase', color: 'black', margin: '10px 0', fontSize: '1.2rem' }}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h3>

        <div className="pokemon-types">
          {pokemon.types.map((typeObj) => (
            <span
              key={typeObj.type.name}
              className={`type-badge type-${typeObj.type.name}`}
              style={{ borderRadius: '0', border: '2px solid black', fontSize: '0.7rem', fontWeight: 'bold' }}
            >
              {typeObj.type.name.toUpperCase()}
            </span>
          ))}
          {hasShinySprite && (
            <span className="type-badge shiny-tag" style={{ borderRadius: '0', border: '2px solid black', fontSize: '0.7rem', backgroundColor: '#ffd700', color: 'black', fontWeight: 'bold' }}>
              ✨ SHINY
            </span>
          )}
        </div>

        <button
          className={`like-btn ${liked ? 'liked' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onLikeClick(pokemon.id);
          }}
          style={{ 
            width: '100%',
            marginTop: '10px',
            borderRadius: '0', 
            border: '3px solid black', 
            boxShadow: liked ? 'none' : '4px 4px 0px black',
            transform: liked ? 'translate(2px, 2px)' : 'none',
            backgroundColor: liked ? '#ff5555' : '#55ff55',
            color: 'black',
            fontWeight: '900',
            cursor: 'pointer'
          }}
        >
          {liked ? '❤️ FAVORIT' : '➕ AFEGIR'}
        </button>
      </div>
    </div>
  );
}
