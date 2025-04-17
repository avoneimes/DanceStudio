import React, { useEffect, useState } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';

const BrowseClasses = () => {
    const [classes, setClasses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [dayFilter, setDayFilter] = useState('');
    const [instructorFilter, setInstructorFilter] = useState('');

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

    // filtravimas pagal pav, diena, instruktoriu
    const filteredClasses = classes
        .filter(cls =>
            cls.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(cls =>
            dayFilter ? cls.schedule.toLowerCase().includes(dayFilter.toLowerCase()) : true
        )
        .filter(cls =>
            instructorFilter ? cls.instructor.toLowerCase().includes(instructorFilter.toLowerCase()) : true
        );

    return (
        <>
            <Navbar />
            <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
                <h1>Browse Classes</h1>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    marginBottom: '2rem'
                }}>
                    <input
                        placeholder="Search by title (e.g. House)"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        style={{ flex: '1', padding: '0.5rem' }}
                    />
                    <select
                        value={dayFilter}
                        onChange={e => setDayFilter(e.target.value)}
                    >
                        <option value="">All Days</option>
                        <option value="monday">Monday</option>
                        <option value="tuesday">Tuesday</option>
                        <option value="wednesday">Wednesday</option>
                        <option value="thursday">Thursday</option>
                        <option value="friday">Friday</option>
                        <option value="saturday">Saturday</option>
                        <option value="sunday">Sunday</option>
                    </select>
                    <input
                        placeholder="Instructor"
                        value={instructorFilter}
                        onChange={e => setInstructorFilter(e.target.value)}
                        style={{ flex: '1', padding: '0.5rem' }}
                    />
                </div>

                {filteredClasses.map(cls => (
                    <div key={cls._id} className="class-card">
                        <h2>{cls.title}</h2>
                        <p><strong>Instructor:</strong> {cls.instructor}</p>
                        <p><strong>Schedule:</strong> {cls.schedule}</p>
                        <p>{cls.description}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default BrowseClasses;
