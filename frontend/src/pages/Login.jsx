import React, { useState, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [form, setForm] = useState({ username: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await API.post('/auth/login', form);
        login(res.data.token);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
            <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
