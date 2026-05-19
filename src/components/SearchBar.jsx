import '../styles/SearchBar.css';

const teamStyles = {
  blue: {
    gradient: 'linear-gradient(135deg, #1E90FF 0%, #4169E1 100%)',
    activeButton: '#1E90FF',
  },
  yellow: {
    gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    activeButton: '#FFD700',
  },
  red: {
    gradient: 'linear-gradient(135deg, #FF1744 0%, #FF6E40 100%)',
    activeButton: '#FF1744',
  },
};

export default function SearchBar({ searchTerm, onSearchChange, onShinyFilter, isShinyOnly, selectedType, onTypeChange, types, team }) {
  const styles = teamStyles[team] || teamStyles.red;

  return (
    <div className="search-container" style={{ background: styles.gradient }}>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Busca un Pokémon..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>

      <div className="filters">
        <button
          className={`filter-btn shiny-btn ${isShinyOnly ? 'active' : ''}`}
          onClick={() => onShinyFilter(!isShinyOnly)}
          title="Mostrar només Pokémon Shiny"
          style={{ borderColor: 'white', backgroundColor: isShinyOnly ? 'white' : 'transparent', color: isShinyOnly ? styles.activeButton : 'white' }}
        >
          ✨ Shiny
        </button>

        <select
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
          className="type-select"
          style={{ borderColor: 'white' }}
        >
          <option value="">Tots els tipus</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
