import React, { useState } from 'react';
import { Button, Form, Tooltip, OverlayTrigger } from 'react-bootstrap';
import './ScenarioQuiz.css';

const ScenarioQuiz = ({ scenario, scenarioIndex, totalScenarios, onSubmit }) => {
    const [answer, setAnswer] = useState('');

    const handleNextScenario = () => {
        onSubmit(answer);
        setAnswer('');
    };

    return (
        <div className="scenario-quiz">
            <h2 className="topic-title">{scenario.technicaltopic}</h2>
            <h3 className="scenario-title">{scenario.scenario}</h3>
            <Form.Group controlId="userAnswer">
                <Form.Label>Your Answer</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={5}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="answer-textarea"
                />
            </Form.Group>
            <OverlayTrigger
                placement="right"
                overlay={<Tooltip>{scenario.hint}</Tooltip>}
            >
                <Button variant="info" className="hint-button">Show Hint</Button>
            </OverlayTrigger>
            <Button
                variant="primary"
                className="next-button"
                onClick={handleNextScenario}
            >
                {scenarioIndex < totalScenarios - 1 ? 'Next Scenario' : 'Submit Interview'}
            </Button>
        </div>
    );
};

export default ScenarioQuiz;
