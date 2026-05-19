import { useTeam } from '../context/TeamContext';
import { Outlet } from "react-router";
import '../styles/MainLayout.css';

const backgroundGradients = {
  blue: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
  yellow: 'linear-gradient(135deg, #FFFDE7 0%, #FFF9C4 100%)',
  red: 'linear-gradient(135deg, #FFEBEE 0%, #FFCCDD 100%)',
};

export default function MainLayout() {
  const { team, selectTeam } = useTeam();

  const teamColors = {
    blue: '#1E90FF',
    yellow: '#FFD700',
    red: '#FF1744',
  };

  return (
    <div className="main-layout" style={{ background: backgroundGradients[team] }}>
      <header className="header" style={{ borderBottomColor: teamColors[team] }}>
        <div className="header-content">
          <h1 className="logo">🎮 Pokédex</h1>
          <button 
            className="team-change-btn"
            onClick={() => selectTeam(null)}
            style={{ backgroundColor: teamColors[team] }}
            title="Canviar d'equip"
          >
            Canviar equip
          </button>
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
