import React, { useState, useEffect } from 'react';
import './HomePage.css';
import NavbarPage from '../components/navbar/Navbar.tsx';
import Card from '../components/card/Card.tsx';
import Filter from '../components/filter/Filter.tsx';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { getActivities } from '../utils/api.ts';
import type { Activity } from '../types/api';
import chatbotlogo from '../assets/chatbotlogo.jpg';
import Chatbot from '../components/chatbot/modal.tsx';


const HomePage: React.FC = () => {
    const [modal, setModal] = useState(false);
    const [icon, setIcon] = useState(true);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [currentSort, setCurrentSort] = useState<string | undefined>(undefined);

    const fetchActivities = async () => {
        try {
            const data = await getActivities(currentSort);
            setActivities(data);
        } catch (error) {
            console.error("Error fetching activities:", error);
        }
    };

    const handleShow = async () => { console.log("a"); setModal(true); setIcon(false) }

    useEffect(() => {
        fetchActivities();
    }, [currentSort]);

    const handleSortChange = (sort: string) => {
        setCurrentSort(sort);
    };

    return (
        <div className='container'>
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
                <div className={`ikon ${icon ? "Show" : ""}`} onClick={() => { console.log("a"); setModal(true); setIcon(false) }}>
                    <img src={chatbotlogo} alt="chatbot logo" className='chatbot-logo' />
                </div>

                <div className={`chatbot-modal ${modal ? "Show" : ""}`}>
                    <Chatbot />
                </div>

            </div>


        </div>
    );
};




export default HomePage;

