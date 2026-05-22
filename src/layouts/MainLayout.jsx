import { useTeam } from '../context/TeamContext';
import { Outlet } from "react-router";
import '../styles/MainLayout.css';

const backgroundGradients = {
  blue: '#121212', // Fondo general oscuro
  yellow: '#121212',
  red: '#121212',
};

export default function MainLayout() {
  const { team, selectTeam } = useTeam();

  const teamColors = {
    blue: '#3b82f6',
    yellow: '#eab308',
    red: '#ef4444',
  };

  return (
    <div className="main-layout" style={{ backgroundColor: backgroundGradients[team], minHeight: '100vh', fontFamily: '"Courier New", Courier, monospace' }}>
      <header className="header" style={{ backgroundColor: '#111111', padding: '1rem 0', boxShadow: '0 4px 15px rgba(0,0,0,0.5)', position: 'sticky', top: 0, zIndex: 1000, borderBottom: `4px solid ${teamColors[team] || '#000'}` }}>
        <div className="header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem', maxWidth: '1126px', margin: '0 auto' }}>
          <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="pokeball-icon" style={{ width: '24px', height: '24px', backgroundColor: '#FFFFFF', borderRadius: '50%', display: 'inline-block', border: '2px solid #333' }}></span>
            <h1 className="logo" style={{ fontWeight: '900', letterSpacing: '2px', color: '#FFFFFF', margin: 0, fontSize: '1.6rem', textShadow: 'none' }}>POKÉDEX</h1>
          </div>
          <div className="team-selector">
            <button 
              className="team-change-btn"
              onClick={() => selectTeam(null)}
              style={{ 
                border: '2px solid white',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'white',
                fontWeight: '700',
                padding: '6px 15px',
                borderRadius: '30px',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Canviar Equip
            </button>
          </div>
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
