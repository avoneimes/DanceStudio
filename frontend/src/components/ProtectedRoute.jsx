import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext); // ar prisijunges vartotojas
    if (!user) {
        return <Navigate to="/login" />; // jei ne, nukreipiama i login
    }
    return children; // jei taip, rodomas puslapis
};

export default ProtectedRoute;
