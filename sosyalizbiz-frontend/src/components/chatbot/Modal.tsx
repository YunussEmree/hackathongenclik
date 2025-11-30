import AppName from './AppName';
import Button from './Button';
import Chat from './Chat';
import Headers from './Headers';
import SearchBar from './SearchBar';
import { useState } from 'react';
import './Modal.css';

const Modal = () => {
    const [inputValue, setInputValue] = useState('');
    const [chatMessages, setChatMessages] = useState<string[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    const handleSend = () => {
        if (inputValue.trim() === '') return;
        setChatMessages([...chatMessages, inputValue]);
        setInputValue('');
    };

    return (
        <>
            <AppName>
                <div id='head' >
                    <span className='head'>SosyalizBiz </span>ChatBot
                </div>
            </AppName>
            <div>
                <Headers>
                    <div>
                        <h1 id='greeting'>Merhaba, Hoşgeldin.</h1>
                    </div>
                    <div>
                        <h3 id='greetingmessage'>Bugün Nasıl Yardımcı Olabilirim?</h3>
                    </div>
                </Headers>
            </div>
            <div className="chat-container">
                <Chat >
                    {chatMessages.map((message, index) => (
                        <div key={index} className="chat-message">
                            {message}
                        </div>
                    ))}
                </Chat>
            </div>
            <div className="searchBar-container">
                <SearchBar>
                    <textarea
                        className="search-input"
                        placeholder="Enter your text"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <Button textContent="Send" handleClick={handleSend} />
                </SearchBar>
            </div>
        </>
    );
};

export default Modal;