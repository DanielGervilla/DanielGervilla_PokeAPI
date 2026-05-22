import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useTeam } from '../context/TeamContext';
import { getPokemonByName } from '../api/api';
import PokemonCard from '../components/PokemonCard';
import '../styles/Favorites.css';

export default function Favorites() {
  const navigate = useNavigate();
  const { likes, toggleLike } = useTeam();
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        if (!likes || likes.length === 0) {
          setPokemons([]);
          return;
        }

        const requests = likes.map((id) => getPokemonByName(id));
        const results = await Promise.all(requests);
        setPokemons(results);
      } catch (err) {
        console.error('Error carregant favorits', err);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [likes]);

  if (loading) return <div className="loading">Carregant favorits...</div>;

  return (
    <section className="favorites-section">
      <h2 className="section-title" style={{ textAlign: 'center', textTransform: 'uppercase', marginBottom: '30px', fontWeight: 'bold' }}>ELS MEUS FAVORITS</h2>

      {pokemons.length === 0 ? (
        <div className="no-favs">
          <p>No tens cap Pokémon als favorits.</p>
          <p>Afegeix-ne fent clic a "Afegir" a les fitxes.</p>
        </div>
      ) : (
        <div className="grid">
          {pokemons.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-card-wrapper" onClick={() => navigate(`/pokemon/${pokemon.name}`)}>
              <PokemonCard pokemon={pokemon} onLikeClick={toggleLike} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
