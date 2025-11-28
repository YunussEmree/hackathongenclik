import React from 'react';
import './HomePage.css';
import Card from '../components/card/Card.tsx';
import { getActivities } from '../utils/api.ts';


const activities = await getActivities();


const HomePage: React.FC = () => {

    return (
        <div className='container'>
            <div className="navbar"></div>

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

                />
                ))}


            </div>

        </div>
    );
};




export default HomePage;

