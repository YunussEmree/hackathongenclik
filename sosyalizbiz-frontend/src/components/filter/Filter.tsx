import React from 'react';
import './Filter.css';

interface FilterProps {
    onSortChange: (sort: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onSortChange }) => {
    const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSortChange(event.target.id);
    };

    const options = [
        { id: 'none', label: 'Seçiniz', defaultChecked: true },
        { id: 'newestActivity', label: 'En Yeni Oluşturulan Aktiviteler' },
        { id: 'oldestActivity', label: 'En Eski Oluşturulan Aktiviteler' },
        { id: 'closestActivity', label: 'En Yakın Sürede Başlayacak Aktiviteler' },
        { id: 'furthestActivity', label: 'En Geç Sürede Başlayacak Aktiviteler' }
    ];

    return (
        <>
            <div className="select">
                <div className="selected" data-default="Seçiniz" data-one="En Yeni Oluşturulan Aktivite" data-two="En Eski Oluşturulan Aktivite" data-three="En Kısa Sürede Başlayacak Aktivite" data-four="En Geç Sürede Başlayacak Aktivite" data-five="Önerilen Aktiviteler">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className="arrow">
                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                    </svg>
                </div>
                <div className="options">
                    {options.map((option) => (
                        <div title={option.label} key={option.id}>
                            <input 
                                id={option.id} 
                                name="option" 
                                type="radio" 
                                defaultChecked={option.defaultChecked} 
                                onChange={handleSortChange} 
                            />
                            <label className="option" htmlFor={option.id} data-txt={option.label} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Filter;
