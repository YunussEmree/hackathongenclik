import React, { useEffect, useState } from 'react';
import './HomePage.css';
import NavbarPage from '../components/navbar/Navbar.tsx';
import Card from '../components/card/Card.tsx';
import Filter from '../components/filter/Filter.tsx';
import ErrorToast from '../components/errortoast/ErrorToast.tsx';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { getActivities } from '../utils/api.ts';
import type { Activity } from '../types/api';


const HomePage: React.FC = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [currentSort, setCurrentSort] = useState<string | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchActivities = async () => {
        try {
            const data = await getActivities(currentSort);
            setActivities(data);
            setErrorMessage(null);
        } catch (error) {
            console.error("Error fetching activities:", error);
            setErrorMessage(error instanceof Error ? error.message : "Etkinlikler getirilirken bir sorun olustu.");
        }
    };


    useEffect(() => {
        fetchActivities();
    }, [fetchActivities]);

    const handleSortChange = (sort: string) => {
        setCurrentSort(sort);
    };

    return (
        <div className='container'>
            {errorMessage ? (
                <ErrorToast message={errorMessage} onClose={() => setErrorMessage(null)} />
            ) : null}
            <NavbarPage />
            <div className="dynamicIsland ">
                <div className="search-bar">
                    <FaMagnifyingGlass className='magnifier' />

                    <input type="text" placeholder="Etkinlik Ara..." />
                </div>
                <div className="filter">
                    <Filter onSortChange={handleSortChange} />
                </div>
            </div>

            <div className='cards'>
                {activities.map(activity => (
                    <Card
                        key={activity.id}
                        id={activity.id}
                        title={activity.title}
                        personName={activity.personName}
                        currentAttendees={activity.currentAttendees}
                        maxAttendees={activity.maxAttendees}
                        date={new Date(activity.activityDate)}
                        createdAt={new Date(activity.createdDate)}
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

