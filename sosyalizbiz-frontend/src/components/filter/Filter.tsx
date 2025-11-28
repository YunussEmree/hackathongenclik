import React from 'react';
import './Filter.css';

const Filter: React.FC = () => {
    return (
        <>
            <div className="select">
                <div className="selected" data-default="Seçiniz" data-one="En Yeni Oluşturulan Aktivite" data-two="En Eski Oluşturulan Aktivite" data-three="En Kısa Sürede Başlayacak Aktivite" data-four="En Geç Sürede Başlayacak Aktivite">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className="arrow">
                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                    </svg>
                </div>
                <div className="options">
                    <div title="Seçiniz">
                        <input id="none" name="option" type="radio" defaultChecked />
                        <label className="option" htmlFor="none" data-txt="Seçiniz" />
                    </div>
                    <div title="En Yeni Oluşturulan Aktivite">
                        <input id="newestActivity" name="option" type="radio" defaultChecked />
                        <label className="option" htmlFor="newestActivity" data-txt="En Yeni Oluşturulan Aktivite" />
                    </div>
                    <div title="En Eski Oluşturulan Aktivite">
                        <input id="oldestActivity" name="option" type="radio" />
                        <label className="option" htmlFor="oldestActivity" data-txt="En Eski Oluşturulan Aktivite" />
                    </div>
                    <div title="En Yakın Sürede Başlayacak Aktivite">
                        <input id="closestActivity" name="option" type="radio" />
                        <label className="option" htmlFor="closestActivity" data-txt="En Yakın Sürede Başlayacak Aktivite" />
                    </div>
                    <div title="En Geç Sürede Başlayacak Aktivite">
                        <input id="furthestActivity" name="option" type="radio" />
                        <label className="option" htmlFor="furthestActivity" data-txt="En Geç Sürede Başlayacak Aktivite" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Filter;
