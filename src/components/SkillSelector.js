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
            {!selectedSkill && <h3 className="select-skill">Select a skill</h3>}
            <div className="skill-selector">
                {!selectedSkill &&
                    skills.map((skill, index) => (
                        <button key={index} className="skill-button" onClick={() => handleSkillSelect(skill)}>
                            {skill}
                        </button>
                    ))}
            </div>
            {selectedSkill && <div className="selected-skill">{selectedSkill}</div>}
        </div>
    );
};

export default SkillSelector;
