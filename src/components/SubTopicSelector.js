/* src/components/SubTopicSelector.js */

import React from 'react';
import './SubTopicSelector.css';

const SubTopicSelector = ({ subTopics, selectedSubTopics, setSelectedSubTopics, onConfirm }) => {
    const handleSubTopicToggle = (subTopic) => {
        if (selectedSubTopics.includes(subTopic)) {
            setSelectedSubTopics(selectedSubTopics.filter((topic) => topic !== subTopic));
        } else {
            setSelectedSubTopics([...selectedSubTopics, subTopic]);
        }
    };

    const handleConfirm = () => {
        onConfirm();
    };

    return (
        <div className="subtopic-selector">
            <h2 className="subtopic-title">Select Sub Topics</h2>
            <div className="subtopic-list">
                {subTopics.map((subTopic, index) => (
                    <button
                        key={index}
                        className={selectedSubTopics.includes(subTopic) ? 'subtopic-button active' : 'subtopic-button'}
                        onClick={() => handleSubTopicToggle(subTopic)}
                    >
                        {subTopic}
                    </button>
                ))}
            </div>
            <button className="confirm-button" onClick={handleConfirm}>Confirm</button>
        </div>
    );
};

export default SubTopicSelector;
