import { useTeam } from '../context/TeamContext';
import '../styles/TeamSelection.css';

export default function TeamSelection() {
  const { selectTeam } = useTeam();

  const teams = [
    { id: 'blue', name: 'BLAU', color: '#1E90FF' },
    { id: 'yellow', name: 'GROC', color: '#FFD700' },
    { id: 'red', name: 'VERMELL', color: '#FF1744' },
  ];

  return (
    <div className="team-selection-container">
      <div className="team-selection-content">
        <h1 className="team-title">¡Tria el teu Equip Pokémon!</h1>
        <p className="team-subtitle">Selecciona el color del teu equip per començar</p>

        <div className="teams-grid">
          {teams.map((team) => (
            <button
              key={team.id}
              className={`team-button team-${team.id}`}
              style={{ 
                border: '4px solid black', 
                backgroundColor: 'white',
                boxShadow: `8px 8px 0px ${team.color}`,
                padding: '2rem',
                transition: 'transform 0.1s',
                cursor: 'pointer',
                fontFamily: '"Courier New", Courier, monospace'
              }}
              onClick={() => selectTeam(team.id)}
              onMouseDown={(e) => e.currentTarget.style.transform = 'translate(4px, 4px)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'translate(0px, 0px)'}
            >
              <h2>{team.name}</h2>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
