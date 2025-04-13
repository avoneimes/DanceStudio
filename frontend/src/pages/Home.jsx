import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{
            textAlign: 'center',
            paddingTop: '3rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <h1>Welcome to the Dance Class Management System</h1>
            <p>Please login or register to manage your dance classes.</p>
            <div style={{ marginTop: '2rem' }}>
                <Link to="/login">
                    <button style={{ marginRight: '1rem' }}>Login</button>
                </Link>
                <Link to="/register">
                    <button>Register</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
