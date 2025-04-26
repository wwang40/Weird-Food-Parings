import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container flex justify-between align-center" style={{ padding: '20px 0' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'var(--primary-color)', marginBottom: 0 }}>Weird Food Pairings</h1>
        </Link>
        <Link to="/create">
          <button className="secondary">Share Your Creation</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;