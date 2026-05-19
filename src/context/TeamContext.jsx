import { createContext, useState, useContext } from 'react';

const TeamContext = createContext();

export function TeamProvider({ children }) {
  const [team, setTeam] = useState(null);
  const [likes, setLikes] = useState(() => {
    const saved = localStorage.getItem('pokemonLikes');
    return saved ? JSON.parse(saved) : [];
  });

  const selectTeam = (teamColor) => {
    setTeam(teamColor);
    localStorage.setItem('selectedTeam', teamColor);
  };

  const toggleLike = (pokemonId) => {
    setLikes((prev) => {
      const newLikes = prev.includes(pokemonId)
        ? prev.filter((id) => id !== pokemonId)
        : [...prev, pokemonId];
      localStorage.setItem('pokemonLikes', JSON.stringify(newLikes));
      return newLikes;
    });
  };

  const isLiked = (pokemonId) => likes.includes(pokemonId);

  return (
    <TeamContext.Provider value={{ team, selectTeam, likes, toggleLike, isLiked }}>
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeam debe usarse dentro de TeamProvider');
  }
  return context;
}
