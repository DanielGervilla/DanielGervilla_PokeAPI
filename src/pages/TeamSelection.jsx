import { useTeam } from '../context/TeamContext';
import '../styles/TeamSelection.css';

export default function TeamSelection() {
  const { selectTeam } = useTeam();

  const teams = [
    { id: 'blue', name: 'Equip Blau', color: '#1E90FF', emoji: '💙' },
    { id: 'yellow', name: 'Equip Groc', color: '#FFD700', emoji: '💛' },
    { id: 'red', name: 'Equip Vermell', color: '#FF1744', emoji: '❤️' },
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
              style={{ borderColor: team.color, backgroundColor: `${team.color}15` }}
              onClick={() => selectTeam(team.id)}
            >
              <span className="team-emoji">{team.emoji}</span>
              <h2>{team.name}</h2>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
