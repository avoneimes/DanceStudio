import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', form);
            alert('Registracija sėkminga! Dabar galite prisijungti.');
            navigate('/login'); // 🔁 po registracijos -> login
        } catch (err) {
            alert('Klaida registruojantis');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registracija</h2>
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
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
