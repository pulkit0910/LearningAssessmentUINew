import React, { useState } from 'react';

const ScenarioQuiz = ({ scenario, onSubmit }) => {
    const [answer, setAnswer] = useState('');
    const [showHint, setShowHint] = useState(false);

    const handleAnswerChange = (event) => {
        setAnswer(event.target.value);
    };

    const handleSubmit = () => {
        onSubmit(answer);
        setAnswer('');
        setShowHint(false);
    };

    return (
        <div className="mt-4">
            <h3>{scenario.scenario}</h3>
            <textarea
                className="form-control"
                rows="4"
                value={answer}
                onChange={handleAnswerChange}
                placeholder="Enter your answer here"
            />
            <button className="btn btn-secondary mt-2" onClick={() => setShowHint(!showHint)}>
                {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
            {showHint && <div className="alert alert-info mt-2">{scenario.hints}</div>}
            <button className="btn btn-primary mt-3" onClick={handleSubmit}>
                Submit Answer
            </button>
        </div>
    );
};

export default ScenarioQuiz;
