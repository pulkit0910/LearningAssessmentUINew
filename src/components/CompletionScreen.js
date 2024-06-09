import React from 'react';
import { Button } from 'react-bootstrap';
import './CompletionScreen.css';

const CompletionScreen = ({ onSubmitInterview }) => {
    return (
        <div className="completion-screen">
            <h2>Congratulations!</h2>
            <p>You have completed all the scenarios.</p>
            <Button className="submit-button" onClick={onSubmitInterview}>
                Submit Interview
            </Button>
        </div>
    );
};

export default CompletionScreen;
