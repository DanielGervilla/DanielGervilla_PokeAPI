import '../styles/SearchBar.css';

const teamStyles = {
  blue: {
    accent: '#2563eb',
    soft: '#eff6ff',
  },
  yellow: {
    accent: '#d97706',
    soft: '#fffbeb',
  },
  red: {
    accent: '#dc2626',
    soft: '#fef2f2',
  },
};

export default function SearchBar({ searchTerm, onSearchChange, onShinyFilter, isShinyOnly, selectedType, onTypeChange, types, team, isFavoritesOnly, onFavoritesFilter, favoritesCount }) {
  const theme = teamStyles[team] || teamStyles.red;

  return (
    <div className="modern-search-wrapper">
      <div className="search-input-group">
        <input
          type="text"
          placeholder="A qui busques avui?"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
          style={{ 
            border: '3px solid black', 
            borderRadius: '0',
            fontFamily: 'monospace'
          }}
        />
        {/* Icono de búsqueda puede ser un SVG o un emoji dentro del input o como un elemento separado */}
        {/* <span className="search-icon">🔍</span> */}
      </div>

      <div className="filters" style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
        <button
          onClick={() => onFavoritesFilter(!isFavoritesOnly)}
          className={`chip-btn ${isFavoritesOnly ? 'active' : ''}`}
          style={{
            backgroundColor: isFavoritesOnly ? theme.accent : 'white',
            color: isFavoritesOnly ? 'white' : theme.accent,
            border: '2px solid black',
            borderRadius: '0',
            boxShadow: '3px 3px 0px black',
            fontWeight: 'bold',
            padding: '8px 15px'
          }}
        >
          ❤️ Favorits ({favoritesCount})
        </button>

        <button
          onClick={() => onShinyFilter(!isShinyOnly)}
          className={`chip-btn ${isShinyOnly ? 'active' : ''}`}
          style={{
            backgroundColor: isShinyOnly ? theme.accent : 'white',
            color: isShinyOnly ? 'white' : theme.accent,
            border: '2px solid black',
            borderRadius: '0',
            boxShadow: '3px 3px 0px black',
            fontWeight: 'bold',
            padding: '8px 15px'
          }}
        >
          ✨ Shiny
        </button>

        <select
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
          className="type-select"
          style={{
            border: '2px solid black',
            borderRadius: '0',
            backgroundColor: 'white',
            color: 'black',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            padding: '8px 15px',
            height: '40px',
            boxShadow: '3px 3px 0px black'
          }}
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
