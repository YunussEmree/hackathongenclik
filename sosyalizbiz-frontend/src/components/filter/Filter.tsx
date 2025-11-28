import React from 'react';
import './Filter.css';

const Filter: React.FC = () => {
    return (
        <>
            <div className="select">
                <div className="selected" data-default="All" data-one="option-1" data-two="option-2" data-three="option-3">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className="arrow">
                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                    </svg>
                </div>
                <div className="options">
                    <div title="all">
                        <input id="all" name="option" type="radio" defaultChecked />
                        <label className="option" htmlFor="all" data-txt="All" />
                    </div>
                    <div title="option-1">
                        <input id="option-1" name="option" type="radio" />
                        <label className="option" htmlFor="option-1" data-txt="option-1" />
                    </div>
                    <div title="option-2">
                        <input id="option-2" name="option" type="radio" />
                        <label className="option" htmlFor="option-2" data-txt="option-2" />
                    </div>
                    <div title="option-3">
                        <input id="option-3" name="option" type="radio" />
                        <label className="option" htmlFor="option-3" data-txt="option-3" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Filter;
