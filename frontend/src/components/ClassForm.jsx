import React, { useState, useEffect } from 'react';
import API from '../api';

const ClassForm = ({ onClassSaved, editData, clearEdit }) => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        instructor: '',
        schedule: '',
    });

    useEffect(() => {
        if (editData) {
            setForm(editData);
        } else {
            setForm({ title: '', description: '', instructor: '', schedule: '' });
        }
    }, [editData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editData) {
                await API.put(`/classes/${editData._id}`, form);
                clearEdit();
            } else {
                await API.post('/classes', form);
            }
            setForm({ title: '', description: '', instructor: '', schedule: '' });
            onClassSaved();
        } catch (err) {
            console.error('Klaida saugant klasę:', err);
        }
    };

    const handleCancel = () => {
        setForm({ title: '', description: '', instructor: '', schedule: '' });
        clearEdit();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Title"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
            />
            <input
                placeholder="Description"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
            />
            <input
                placeholder="Instructor"
                value={form.instructor}
                onChange={e => setForm({ ...form, instructor: e.target.value })}
            />
            <input
                placeholder="Schedule"
                value={form.schedule}
                onChange={e => setForm({ ...form, schedule: e.target.value })}
            />
            <button type="submit">{editData ? 'Update Class' : 'Add Class'}</button>
            {editData && (
                <button type="button" onClick={handleCancel} style={{ marginLeft: '1rem' }}>
                    Cancel
                </button>
            )}
        </form>
    );
};

export default ClassForm;
