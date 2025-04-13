import React, { useState, useContext } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', form);
            // Paduodame user + token
            login({ ...res.data.user, token: res.data.token });
            navigate('/classes'); // redirect to ClassList
        } catch (err) {
            alert('Prisijungimo klaida');
            console.error('Prisijungimo klaida:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Username"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
            />
            <button type="submit">Prisijungti</button>
        </form>
    );
};

export default Login;
