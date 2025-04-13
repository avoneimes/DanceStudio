import React, { useEffect, useState } from 'react';
import API from '../api';
import ClassForm from '../components/ClassForm';
import Navbar from '../components/Navbar';

const ClassList = () => {
    const [classes, setClasses] = useState([]);
    const [editingClass, setEditingClass] = useState(null);

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const res = await API.get('/classes');
            setClasses(res.data);
        } catch (err) {
            console.error('Klaida gaunant klases:', err);
        }
    };

    const handleEdit = (cls) => {
        setEditingClass(cls);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this class?')) {
            try {
                await API.delete(`/classes/${id}`);
                fetchClasses();
            } catch (err) {
                console.error('Klaida tryniant klasę:', err);
            }
        }
    };

    const clearEdit = () => setEditingClass(null);

    return (
        <>
            <Navbar />
            <div style={{ padding: '2rem' }}>
                <h1>Dance Classes</h1>
                <ClassForm
                    onClassSaved={fetchClasses}
                    editData={editingClass}
                    clearEdit={clearEdit}
                />
                {classes.map(cls => (
                    <div
                        key={cls._id}
                        style={{
                            border: '1px solid white',
                            margin: '1rem 0',
                            padding: '1rem',
                            textAlign: 'left'
                        }}
                    >
                        <h2>{cls.title}</h2>
                        <p>{cls.description}</p>
                        <p><strong>Instructor:</strong> {cls.instructor}</p>
                        <p><strong>Schedule:</strong> {cls.schedule}</p>
                        <button
                            onClick={() => handleEdit(cls)}
                            style={{ backgroundColor: 'orange', color: 'white', marginRight: '1rem' }}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(cls._id)}
                            style={{ backgroundColor: 'darkred', color: 'white' }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ClassList;
