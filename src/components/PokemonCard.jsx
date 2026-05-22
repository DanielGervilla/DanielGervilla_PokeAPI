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
    <div className="pokemon-card" style={{ border: '3px solid #000', boxShadow: '5px 5px 0px #000', borderRadius: '0', backgroundColor: '#efefef' }}>
      <div className="pokemon-image" style={{ 
        backgroundColor: 'white', 
        backgroundImage: 'linear-gradient(180deg, #ddd 0%, #fff 100%)',
        borderBottom: '3px solid #000', 
        margin: '5px', 
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)'
      }}>
        <img
          src={displaySprite}
          alt={pokemon.name}
          className="pokemon-sprite"
        />
      </div>

      <div className="pokemon-info">
        <h3 className="pokemon-name" style={{ fontFamily: 'monospace', fontWeight: '900', textTransform: 'uppercase', color: 'black' }}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h3>

        <div className="pokemon-types">
          {pokemon.types.map((typeObj) => (
            <span
              key={typeObj.type.name}
              className={`type-badge type-${typeObj.type.name}`}
              style={{ borderRadius: '0', border: '1px solid black', fontSize: '0.7rem' }}
            >
              {typeObj.type.name}
            </span>
          ))}
          {hasShinySprite && (
            <span className="type-badge shiny-tag" style={{ borderRadius: '0', border: '1px solid black', fontSize: '0.7rem', backgroundColor: '#ffd700', color: 'black' }}>
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
            borderRadius: '0', 
            border: '2px solid black', 
            boxShadow: liked ? 'none' : '2px 2px 0px black',
            transform: liked ? 'translate(1px, 1px)' : 'none'
          }}
        >
          {liked ? 'Favorit' : 'Afegir'}
        </button>
      </div>
    </div>
  );
}
