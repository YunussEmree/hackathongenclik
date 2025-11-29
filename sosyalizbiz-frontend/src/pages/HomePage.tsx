import React, { useState, useEffect } from 'react';
import './HomePage.css';
import NavbarPage from '../components/navbar/Navbar.tsx';
import Card from '../components/card/Card.tsx';
import Filter from '../components/filter/Filter.tsx';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { getActivities } from '../utils/api.ts';
import type { Activity } from '../types/api';


const HomePage: React.FC = () => {
    const [activities, setActivities] = useState<Activity[]>([]);

    const fetchActivities = async () => {
        try {
            const data = await getActivities();
            setActivities(data);
        } catch (error) {
            console.error("Error fetching activities:", error);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    return (
        <div className='container'>
            <NavbarPage />
            <div className="dynamicIsland ">
                <div className="search-bar">
                    <FaMagnifyingGlass />

                    <input type="text" placeholder="Etkinlik Ara..." />
                </div>
                <div className="filter">
                    <Filter />
                </div>
            </div>

            <div className='cards'> 
                {activities.map(activity => (
                <Card
                    key ={activity.id}
                    id={activity.id}
                    title={activity.title}
                    personName={activity.personName}
                    currentAttendees={activity.currentAttendees}
                    maxAttendees={activity.maxAttendees}
                    date={new Date(activity.date)}
                    createdAt={new Date(activity.createdAt)}
                    content={activity.description}
                    place={activity.location}
                    onAttend={fetchActivities}
                />
                ))}


            </div>

        </div>
    );
};




export default HomePage;

