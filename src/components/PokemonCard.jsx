import { useTeam } from '../context/TeamContext';
import '../styles/PokemonCard.css';

export default function PokemonCard({ pokemon, onLikeClick }) {
  const { isLiked } = useTeam();
  const liked = isLiked(pokemon.id);

  const hasShinySprite =
    pokemon.sprites?.front_shiny && pokemon.sprites.front_shiny !== pokemon.sprites.front_default;

  return (
    <div className="pokemon-card">
      <div className="pokemon-image">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="pokemon-sprite"
        />
        {hasShinySprite && <span className="shiny-badge">✨ Shiny</span>}
      </div>

      <div className="pokemon-info">
        <h3 className="pokemon-name">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h3>

        <div className="pokemon-types">
          {pokemon.types.map((typeObj) => (
            <span
              key={typeObj.type.name}
              className={`type-badge type-${typeObj.type.name}`}
            >
              {typeObj.type.name}
            </span>
          ))}
        </div>

        <button
          className={`like-btn ${liked ? 'liked' : ''}`}
          onClick={() => onLikeClick(pokemon.id)}
          title={liked ? 'Treure de favorits' : 'Afegir a favorits'}
        >
          {liked ? '❤️' : '🤍'} {liked ? 'Favorit' : 'Afegir'}
        </button>
      </div>
    </div>
  );
}
