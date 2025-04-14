// src/pages/Schedule.jsx
import React, { useEffect, useState } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const groupByDay = (classes) => {
    const grouped = {};
    for (const day of daysOfWeek) {
        grouped[day] = [];
    }

    classes.forEach(cls => {
        const day = cls.schedule.split(' ')[0]; // pvz. "Monday 18:00"
        if (grouped[day]) {
            grouped[day].push(cls);
        }
    });

    return grouped;
};

const Schedule = () => {
    const [groupedClasses, setGroupedClasses] = useState({});

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const res = await API.get('/classes');
                const grouped = groupByDay(res.data);
                setGroupedClasses(grouped);
            } catch (err) {
                console.error('Klaida gaunant tvarkaraštį:', err);
            }
        };

        fetchClasses();
    }, []);

    return (
        <>
            <Navbar />
            <div style={{ padding: '2rem' }}>
                <h1>Weekly Schedule</h1>
                {daysOfWeek.map(day => (
                    <div key={day} style={{ marginBottom: '2rem' }}>
                        <h2>{day}</h2>
                        {groupedClasses[day]?.length > 0 ? (
                            groupedClasses[day].map(cls => (
                                <div key={cls._id} className="class-card">
                                    <h3>{cls.title}</h3>
                                    <p><strong>Time:</strong> {cls.schedule}</p>
                                    <p><strong>Instructor:</strong> {cls.instructor}</p>
                                    <p>{cls.description}</p>
                                </div>
                            ))
                        ) : (
                            <p>No classes</p>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Schedule;
