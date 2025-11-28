import React from 'react';
import './Card.css';
import { attendActivity, getCurrentUser } from '../../utils/api';
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
}
const Card: React.FC<CardProps> = ({ id, title, content, personName, currentAttendees, maxAttendees, date, createdAt, place }) => {
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
                            <p>{place}</p>
                        </div>
                    </div>

                    <div className="card-element">

                        <div className='frame'>iframe</div>
                    </div>

                </div>
                <div className="card-button" >
                    <button onClick={() => attendTheEvent(id)}>Etkinliğe Katıl</button>
                </div>

            </div>

        </>

    );
};

function attendTheEvent(activityId: string) {
    getCurrentUser().then(currentuser => {
        attendActivity(activityId, currentuser.id.toString());
    }).catch(error => {
        console.error("Error attending activity:", error);
    });
}   

export default Card;