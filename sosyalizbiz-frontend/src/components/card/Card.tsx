import React, { useState } from 'react';
import './Card.css';
import { attendActivity, getCurrentUser, getLocation } from '../../utils/api';

interface CardProps {
    id: string;
    title: string;
    personName: string;
    currentAttendees: number;
    maxAttendees: number;
    date: Date;
    createdAt: Date;
    content: string;
    place: string;
    onAttend: () => void;
}
const Card: React.FC<CardProps> = ({ id, title, content, personName, currentAttendees, maxAttendees, date, createdAt, place, onAttend }) => {


    const handleLocation = () => {
        const placeUrl = fetchLocationUrl();
        console.log(placeUrl);
        window.open(placeUrl as unknown as string, '_blank');
    };


    const [location, setLocation] = useState<string>(String);

    const fetchLocationUrl = async () => {
        try {
            const data = await getLocation(location);
            setLocation(data);

            console.log(data);
        } catch (error) {
            console.error("Error fetching activities:", error);
        }
    };

    const handleAttend = () => {
        getCurrentUser().then(currentuser => {
            attendActivity(id, currentuser.id.toString()).then(() => {
                onAttend();
            });
        }).catch(error => {
            console.error("Error attending activity:", error);
        });
    };


    return (
        <>
            <div className="card" >
                <div className="card-header">
                    <h2>{title}</h2>
                    <h3>{personName}</h3>
                </div>
                <div className="card-content">
                    <div className="card-element">
                        <div className='card-label'>
                            <h4>Kontenjan</h4>
                        </div>
                        <div className="card-value">
                            <p>{currentAttendees} / {maxAttendees}</p>
                        </div>
                    </div>

                    <div className="card-element">
                        <div className='card-label'>
                            <h4>Etkinlik Tarihi</h4>
                        </div>
                        <div className="card-value">
                            <p>{date.toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="card-element">
                        <div className='card-label'>
                            <h4>Açıklama</h4>
                        </div>
                        <div className="card-value">
                            <p>{content}</p>
                        </div>
                    </div>

                    <div className="card-element">
                        <div className='card-label'>
                            <h4>Oluşturulma Tarihi</h4>
                        </div>
                        <div className="card-value">
                            <p>{createdAt.toLocaleTimeString()}</p>
                        </div>
                    </div>

                    <div className="card-element">
                        <div className='card-label'>
                            <h4>Yer</h4>
                        </div>
                        <div className="card-value">
                            <p onClick={handleLocation}>{place}</p>
                        </div>
                    </div>


                </div>
                <div className="card-button" >
                    <button onClick={handleAttend}>Etkinliğe Katıl</button>
                </div>

            </div>

        </>

    );
};

export default Card;