import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
            <button onClick={handleLogout} style={{ background: 'black', color: 'white', padding: '0.5rem 1rem' }}>
                Atsijungti
            </button>
        </nav>
    );
};

export default Navbar;
