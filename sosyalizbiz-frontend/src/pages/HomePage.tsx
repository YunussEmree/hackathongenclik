import React from 'react';
import './HomePage.css';
import Card from '../components/card/Card.tsx';

const HomePage: React.FC = () => {
    return (
    <>
        <div className="navbar"></div>
        <div className='cards'>
            <Card
                id="1"
                title="Etkinlik 1"
                person={{ name: "Ali Veli" }}
                currentAttendees={10}
                maxAttendees={20}
                date={new Date('2024-07-01')}
                createdAt={new Date('2024-06-15T10:00:00')}
                content="Bu etkinlik hakkında kısa bir açıklama."
                place="İstanbul"
            />

            <Card
                id="2"
                title="Etkinlik 2"
                person={{ name: "kırkdokuzelli" }}
                currentAttendees={3}
                maxAttendees={5}
                date={new Date('2024-07-01')}
                createdAt={new Date('2024-06-15T10:00:00')}
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ."
                place="Ankara"
            />

            <Card
                id="3"
                title="Voleybol Turnuvası"
                person={{ name: "Emir Enes Akalın" }}
                currentAttendees={5}
                maxAttendees={10}
                date={new Date('2024-07-01')}
                createdAt={new Date('2024-06-15T10:00:00')}
                content="ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae d."
                place="Antalya"
            />

            <Card
                id="4"
                title="Golf Turnuvası"
                person={{ name: "Göktuğ Berke" }}
                currentAttendees={1}
                maxAttendees={25}
                date={new Date('2024-07-01')}
                createdAt={new Date('2024-06-15T10:00:00')}
                content="But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure,"
                place="Akdeniz Üniversitesi"
            />
        </div>
        
    </>
    );
};

export default HomePage;

