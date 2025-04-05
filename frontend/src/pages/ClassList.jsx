import React, { useEffect, useState } from 'react';
import API from '../api';

const ClassList = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        API.get('/classes').then(res => setClasses(res.data));
    }, []);

    return (
        <div>
            <h1>Dance Classes</h1>
            {classes.map(cls => (
                <div key={cls._id}>
                    <h2>{cls.title}</h2>
                    <p>{cls.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ClassList;
