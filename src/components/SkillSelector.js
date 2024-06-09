/* src/components/SkillSelector.js */

import React, { useState } from 'react';
import './SkillSelector.css';

const SkillSelector = ({ skills, onSkillSelect }) => {
    const [selectedSkill, setSelectedSkill] = useState('');

    const handleSkillSelect = (skill) => {
        setSelectedSkill(skill);
        onSkillSelect(skill);
    };

    return (
        <div className="skill-selector-container">
            <div className="skill-selector">
                {!selectedSkill ? (
                    <div className="select-skill">Select a skill</div>
                ) : (
                    <div className="selected-skill">{selectedSkill}</div>
                )}
                {!selectedSkill &&
                    skills.map((skill, index) => (
                        <button key={index} className="skill-button" onClick={() => handleSkillSelect(skill)}>
                            {skill}
                        </button>
                    ))}
            </div>
        </div>
    );
};

export default SkillSelector;
