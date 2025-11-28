import React from 'react';
import './Card.css';
interface person {
    name: string;
}
interface CardProps {
    id: string;
    title: string;
    person: person;
    currentAttendees: number;
    maxAttendees: number;
    date: Date;
    createdAt: Date;
    content: string;
    place: string;
}
const Card: React.FC<CardProps> = ({ title, content, person, currentAttendees, maxAttendees, date, createdAt, place }) => {
    return (
        <>
            <div className="card" >
                <div className="card-header">
                    <h2>{title}</h2>
                    <h3>{person.name}</h3>
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
                            <h4>Tarih</h4>
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
                    <button>Etkinliğe Katıl</button>
                </div>

            </div>

        </>

    );
};
export default Card;