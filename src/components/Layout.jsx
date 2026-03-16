import { NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/learn', label: 'Learn', icon: '📘' },
  { to: '/tools', label: 'Tools', icon: '🧰' },
  { to: '/notes', label: 'Notes', icon: '📝' },
  { to: '/about', label: 'About', icon: 'ℹ️' },
];

export const Layout = ({ children, onSearch }) => {
  const location = useLocation();

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <h1>Sorad</h1>
          <p>Radiation Oncology Learning Companion</p>
        </div>
        <input
          className="search-input"
          placeholder="Global search atlas, terms, guide, OAR, cards..."
          onChange={(e) => onSearch(e.target.value, location.pathname)}
        />
      </header>
      <main className="main-content">{children}</main>
      <nav className="bottom-nav">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <span>{item.icon}</span>
            <small>{item.label}</small>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
