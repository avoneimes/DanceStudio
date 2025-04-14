import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem'
        }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/classes" style={{ color: 'white' }}>Classes</Link>
                <Link to="/schedule" style={{ color: 'white' }}>Schedule</Link>
                <Link to="/browse" style={{ color: 'white' }}>Browse</Link>
            </div>
            <button
                onClick={handleLogout}
                style={{ background: 'black', color: 'white', padding: '0.5rem 1rem' }}
            >
                Atsijungti
            </button>
        </nav>
    );
};

export default Navbar;
