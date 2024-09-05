import './App.css';
import React, { useState, useEffect } from 'react'

const paths = {
    start: [
        { id: 'path1', text: 'Path 1', next: 'path1-options' },
        { id: 'path2', text: 'Path 2', next: 'path2-options' }
    ],
    'path1-options': [
        { id: 'path1a', text: 'Option 1A', next: 'end' },
        { id: 'path1b', text: 'Option 1B', next: 'end' }
    ],
    'path2-options': [
        { id: 'path2a', text: 'Option 2A', next: 'end' },
        { id: 'path2b', text: 'Option 2B', next: 'end' }
    ]
};

function App(){
    const [currentPath, setCurrentPath] = useState('start');
    const [selectedChoices, setSelectedChoices] = useState([]);

    const handleCardClick = (nextPath, choice) => {
        setSelectedChoices([...selectedChoices, choice]);
        setCurrentPath(nextPath);
    };

    useEffect(() => {
        const savedPath = localStorage.getItem('currentPath');
        const savedChoices = localStorage.getItem('selectedChoices');

        if (savedPath) setCurrentPath(savedPath);
        if (savedChoices) setSelectedChoices(JSON.parse(savedChoices));
    }, []);

    useEffect(() => {
        localStorage.setItem('currentPath', currentPath);
        localStorage.setItem('selectedChoices', JSON.stringify(selectedChoices));
    }, [currentPath, selectedChoices]);

    const resetPath = () => {
        setCurrentPath('start');
        setSelectedChoices([]);
        localStorage.removeItem('currentPath');
        localStorage.removeItem('selectedChoices');
    };

    return (
        <div className="App">
            <h1>Choose Your Path</h1>
            <div className="card-container">
                {paths[currentPath]?.map((option) => (
                    <div
                        key={option.id}
                        className="card"
                        onClick={() => handleCardClick(option.next, option.text)}
                    >
                        {option.text}
                    </div>
                ))}
            </div>

            {currentPath === 'end' && (
                <div>
                    <h2>Your Journey</h2>
                    <ul>
                        {selectedChoices.map((choice, index) => (
                            <li key={index}>{choice}</li>
                        ))}
                    </ul>
                    <button onClick={resetPath}>Start Over</button>
                </div>
            )}

            {/* Restart button to reset the route anytime */}
            {currentPath != 'start' && currentPath !== 'end' && (
                <button onClick={resetPath} className="restart-button">
                    Restart Routes
                </button>
            )}
        </div>
    );
}

export default App;
