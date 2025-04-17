import React, { useEffect, useState } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const groupByDay = (classes) => { // grupuoja klases pagal diena
    const grouped = {};
    for (const day of daysOfWeek) { // kiekviena savaites diena kaip tuscias masyvas
        grouped[day] = [];
    }

    // kiekviena klase priskiriama i savo diena
    classes.forEach(cls => {
        const day = cls.schedule.split(' ')[0]; // pvz. Monday 18:00
        if (grouped[day]) {
            grouped[day].push(cls);
        }
    });

    return grouped;
};

const Schedule = () => {
    const [groupedClasses, setGroupedClasses] = useState({}); // klasiu grupavimas pagal dienas

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                // uzklausa i serveri gauti visas klases
                const res = await API.get('/classes');
                const grouped = groupByDay(res.data); // grupavimas pagal sav dienas
                setGroupedClasses(grouped);
            } catch (err) {
                console.error('Klaida gaunant tvarkaraštį:', err);
            }
        };

        fetchClasses(); // duomenu uzkrovimas
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
